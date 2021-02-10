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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
var lodash_1 = require("lodash");
var globals_1 = require("../globals");
var Cell_1 = require("./Cell");
var Board_1 = require("./Board");
var StartMenu_1 = require("./StartMenu");
function flagThreeCellsOnTestBoard() {
    return __awaiter(this, void 0, void 0, function () {
        var cell;
        return __generator(this, function (_a) {
            cell = react_1.screen.getByTestId('0-0');
            react_1.fireEvent.contextMenu(cell);
            cell = react_1.screen.getByTestId('0-1');
            react_1.fireEvent.contextMenu(cell);
            cell = react_1.screen.getByTestId('0-2');
            react_1.fireEvent.contextMenu(cell);
            return [2 /*return*/];
        });
    });
}
describe('Cell State should determine the cell appearance', function () {
    it('should render an unopened skin', function () {
        var cellState = {
            location: [0, 0],
            clicked: false,
            mine: true,
            flagged: false,
            neighbors: 0
        };
        react_1.render(React.createElement(Cell_1["default"], __assign({}, cellState)));
        var cell = react_1.screen.getByTestId(cellState.location[0] + "-" + cellState.location[1]);
        expect(cell).toHaveStyle({ backgroundImage: "url(/images/retro/unopened.svg)" });
    });
    it('should render a mine skin', function () {
        var cellState = {
            location: [0, 0],
            clicked: true,
            mine: true,
            flagged: false,
            neighbors: 1
        };
        react_1.render(React.createElement(Cell_1["default"], __assign({}, cellState)));
        var cell = react_1.screen.getByTestId(cellState.location[0] + "-" + cellState.location[1]);
        expect(cell).toHaveStyle({ backgroundImage: "url(/images/retro/mine.png)" });
    });
    it('should render a flag skin', function () {
        var cellState = {
            location: [0, 0],
            clicked: false,
            mine: true,
            flagged: true,
            neighbors: 0
        };
        react_1.render(React.createElement(Cell_1["default"], __assign({}, cellState)));
        var cell = react_1.screen.getByTestId(cellState.location[0] + "-" + cellState.location[1]);
        expect(cell).toHaveStyle({ backgroundImage: "url(/images/retro/flag.svg)" });
    });
    it('should render an empty skin', function () {
        var cellState = {
            location: [0, 0],
            clicked: true,
            mine: false,
            flagged: false,
            neighbors: 0
        };
        react_1.render(React.createElement(Cell_1["default"], __assign({}, cellState)));
        var cell = react_1.screen.getByTestId(cellState.location[0] + "-" + cellState.location[1]);
        expect(cell).toHaveStyle({ backgroundImage: "url(/images/retro/opened.svg)" });
    });
    it('should render neighbor skins', function () {
        var randInt = lodash_1["default"].random(1, 9);
        var cellState = {
            location: [0, 0],
            clicked: true,
            mine: false,
            flagged: false,
            neighbors: randInt
        };
        react_1.render(React.createElement(Cell_1["default"], __assign({}, cellState)));
        var cell = react_1.screen.getByTestId(cellState.location[0] + "-" + cellState.location[1]);
        expect(cell).toHaveStyle({ backgroundImage: "url(/images/retro/" + randInt + ".svg)" });
    });
});
describe('Flagging functionality', function () {
    beforeEach(function () {
        react_1.render(React.createElement(Board_1["default"], __assign({}, globals_1.ongoingTestBoardState)));
    });
    it('should allow a user to flag a cell', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cell;
        return __generator(this, function (_a) {
            cell = react_1.screen.getByTestId('0-0');
            expect(cell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)');
            react_1.fireEvent.contextMenu(cell);
            setTimeout(function () {
                expect(cell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)');
            }, 1000);
            return [2 /*return*/];
        });
    }); });
    it('should only allow the user to flag unopened cells', function () {
        var cell = react_1.screen.getByTestId('0-0');
        react_1.fireEvent.click(cell);
        react_1.fireEvent.contextMenu(cell);
        // check you can't flag an opened cell
        expect(cell.style.backgroundImage).toEqual('url(/images/retro/opened.svg)');
        // check you cant flag a neighbor cell
        cell = react_1.screen.getByTestId('1-0');
        react_1.fireEvent.contextMenu(cell);
        setTimeout(function () {
            expect(cell.style.backgroundImage).toEqual('url(/images/retro/1.svg)');
        }, 1000);
    });
    it('should allow a user to de-flag a currently flagged cell', function () {
        var cell = react_1.screen.getByTestId('0-0');
        react_1.fireEvent.contextMenu(cell);
        setTimeout(function () {
            expect(cell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)');
        }, 1000);
        react_1.fireEvent.contextMenu(cell);
        expect(cell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)');
    });
    it('should not allow a user to flag a cell if the maximum number of flags has been reached', function () {
        flagThreeCellsOnTestBoard();
        var fourthCell = react_1.screen.getByTestId('0-3');
        react_1.fireEvent.contextMenu(fourthCell);
        setTimeout(function () {
            expect(fourthCell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)');
        }, 1000);
    });
    it('should reset the current flag count if the game is resetted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var firstCell, toolbarToggler, difficultySelect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_1.waitFor(function () { return flagThreeCellsOnTestBoard(); })];
                case 1:
                    _a.sent();
                    firstCell = react_1.screen.getByTestId('0-0');
                    setTimeout(function () {
                        expect(firstCell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)');
                    }, 1000);
                    react_1.render(React.createElement(StartMenu_1["default"], null));
                    toolbarToggler = react_1.screen.getByTestId('toolbar-toggler');
                    react_1.fireEvent.click(toolbarToggler);
                    difficultySelect = react_1.screen.getByLabelText('difficulty');
                    react_1.fireEvent.click(difficultySelect, { name: 'regular' });
                    react_1.fireEvent.click(difficultySelect, { name: 'easy' });
                    setTimeout(function () {
                        expect(firstCell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)');
                    }, 1000);
                    return [2 /*return*/];
            }
        });
    }); });
    // TO DO: you should not be able to normal click a flagged cell
    it('should not do a normal click on a cell when you reach the max flaggable cells limit and right-click a new cell', function () {
        // flag 1/2
        var cell = react_1.screen.getByTestId('0-0');
        react_1.fireEvent.contextMenu(cell);
        setTimeout(function () {
            expect(cell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)');
        }, 1000);
        // flag 2/2
        cell = react_1.screen.getByTestId('0-1');
        react_1.fireEvent.contextMenu(cell);
        setTimeout(function () {
            expect(cell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)');
        }, 1000);
        // should not flag
        cell = react_1.screen.getByTestId('0-2');
        expect(cell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)');
        react_1.fireEvent.contextMenu(cell);
        setTimeout(function () {
            expect(cell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)');
        }, 1000);
    });
});
