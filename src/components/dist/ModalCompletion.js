"use strict";
exports.__esModule = true;
var contexts_1 = require("../contexts");
var globals_1 = require("../globals");
var ModalCompletion = function () { return React.createElement(ModalWrapper, null); };
exports["default"] = ModalCompletion;
function ModalWrapper() {
    var gameProgress = contexts_1.useGameContext().gameProgress;
    return (React.createElement(React.Fragment, null,
        gameProgress === globals_1.GameProgress.Won && (React.createElement(VictoryModal, null)),
        gameProgress === globals_1.GameProgress.Lost && (React.createElement(FailureModal, null))));
}
var VictoryModal = function () { return (React.createElement("div", { "data-testid": 'modal-completion' },
    "\"Congratulations! You trumped Trump's lies!\"",
    React.createElement(RestartButton, null))); };
var FailureModal = function () { return (React.createElement("div", { "data-testid": 'modal-completion' },
    "\"Dangit! Trump triumphed! Play again?\"",
    React.createElement(RestartButton, null))); };
var RestartButton = function () {
    var setGameProgress = contexts_1.useGameContext().setGameProgress;
    return (React.createElement("button", { "data-testid": 'restart-game-button', onClick: function () { return setGameProgress(globals_1.GameProgress.BeginNewGame); } }, "Play Again?"));
};
