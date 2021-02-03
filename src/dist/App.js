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
var react_1 = require("react");
var contexts_1 = require("./contexts");
var Global = require("./globals");
var Board_1 = require("./components/Board");
var Toolbar_1 = require("./components/Toolbar");
var TopPanel_1 = require("./components/TopPanel");
var ModalCompletion_1 = require("./components/ModalCompletion");
var Tweet_1 = require("./components/Tweet");
require("./App.scss");
// TODO: Add error boundaries to app: https://medium.com/@sgroff04/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method-d1a69a1f753
function App() {
    var _a = react_1["default"].useState(contexts_1.Difficulty.Easy), difficulty = _a[0], setDifficulty = _a[1];
    var _b = react_1["default"].useState(contexts_1.Theme.Retro), theme = _b[0], setTheme = _b[1];
    var _c = react_1["default"].useState(contexts_1.Opponent.Trump), opponent = _c[0], setOpponent = _c[1];
    var _d = react_1["default"].useState(Global.GameProgress.NewGame), gameProgress = _d[0], setGameProgress = _d[1];
    var _e = react_1["default"].useState(contexts_1.Flags.Easy), flags = _e[0], setFlags = _e[1];
    var _f = react_1["default"].useState(false), rightClickHeldDown = _f[0], setRightClickHeldDown = _f[1];
    var boardState = react_1["default"].useState(Global.easyBoardState)[0];
    var _g = react_1["default"].useState(Global.NumberOfMines.Easy), numberOfMines = _g[0], setNumberOfMines = _g[1];
    var _h = react_1["default"].useState(Global.emptyCell), currentCell = _h[0], setCurrentCell = _h[1];
    function drawBoard(difficulty) {
        switch (difficulty) {
            case 'easy':
                return Global.easyBoardState;
            case 'regular':
                return Global.regularBoardState;
            case 'hard':
                return Global.hardBoardState;
            case 'test':
                return Global.testBoardState;
            default:
                throw new Error('Unable to draw board.');
        }
    }
    function maxFlags(board) {
        return board.maxFlags;
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(contexts_1.GameContext.Provider, { value: {
                difficulty: difficulty,
                theme: theme,
                opponent: opponent,
                gameProgress: gameProgress,
                flags: flags,
                rightClickHeldDown: rightClickHeldDown,
                boardState: boardState,
                numberOfMines: numberOfMines,
                setDifficulty: setDifficulty,
                setTheme: setTheme,
                setOpponent: setOpponent,
                setGameProgress: setGameProgress,
                setFlags: setFlags,
                setRightClickHeldDown: setRightClickHeldDown,
                setNumberOfMines: setNumberOfMines,
                setCurrentCell: setCurrentCell
            } },
            react_1["default"].createElement("h1", null, "APP: "),
            react_1["default"].createElement("p", null,
                "Difficulty: ",
                difficulty),
            react_1["default"].createElement("p", null,
                "Progress: ",
                gameProgress),
            react_1["default"].createElement("p", null,
                "Theme: ",
                theme),
            react_1["default"].createElement("p", null,
                "Opponent: ",
                opponent),
            react_1["default"].createElement("p", null,
                "Current Flags: ",
                flags),
            react_1["default"].createElement("p", null,
                "Max Flags: ",
                maxFlags(drawBoard(difficulty))),
            react_1["default"].createElement(TopPanel_1["default"], null),
            react_1["default"].createElement(Board_1["default"], __assign({}, drawBoard(difficulty))),
            react_1["default"].createElement(Toolbar_1["default"], null),
            react_1["default"].createElement(ModalCompletion_1["default"], null),
            react_1["default"].createElement(Tweet_1["default"], __assign({}, currentCell)))));
}
exports["default"] = App;
