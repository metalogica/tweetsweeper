"use strict";
exports.__esModule = true;
exports.useMouseContext = exports.defaultMouseContext = exports.GameOptions = exports.useGameContext = exports.GameContext = exports.Flags = exports.Opponent = exports.Theme = exports.Difficulty = void 0;
var react_1 = require("react");
var globals_1 = require("./globals");
// contexts for App.tsx
var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "easy";
    Difficulty["Regular"] = "regular";
    Difficulty["Hard"] = "hard";
    Difficulty["Test"] = "test";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
var Theme;
(function (Theme) {
    Theme["Retro"] = "retro";
    Theme["Dusk"] = "dusk";
})(Theme = exports.Theme || (exports.Theme = {}));
var Opponent;
(function (Opponent) {
    Opponent["Trump"] = "trump";
    Opponent["Biden"] = "biden";
})(Opponent = exports.Opponent || (exports.Opponent = {}));
var Flags;
(function (Flags) {
    Flags[Flags["Easy"] = 3] = "Easy";
    Flags[Flags["Regular"] = 5] = "Regular";
    Flags[Flags["Hard"] = 8] = "Hard";
    Flags[Flags["Test"] = 2] = "Test";
})(Flags = exports.Flags || (exports.Flags = {}));
//default game context
exports.GameContext = react_1.createContext({
    difficulty: Difficulty.Easy,
    theme: Theme.Retro,
    opponent: Opponent.Trump,
    gameProgress: globals_1.GameProgress.NewGame,
    boardState: globals_1.easyBoardState,
    flags: Flags.Easy,
    rightClickHeldDown: false,
    numberOfMines: globals_1.NumberOfMines.Easy,
    setDifficulty: function () { },
    setTheme: function () { },
    setOpponent: function () { },
    setGameProgress: function () { },
    setFlags: function () { },
    setRightClickHeldDown: function () { },
    setNumberOfMines: function () { }
});
exports.useGameContext = function () { return react_1.useContext(exports.GameContext); };
exports.GameOptions = {
    difficulty: [
        Difficulty.Easy,
        Difficulty.Regular,
        Difficulty.Hard,
        Difficulty.Test
    ],
    theme: Object.values(Theme),
    opponent: Object.values(Opponent)
};
exports.defaultMouseContext = react_1.createContext({
    rightClickHeldDown: false
});
exports.useMouseContext = function () { return react_1.useContext(exports.defaultMouseContext); };
