"use strict";
exports.__esModule = true;
function Tweet(_a) {
    var clicked = _a.clicked, mine = _a.mine, flagged = _a.flagged, tweet = _a.tweet;
    if (tweet) {
        console.log(tweet);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { "data-testid": 'tweet-panel' },
                React.createElement("p", { "data-testid": 'tweet-panel-date', className: 'date' }),
                React.createElement("p", { "data-testid": 'tweet-panel-content', className: 'content' }))));
    }
    else {
        return (React.createElement(React.Fragment, null));
    }
}
exports["default"] = Tweet;
