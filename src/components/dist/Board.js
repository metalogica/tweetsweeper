"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var react_1 = require("react");
require("./Board.scss");
var Cell_1 = require("./Cell");
var TopPanel_1 = require("./TopPanel");
var contexts_1 = require("../contexts");
var tweets_1 = require("../data/tweets");
var globals_1 = require("../globals");
var Board = function (_a) {
    var boardSize = _a.boardSize, numberOfMines = _a.numberOfMines, mineMap = _a.mineMap;
    // TODO: Refactor this enum to remove redundant `state` key
    var _b = contexts_1.useGameContext(), difficulty = _b.difficulty, gameProgress = _b.gameProgress, setGameProgress = _b.setGameProgress, flags = _b.flags, setFlags = _b.setFlags;
    var _c = react_1.useState(buildBoard({ boardSize: boardSize, numberOfMines: numberOfMines, mineMap: mineMap })), grid = _c[0], setGrid = _c[1];
    var _d = react_1.useState(0), correctlyFlaggedCells = _d[0], setCorrectlyFlaggedCells = _d[1];
    // Flag logic: accounts for when you switch difficulty; resets to zero
    react_1.useEffect(function () {
        setFlags(0);
        setCorrectlyFlaggedCells(0);
        // eslint-disable-next-line
    }, [gameProgress, difficulty]);
    // redraw board after clicking on a cell
    react_1.useEffect(function () {
        setGrid(buildBoard({ boardSize: boardSize, numberOfMines: numberOfMines, mineMap: mineMap }));
    }, [boardSize, numberOfMines, mineMap]);
    // redraw board after clicking on restart game modal
    react_1.useEffect(function () {
        if (gameProgress === globals_1.GameProgress.BeginNewGame) {
            setGrid(buildBoard({ boardSize: boardSize, numberOfMines: numberOfMines, mineMap: mineMap }));
        }
        // eslint-disable-next-line
    }, [gameProgress]);
    // Completion: redraw board after victory
    // eslint-disable-next-line
    react_1.useEffect(function () {
        if (correctlyFlaggedCells === numberOfMines) {
            var updatedGrid = lodash_1["default"].cloneDeep(grid);
            for (var row = 0; row < boardSize; row++) {
                for (var col = 0; col < boardSize; col++) {
                    updatedGrid[row][col].clicked = true;
                }
            }
            setGrid(updatedGrid);
            setGameProgress(globals_1.GameProgress.Won);
        }
    });
    // TODO: rebuild this functionality with useContext and/or useRef()
    // https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
    // assumption was to 'optimize' React.render by doing in-place modification of `grid` rather than re-drawing the 
    // entire board after each click. I guess I have to do the naive thing and re-render the board each time...
    function updateBoard(j, i, rightClick) {
        var updatedGrid = lodash_1["default"].cloneDeep(grid);
        var cell = updatedGrid[j][i];
        if (rightClick) {
            var validCell = cell.style.backgroundImage === 'url(/images/retro/unopened.svg)' ||
                cell.style.backgroundImage === 'url(/images/retro/flag.svg)';
            if (cell.flagged === true && validCell) {
                cell.flagged = false;
                if (flags > 0) {
                    setFlags(flags - 1);
                }
                if (cell.mine) {
                    setCorrectlyFlaggedCells(correctlyFlaggedCells - 1);
                }
            }
            else if (cell.flagged === false && validCell && flags < numberOfMines) {
                cell.flagged = true;
                setFlags(flags + 1);
                if (cell.mine) {
                    setCorrectlyFlaggedCells(correctlyFlaggedCells + 1);
                }
            }
            // TODO: refactor this duplicate logic
            if (correctlyFlaggedCells === numberOfMines) {
                // set game state to won
                // setGameProgress(GameProgress.Won)
                // reveal entire board
                for (var row = 0; row < boardSize; row++) {
                    for (var col = 0; col < boardSize; col++) {
                        updatedGrid[row][col].clicked = true;
                    }
                }
            }
            setGrid(updatedGrid);
            return;
        }
        // cell is a mine reveal entire board
        if (cell.mine) {
            for (var row = 0; row < boardSize; row++) {
                for (var col = 0; col < boardSize; col++) {
                    updatedGrid[row][col].clicked = true;
                }
            }
            setGameProgress(globals_1.GameProgress.Lost);
            setGrid(updatedGrid);
            return;
        }
        // recursively open all blank cells
        var stack = [];
        stack.push(cell);
        while (stack.length > 0) {
            var currentCell = stack.shift();
            if (!currentCell.mine && !currentCell.clicked) {
                currentCell.clicked = true;
                currentCell.style = globals_1.setCellStyle(cell);
            }
            if (currentCell.neighbors === 0) {
                var j_1 = currentCell.location[0];
                var i_1 = currentCell.location[1];
                var neighborCell = updatedGrid[j_1 - 1] && updatedGrid[j_1 - 1][i_1 - 1] && !updatedGrid[j_1 - 1][i_1 - 1].mine && !updatedGrid[j_1 - 1][i_1 - 1].clicked; //&& updatedGrid[j-1][i-1].neighbors === 0 // top left
                if (neighborCell)
                    stack.push(updatedGrid[j_1 - 1][i_1 - 1]);
                neighborCell = updatedGrid[j_1 - 1] && updatedGrid[j_1 - 1][i_1] && !updatedGrid[j_1 - 1][i_1].mine && !updatedGrid[j_1 - 1][i_1].clicked; //&& updatedGrid[j-1][i].neighbors === 0 // top 
                if (neighborCell)
                    stack.push(updatedGrid[j_1 - 1][i_1]);
                neighborCell = updatedGrid[j_1 - 1] && updatedGrid[j_1 - 1][i_1 + 1] && !updatedGrid[j_1 - 1][i_1 + 1].mine && !updatedGrid[j_1 - 1][i_1 + 1].clicked; //&& updatedGrid[j-1][i+1].neighbors === 0 // top right
                if (neighborCell)
                    stack.push(updatedGrid[j_1 - 1][i_1 + 1]);
                neighborCell = updatedGrid[j_1] && updatedGrid[j_1][i_1 - 1] && !updatedGrid[j_1][i_1 - 1].mine && !updatedGrid[j_1][i_1 - 1].clicked; //&& updatedGrid[j][i-1].neighbors === 0 // left
                if (neighborCell)
                    stack.push(updatedGrid[j_1][i_1 - 1]);
                neighborCell = updatedGrid[j_1] && updatedGrid[j_1][i_1 + 1] && !updatedGrid[j_1][i_1 + 1].mine && !updatedGrid[j_1][i_1 + 1].clicked; //&& updatedGrid[j][i+1].neighbors === 0 //right
                if (neighborCell)
                    stack.push(updatedGrid[j_1][i_1 + 1]);
                neighborCell = updatedGrid[j_1 + 1] && updatedGrid[j_1 + 1][i_1 - 1] && !updatedGrid[j_1 + 1][i_1 - 1].mine && !updatedGrid[j_1 + 1][i_1 - 1].clicked; //&& updatedGrid[j+1][i-1].neighbors === 0 //bottom right
                if (neighborCell)
                    stack.push(updatedGrid[j_1 + 1][i_1 - 1]);
                neighborCell = updatedGrid[j_1 + 1] && updatedGrid[j_1 + 1][i_1] && !updatedGrid[j_1 + 1][i_1].mine && !updatedGrid[j_1 + 1][i_1].clicked; //&& updatedGrid[j+1][i].neighbors === 0 // bottom
                if (neighborCell)
                    stack.push(updatedGrid[j_1 + 1][i_1]);
                neighborCell = updatedGrid[j_1 + 1] && updatedGrid[j_1 + 1][i_1 + 1] && !updatedGrid[j_1 + 1][i_1 + 1].mine && !updatedGrid[j_1 + 1][i_1 + 1].clicked; //&& updatedGrid[j+1][i+1].neighbors === 0 // bottom right
                if (neighborCell)
                    stack.push(updatedGrid[j_1 + 1][i_1 + 1]);
            }
        }
        setGameProgress(globals_1.GameProgress.InProgress);
        setGrid(updatedGrid);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(TopPanel_1["default"], null),
        React.createElement("div", { className: "window-ribbon " + difficulty }, "Tweet Sweeper (Prototype v.1.0)"),
        React.createElement("div", { "data-testid": 'board', className: 'board-container', id: difficulty }, grid.map(function (column) {
            return (column.map(function (cellState, rowIndex) {
                // pass updateBoard() function to each child cell; on game boot up the grid is empty 
                // and so this function is nil, that is why we assign it here. 
                cellState.updateBoard = updateBoard;
                return (React.createElement(Cell_1["default"], __assign({ key: rowIndex }, cellState)));
            }));
        }))));
};
function buildBoard(_a) {
    // const userDesiresRandomMineGeneration = numberOfMines > 0
    // const userDoesNotDesireRandomMineGeneration = mineMap[0][0] !== -1 || mineMap[0][1] !== -1 
    var boardSize = _a.boardSize, numberOfMines = _a.numberOfMines, mineMap = _a.mineMap;
    // if (userDesiresRandomMineGeneration && userDoesNotDesireRandomMineGeneration) { 
    //   throw new Error('Please EITHER set Random Mines via `numberOfMines` or use a `mineMap` to manually build mines on the grid.')
    // }
    // Build the empty grid
    var grid = [[], []];
    for (var j = 0; j < boardSize; j++) {
        if (grid[j] === undefined)
            grid.push([]);
        for (var i = 0; i < boardSize; i++) {
            if (grid[j][i] === undefined)
                grid[j].push([]);
        }
    }
    // randomly select cells from grid to turn into mines;
    // will only run if no `mineMap` has been provided
    var userDesiresRandomMineGeneration = (mineMap[0][0] === -1 && mineMap[0][1] === -1) || (mineMap === undefined);
    if (userDesiresRandomMineGeneration) {
        var mineCount = 0;
        while (mineCount < numberOfMines) {
            var randomRow = Math.ceil(Math.random() * (grid.length - 1));
            var randomCol = Math.ceil(Math.random() * (grid[0].length - 1));
            var cell = grid[randomRow][randomCol];
            if (!cell.includes('mine')) {
                cell.push('mine');
                mineCount += 1;
            }
        }
    }
    // shuffle input tweet data in preparation for insertion of random tweet state into cells
    // do deep copy to prevent draining input data set if React does multiple re-render of board drawing
    var trueTrumpTweetsCopy = lodash_1["default"].cloneDeep(tweets_1.trueTrumpTweets);
    var falseTrumpTweetsCopy = lodash_1["default"].cloneDeep(tweets_1.falseTrumpTweets);
    lodash_1["default"].shuffle(trueTrumpTweetsCopy);
    lodash_1["default"].shuffle(falseTrumpTweetsCopy);
    var _loop_1 = function (j) {
        var _loop_2 = function (i) {
            // set mines according to user defined `MineMap`; used specifically in test case in Board.test.tsx OR set random mines
            var mine = mineMap.find(function (cell) { return cell[0] === j && cell[1] === i; }) || grid[j][i][0] === 'mine';
            // select random tweet: if its a mine, then it should be a false tweet
            var tweet = mine ? falseTrumpTweetsCopy.pop() : trueTrumpTweetsCopy.pop();
            var cellState = {
                location: [j, i],
                clicked: false,
                mine: mine ? true : false,
                flagged: false,
                neighbors: 0,
                tweet: tweet
            };
            cellState.style = globals_1.setCellStyle(cellState);
            grid[j][i] = cellState;
        };
        for (var i = 0; i < boardSize; i++) {
            _loop_2(i);
        }
    };
    // populate the grid with cells
    for (var j = 0; j < boardSize; j++) {
        _loop_1(j);
    }
    // build neighbors
    for (var j = 0; j < boardSize; j++) {
        for (var i = 0; i < boardSize; i++) {
            var neighbors = 0;
            var topLeft = grid[j - 1] && grid[j - 1][i - 1] && grid[j - 1][i - 1].mine; // top left
            if (topLeft)
                neighbors += 1;
            var top = grid[j - 1] && grid[j - 1][i] && grid[j - 1][i].mine; // top 
            if (top)
                neighbors += 1;
            var topRight = grid[j - 1] && grid[j - 1][i + 1] && grid[j - 1][i + 1].mine; // top right
            if (topRight)
                neighbors += 1;
            var left = grid[j] && grid[j][i - 1] && grid[j][i - 1].mine; // left
            if (left)
                neighbors += 1;
            var right = grid[j] && grid[j][i + 1] && grid[j][i + 1].mine; //right
            if (right)
                neighbors += 1;
            var bottomLeft = grid[j + 1] && grid[j + 1][i - 1] && grid[j + 1][i - 1].mine; //bottom right
            if (bottomLeft)
                neighbors += 1;
            var bottom = grid[j + 1] && grid[j + 1][i] && grid[j + 1][i].mine; // bottom
            if (bottom)
                neighbors += 1;
            var bottomRight = grid[j + 1] && grid[j + 1][i + 1] && grid[j + 1][i + 1].mine; // bottom right
            if (bottomRight)
                neighbors += 1;
            grid[j][i].neighbors = neighbors;
        }
    }
    return grid;
}
exports["default"] = Board;
