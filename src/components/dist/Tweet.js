"use strict";
exports.__esModule = true;
require("./Tweet.scss");
var Tweet = function (_a) {
    var clicked = _a.clicked, tweet = _a.tweet;
    return (React.createElement("div", { className: 'tweet-container', "data-testid": 'tweet-panel' },
        React.createElement("span", { className: 'tweet-logo' }),
        React.createElement("div", { className: 'tweet-content' },
            React.createElement("span", { className: 'tweet-help-dialogue' }, "Help to play here"),
            tweet && (React.createElement("div", { className: 'tweet-revealed-content' },
                React.createElement("p", { "data-testid": 'tweet-panel-date', className: 'date' }, tweet.date),
                React.createElement("p", { "data-testid": 'tweet-panel-content', className: 'content' }, tweet.content),
                clicked && (React.createElement("div", { className: 'tweet-hidden-content' },
                    React.createElement("p", null,
                        "Status : ",
                        tweet.lie ? 'Lie!' : 'True',
                        " "),
                    React.createElement("p", null,
                        "Source : ",
                        tweet.source,
                        " "))))))));
};
exports["default"] = Tweet;
