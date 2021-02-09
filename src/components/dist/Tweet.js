"use strict";
exports.__esModule = true;
require("./Tweet.scss");
var helpText = "\nThe Trump Era has ended but his Tweets still wreck havoc in a post-truth world.\n\nBe a hero and de-contaminate the falsehoods that pollute contemporary political discourse.\n\nSimply right-click on the cells you think contain explosive lies.\n\nClick on the Start menu below for further options.\n";
var Tweet = function (_a) {
    var clicked = _a.clicked, tweet = _a.tweet;
    return (React.createElement("div", { className: 'tweet-container', "data-testid": 'tweet-panel' },
        React.createElement("span", { className: 'tweet-ribbon' }, tweet ? 'Tweet Panel' : 'Help'),
        React.createElement("span", { className: 'tweet-logo' }),
        React.createElement("div", { className: 'tweet-content' },
            !tweet && React.createElement("div", { className: 'tweet-help-dialogue' }, helpText),
            tweet && (React.createElement(React.Fragment, null,
                React.createElement("span", { className: 'date', "data-testid": 'tweet-panel-date' }, tweet.date),
                React.createElement("p", { className: 'content', "data-testid": 'tweet-panel-content' }, tweet.content),
                clicked && (React.createElement(React.Fragment, null,
                    React.createElement("span", null,
                        "Status: ",
                        React.createElement("span", { className: tweet.lie ? 'lie' : 'truth' }, tweet.lie ? 'Lie!' : 'True')))))))));
};
exports["default"] = Tweet;
