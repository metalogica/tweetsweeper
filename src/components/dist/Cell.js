"use strict";
exports.__esModule = true;
var globals_1 = require("../globals");
var contexts_1 = require("../contexts");
require("./Cell.scss");
function Cell(_a) {
    var location = _a.location, clicked = _a.clicked, mine = _a.mine, flagged = _a.flagged, neighbors = _a.neighbors, updateBoard = _a.updateBoard, tweet = _a.tweet;
    var _b = contexts_1.useGameContext(), setRightClickHeldDown = _b.setRightClickHeldDown, gameProgress = _b.gameProgress, setCurrentCell = _b.setCurrentCell;
    var style = setStyle(location, clicked, mine, flagged, neighbors, gameProgress);
    function rightClick(event, row, col) {
        event.preventDefault();
        if (gameProgress === globals_1.GameProgress.InProgress || gameProgress === globals_1.GameProgress.BeginNewGame || gameProgress === globals_1.GameProgress.NewGame) {
            flagged = true;
            updateBoard && updateBoard(location[0], location[1], true);
        }
    }
    function handleLeftClick() {
        var cellNotFlagged = !flagged;
        var gameIsNotLost = gameProgress !== globals_1.GameProgress.Lost;
        var gameIsNotWon = gameProgress !== globals_1.GameProgress.Won;
        if (cellNotFlagged && gameIsNotLost && gameIsNotWon) {
            updateBoard ? updateBoard(location[0], location[1]) : console.error('unable to upate cell');
        }
    }
    // used to set currentCell to the one the user is currently hovering over
    var cell = {
        location: location,
        clicked: clicked,
        flagged: flagged,
        mine: mine,
        neighbors: neighbors,
        tweet: tweet
    };
    return (React.createElement("div", { className: 'cell', "data-testid": location[0] + "-" + location[1], style: style, onContextMenu: function (event) { return rightClick(event, location[0], location[1]); }, onClick: function () { return handleLeftClick(); }, onMouseDown: function () { return gameProgress !== globals_1.GameProgress.Lost && setRightClickHeldDown(true); }, onMouseUp: function () { return gameProgress !== globals_1.GameProgress.Lost && setRightClickHeldDown(false); }, onMouseEnter: function () { return setCurrentCell(cell); }, onMouseLeave: function () { return setCurrentCell(false); } }));
}
function setStyle(location, clicked, mine, flagged, neighbors, gameProgress) {
    var skin = {
        backgroundImage: "url(/images/retro/unopened.svg)",
        gridArea: location[0] + "-" + location[1]
    };
    if (flagged) {
        skin.backgroundImage = "url(/images/retro/flag.svg)";
    }
    else if (clicked && mine) {
        skin.backgroundImage = "url(/images/retro/mine.png)";
    }
    else if (clicked && !mine && !flagged && neighbors === 0) {
        skin.backgroundImage = "url(/images/retro/opened.svg)";
    }
    else if (clicked && !mine && !flagged && neighbors > 0) {
        skin.backgroundImage = "url(/images/retro/" + neighbors + ".svg)";
    }
    // unset incorrect flags at end of game
    if (gameProgress === globals_1.GameProgress.Lost) {
        if (flagged && !mine && neighbors > 0) {
            skin.backgroundImage = "url(/images/retro/" + neighbors + ".svg)";
        }
        else if (flagged && !mine && neighbors === 0) {
            skin.backgroundImage = "url(/images/retro/opened.svg)";
        }
    }
    return skin;
}
exports["default"] = Cell;
