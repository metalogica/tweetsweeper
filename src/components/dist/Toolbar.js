"use strict";
exports.__esModule = true;
var react_1 = require("react");
var contexts_1 = require("../contexts");
var globals_1 = require("../globals");
// import './Toolbar.scss'
require("./StartMenu.scss");
function Toolbar(props) {
    var _a = react_1.useState(false), revealed = _a[0], setRevealed = _a[1];
    console.log(revealed);
    return (React.createElement("div", { className: 'start-menu-container', id: revealed ? 'revealed' : '' },
        React.createElement("span", { id: 'start-menu-icon', onClick: function () { return setRevealed(!revealed); }, "data-testid": 'toolbar-toggler' }),
        revealed && (React.createElement("div", { className: 'start-menu-options-container' },
            React.createElement("h4", null, "Options"),
            React.createElement("hr", null),
            contexts_1.GameOptions && Object.entries(contexts_1.GameOptions).map(function (_a, i) {
                var setting = _a[0], options = _a[1];
                return (React.createElement(Toggler, { key: i, setting: setting, options: options }));
            })))));
}
function Toggler(_a) {
    var setting = _a.setting, options = _a.options;
    var _b = contexts_1.useGameContext(), setDifficulty = _b.setDifficulty, setTheme = _b.setTheme, setOpponent = _b.setOpponent, setGameProgress = _b.setGameProgress, setNumberOfMines = _b.setNumberOfMines;
    // TODO: Refactor this logic to make it conform to typescript standards.
    var handleChange = function (option) {
        switch (option) {
            case 'easy':
                setDifficulty(contexts_1.Difficulty.Easy);
                setGameProgress(globals_1.GameProgress.NewGame);
                setNumberOfMines(globals_1.NumberOfMines.Easy);
                break;
            case 'regular':
                setDifficulty(contexts_1.Difficulty.Regular);
                setGameProgress(globals_1.GameProgress.NewGame);
                setNumberOfMines(globals_1.NumberOfMines.Regular);
                break;
            case 'hard':
                setDifficulty(contexts_1.Difficulty.Hard);
                setGameProgress(globals_1.GameProgress.NewGame);
                setNumberOfMines(globals_1.NumberOfMines.Hard);
                break;
            case 'test':
                setDifficulty(contexts_1.Difficulty.Test);
                setGameProgress(globals_1.GameProgress.NewGame);
                setNumberOfMines(globals_1.NumberOfMines.Test);
                break;
            case 'retro':
                setTheme(contexts_1.Theme.Retro);
                break;
            case 'dusk':
                setTheme(contexts_1.Theme.Dusk);
                break;
            case 'biden':
                setOpponent(contexts_1.Opponent.Biden);
                break;
            case 'trump':
                setOpponent(contexts_1.Opponent.Trump);
                break;
            default:
                return;
        }
    };
    return (React.createElement("div", { key: setting, className: setting + "-select-container" },
        React.createElement("label", { htmlFor: setting }, setting),
        React.createElement("select", { id: setting, "data-testid": 'toolbar', key: setting, onChange: function (event) { return handleChange(event.target.value); } }, options.map(function (option, index) { return (React.createElement("option", { value: option, key: index }, option)); }))));
}
exports["default"] = Toolbar;
