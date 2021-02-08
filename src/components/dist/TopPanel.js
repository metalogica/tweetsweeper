"use strict";
exports.__esModule = true;
var react_1 = require("react");
var globals_1 = require("../globals");
var contexts_1 = require("../contexts");
require("./TopPanel.scss");
function TopPanel() {
    var gameProgress = contexts_1.useGameContext().gameProgress;
    var _a = react_1["default"].useState(0), time = _a[0], setTime = _a[1];
    // countdown timer logic
    react_1.useEffect(function () {
        if (gameProgress === globals_1.GameProgress.BeginNewGame) {
            setTime(0);
        }
        if (gameProgress === globals_1.GameProgress.InProgress) {
            var interval_1 = setInterval(function () { return setTime(time + 1); }, 1000);
            return function () { return clearInterval(interval_1); };
        }
    }, [gameProgress, time]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { "data-testid": 'topPanel' },
            react_1["default"].createElement(FlagCounter, null),
            react_1["default"].createElement(Avatar, { gameProgress: gameProgress }),
            react_1["default"].createElement("div", null,
                "Timer: ",
                react_1["default"].createElement("span", { "data-testid": 'timer' }, time)))));
}
exports["default"] = TopPanel;
function FlagCounter() {
    var _a = contexts_1.useGameContext(), flags = _a.flags, numberOfMines = _a.numberOfMines;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, numberOfMines && react_1["default"].createElement("span", { "data-testid": "flag-counter" }, numberOfMines - flags)));
}
function Avatar(_a) {
    var gameProgress = _a.gameProgress;
    var rightClickHeldDown = contexts_1.useGameContext().rightClickHeldDown;
    var avatarUrl;
    // avatar changes if user holds down left mouse button
    if (rightClickHeldDown) {
        avatarUrl = "/images/retro/avatar/wow.png";
    }
    else {
        // avatar changes according to game state
        switch (gameProgress) {
            case globals_1.GameProgress.Won:
                avatarUrl = "/images/retro/avatar/sad.png";
                break;
            case globals_1.GameProgress.Lost:
                avatarUrl = "/images/retro/avatar/happy.png";
                break;
            default:
                avatarUrl = "/images/retro/avatar/angry.png";
                break;
        }
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("p", null, "Avatar"),
        react_1["default"].createElement("img", { "data-testid": "avatar", id: "avatar", src: avatarUrl, alt: "" })));
}
