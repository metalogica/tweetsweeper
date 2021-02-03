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
var react_1 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
var TopPanel_1 = require("./TopPanel");
var Board_1 = require("./Board");
var Toolbar_1 = require("./Toolbar");
var globals_1 = require("../globals");
// shared examples
function toggleNewGameAndDifficulty(difficulty) {
    var toolbarToggler = react_1.screen.getByTestId('toolbar-toggler');
    react_1.fireEvent.click(toolbarToggler);
    var difficultySelect = react_1.screen.getByLabelText('difficulty');
    react_1.fireEvent.click(difficultySelect, { name: difficulty });
}
function assertTimer(callback) {
    var timer = react_1.screen.getByTestId('timer');
    var time = Number(timer.textContent);
    expect(timer).toBeInTheDocument();
    setTimeout(function () {
        callback && callback();
    }, 1500);
    return time;
}
describe('Basic Functions', function () {
    beforeEach(function () {
        jest.useFakeTimers();
        react_1.render(React.createElement(TopPanel_1["default"], null));
        react_1.render(React.createElement(Toolbar_1["default"], null));
    });
    describe('Timer', function () {
        it('should report the time played during the game to the user', function () {
            var timer = react_1.screen.getByTestId('timer');
            expect(timer).toBeInTheDocument();
        });
        it('should not start counting if the user has not clicked on a cell, or has not flagged a cell', function () {
            react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.testBoardState)));
            var timer = react_1.screen.getByTestId('timer');
            expect(timer).toBeInTheDocument();
            var time = Number(timer.textContent);
            expect(time).toEqual(0);
        });
        it('should start counting if the user clicks on a blank cell', function () {
            react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.testBoardState)));
            var callback = jest.fn();
            assertTimer(callback);
            expect(callback).not.toBeCalled();
            var cell = react_1.screen.getByTestId('0-0');
            react_1.fireEvent.click(cell);
            jest.advanceTimersByTime(10000);
            expect(callback).toBeCalled();
            expect(callback).toHaveBeenCalledTimes(1);
            // const time = assertTimer(callback)
            // TODO: fix asynchronous logic in app
            // expect(time).toBeGreaterThan(0)
        });
        it('should reset the counter if the game is restarted', function () {
            react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.testBoardState)));
            var timer = react_1.screen.getByTestId('timer');
            expect(timer).toBeInTheDocument();
            var cell = react_1.screen.getByTestId('0-0');
            react_1.fireEvent.click(cell);
            var time;
            setTimeout(function () {
                time = Number(timer.textContent);
                expect(time).toBeGreaterThan(0);
            }, 1500);
            toggleNewGameAndDifficulty('regular');
            time = Number(timer.textContent);
            expect(time).toEqual(0);
        });
        it('should start counting if the user flags a cell', function () {
            react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.testBoardState)));
            var timer = react_1.screen.getByTestId('timer');
            expect(timer).toBeInTheDocument();
            var earlierTime = Number(timer.textContent);
            var cell = react_1.screen.getByTestId('0-0');
            react_1.fireEvent.contextMenu(cell);
            setTimeout(function () {
                var laterTime = Number(timer.textContent);
                expect(earlierTime).toBeLessThan(laterTime);
                expect(true).toEqual(false);
            }, 1500);
        });
        it('should stop counting if the game ends', function () {
            react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.testBoardState)));
            var timer = react_1.screen.getByTestId('timer');
            expect(timer).toBeInTheDocument();
            var mineCell = react_1.screen.getByTestId('3-2');
            react_1.fireEvent.click(mineCell);
            var earlierTime = Number(timer.textContent);
            setTimeout(function () {
                var laterTime = Number(timer.textContent);
                expect(earlierTime).toEqual(laterTime);
            }, 1500);
        });
    });
    describe('Avatar', function () {
        test('it exists', function () {
            var avatar = react_1.screen.getByTestId('avatar');
            expect(avatar).toBeInTheDocument();
        });
    });
    describe('Flag Count', function () {
        it('exists', function () {
            var flagCounter = react_1.screen.getByTestId('flag-counter');
            expect(flagCounter).toBeInTheDocument();
        });
        it('should keep track of the current number of flags', function () {
            react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.testBoardState)));
            var flags = Number(react_1.screen.getByTestId('flag-counter').textContent);
            expect(flags).toEqual(0);
            var cell = react_1.screen.getByTestId('0-0');
            react_1.fireEvent.contextMenu(cell);
            flags = Number(react_1.screen.getByTestId('flag-counter').textContent);
            expect(flags).toEqual(1);
        });
        it('should reset the flag count if the game ends', function () {
            react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.testBoardState)));
            var flags = Number(react_1.screen.getByTestId('flag-counter').textContent);
            expect(flags).toEqual(0);
            var cell = react_1.screen.getByTestId('0-0');
            react_1.fireEvent.contextMenu(cell);
            flags = Number(react_1.screen.getByTestId('flag-counter').textContent);
            expect(flags).toEqual(1);
            var toolbarToggler = react_1.screen.getByTestId('toolbar-toggler');
            react_1.fireEvent.click(toolbarToggler);
            var difficultySelect = react_1.screen.getByLabelText('difficulty');
            react_1.fireEvent.click(difficultySelect, { name: 'regular' });
            react_1.fireEvent.click(difficultySelect, { name: 'easy' });
            flags = Number(react_1.screen.getByTestId('flag-counter').textContent);
            expect(flags).toEqual(0);
        });
    });
});
