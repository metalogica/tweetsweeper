"use strict";
exports.__esModule = true;
exports.useBoardContext = exports.BoardContext = exports.completedTestBoardState = exports.ongoingTestBoardState = exports.closedCell = exports.emptyCell = exports.openedCell = exports.setCell = exports.testBoardState = exports.hardBoardState = exports.regularBoardState = exports.easyBoardState = exports.NumberOfMines = exports.BoardSize = exports.GameProgress = exports.setCellStyle = void 0;
var react_1 = require("react");
exports.setCellStyle = function (_a) {
    var location = _a.location, clicked = _a.clicked, mine = _a.mine, flagged = _a.flagged, neighbors = _a.neighbors;
    var style = {
        backgroundImage: "url(/images/retro/unopened.svg)",
        gridArea: location[0] + "-" + location[1]
    };
    if (flagged) {
        style.backgroundImage = "url(/images/retro/flag.svg)";
    }
    else if (clicked && mine) {
        style.backgroundImage = "url(/images/retro/mine.png)";
    }
    else if (clicked && !mine && !flagged && neighbors === 0) {
        style.backgroundImage = "url(/images/retro/opened.svg)";
    }
    else if (clicked && !mine && !flagged && neighbors > 0) {
        style.backgroundImage = "url(/images/retro/" + neighbors + ".svg)";
    }
    return style;
};
// Board Globals
var GameProgress;
(function (GameProgress) {
    GameProgress["NewGame"] = "newGame";
    GameProgress["InProgress"] = "inProgress";
    GameProgress["Won"] = "won";
    GameProgress["Lost"] = "lost";
    GameProgress["BeginNewGame"] = "beginNewGame";
})(GameProgress = exports.GameProgress || (exports.GameProgress = {}));
var BoardSize;
(function (BoardSize) {
    BoardSize[BoardSize["Test"] = 5] = "Test";
    BoardSize[BoardSize["Easy"] = 5] = "Easy";
    BoardSize[BoardSize["Regular"] = 10] = "Regular";
    BoardSize[BoardSize["Hard"] = 20] = "Hard";
})(BoardSize = exports.BoardSize || (exports.BoardSize = {}));
var NumberOfMines;
(function (NumberOfMines) {
    NumberOfMines[NumberOfMines["Test"] = 2] = "Test";
    NumberOfMines[NumberOfMines["Easy"] = 3] = "Easy";
    NumberOfMines[NumberOfMines["Regular"] = 12] = "Regular";
    NumberOfMines[NumberOfMines["Hard"] = 188] = "Hard";
})(NumberOfMines = exports.NumberOfMines || (exports.NumberOfMines = {}));
// TODO: Consider refactoring these interface so you have one interface such that:
// { 
//   easy: {
//      gameProgress: gameProgress.Easy,
//      boardSize: boardSize.Easy,
//      numberOfMines: NumberOfMines.Easy
//   }
// }
exports.easyBoardState = {
    boardSize: BoardSize.Easy,
    numberOfMines: NumberOfMines.Easy,
    mineMap: [[-1, -1]],
    flags: 0,
    maxFlags: NumberOfMines.Easy
};
exports.regularBoardState = {
    boardSize: BoardSize.Regular,
    numberOfMines: NumberOfMines.Regular,
    mineMap: [[-1, -1]],
    flags: 0,
    maxFlags: NumberOfMines.Regular
};
exports.hardBoardState = {
    boardSize: BoardSize.Hard,
    numberOfMines: NumberOfMines.Hard,
    mineMap: [[-1, -1]],
    flags: 0,
    maxFlags: NumberOfMines.Hard
};
// used only in Board.test.tsx
exports.testBoardState = {
    boardSize: BoardSize.Test,
    numberOfMines: NumberOfMines.Test,
    mineMap: [
        [2, 1],
        [3, 2]
    ],
    flags: 0,
    maxFlags: NumberOfMines.Test
};
// TODO: Refactor `setCell`, `openedCell`, `closedCell` and `completedTestBoardState`; these exist only in Board.test.tsx 
exports.setCell = function (cell, location, neighbors, mine) {
    cell.location = location;
    cell.neighbors = neighbors;
    cell.mine = mine ? true : false;
    cell.style = exports.setCellStyle(cell);
    return cell;
};
exports.openedCell = {
    location: [0, 0],
    clicked: true,
    mine: false,
    flagged: false,
    neighbors: 0
};
// default non-value cell to allow game to render; hovering on this cell should show no tweet
var emptyTweet = {
    id: 999,
    lie: false,
    content: "emptyCell",
    date: "",
    source: ""
};
exports.emptyCell = {
    location: [999, 999],
    clicked: false,
    mine: false,
    flagged: false,
    neighbors: 0,
    tweet: emptyTweet
};
exports.closedCell = {
    location: [0, 0],
    clicked: false,
    mine: false,
    flagged: false,
    neighbors: 0
};
// TODO: Refactor this and plce it in a new /utils.tsx file
var TestCell = /** @class */ (function () {
    function TestCell(_a) {
        var location = _a.location, clicked = _a.clicked, mine = _a.mine, flagged = _a.flagged, neighbors = _a.neighbors;
        this.location = location;
        this.clicked = clicked;
        this.mine = mine;
        this.flagged = flagged;
        this.neighbors = neighbors;
        this.style = this.setSkin();
    }
    TestCell.prototype.setSkin = function () {
        return exports.setCellStyle(this);
    };
    return TestCell;
}());
exports.ongoingTestBoardState = {
    boardSize: BoardSize.Test,
    numberOfMines: NumberOfMines.Test,
    mineMap: [
        [2, 1],
        [3, 2]
    ],
    flags: 0,
    maxFlags: NumberOfMines.Test,
    grid: [
        [
            new TestCell({ location: [0, 0], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 1], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 2], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 3], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [1, 0], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [1, 1], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [1, 2], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [1, 3], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [1, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [2, 0], clicked: false, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [2, 1], clicked: false, mine: true, flagged: false, neighbors: 1 }),
            new TestCell({ location: [2, 2], clicked: true, mine: false, flagged: false, neighbors: 2 }),
            new TestCell({ location: [2, 3], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [2, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [3, 0], clicked: false, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [3, 1], clicked: false, mine: true, flagged: false, neighbors: 2 }),
            new TestCell({ location: [3, 2], clicked: false, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [3, 3], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [3, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [4, 0], clicked: false, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [4, 1], clicked: false, mine: true, flagged: false, neighbors: 1 }),
            new TestCell({ location: [4, 2], clicked: false, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [4, 3], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [4, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ]
    ]
};
exports.completedTestBoardState = {
    boardSize: BoardSize.Test,
    numberOfMines: NumberOfMines.Test,
    flags: 0,
    maxFlags: NumberOfMines.Test,
    mineMap: [
        [2, 1],
        [3, 2]
    ],
    grid: [
        [
            new TestCell({ location: [0, 0], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 1], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 2], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 3], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [0, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [1, 0], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [1, 1], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [1, 2], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [1, 3], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [1, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [2, 0], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [2, 1], clicked: false, mine: true, flagged: true, neighbors: 1 }),
            new TestCell({ location: [2, 2], clicked: true, mine: false, flagged: false, neighbors: 2 }),
            new TestCell({ location: [2, 3], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [2, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [3, 0], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [3, 1], clicked: true, mine: false, flagged: false, neighbors: 2 }),
            new TestCell({ location: [3, 2], clicked: false, mine: true, flagged: true, neighbors: 1 }),
            new TestCell({ location: [3, 3], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [3, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ],
        [
            new TestCell({ location: [4, 0], clicked: true, mine: false, flagged: false, neighbors: 0 }),
            new TestCell({ location: [4, 1], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [4, 2], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [4, 3], clicked: true, mine: false, flagged: false, neighbors: 1 }),
            new TestCell({ location: [4, 4], clicked: true, mine: false, flagged: false, neighbors: 0 })
        ]
    ]
};
// Board Context
exports.BoardContext = react_1.createContext({
    boardSize: BoardSize.Easy,
    numberOfMines: NumberOfMines.Easy,
    mineMap: [[-1, -1]],
    flags: 0,
    maxFlags: NumberOfMines.Easy
});
exports.useBoardContext = function () { return react_1.useContext(exports.BoardContext); };
