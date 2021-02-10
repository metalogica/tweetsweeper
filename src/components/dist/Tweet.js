"use strict";
exports.__esModule = true;
var contexts_1 = require("../contexts");
require("./Tweet.scss");
var formatTweetText = function (tweetContent) { return "\n  " + tweetContent.slice(0, 200) + (tweetContent.length > 200 ? '...' : '') + "\n"; };
var Tweet = function (_a) {
    var clicked = _a.clicked, tweet = _a.tweet;
    var gameProgress = contexts_1.useGameContext().gameProgress;
    var helpText = "\n  The Trump Era has ended but his Tweets still wreck havoc in a post-truth world.\n\n  Be a hero and de-contaminate the falsehoods that pollute contemporary political discourse.\n\n  Simply right-click on the cells you think contain explosive lies.\n\n  Click on the Start menu below for further options.\n";
    var tweetRibbon = function () { return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: 'tweet-ribbon' }, tweet ? 'Tweet Panel' : 'Help'),
        React.createElement("span", { className: tweet ? 'tweet-logo' : 'help-logo' }))); };
    return (React.createElement("div", { className: "tweet-wrapper" },
        React.createElement("div", { className: 'tweet-container', "data-testid": 'tweet-panel' },
            tweetRibbon(),
            React.createElement("div", { className: 'tweet-content' },
                !tweet && React.createElement("div", { className: 'tweet-help-dialogue' }, helpText),
                tweet && (React.createElement(React.Fragment, null,
                    React.createElement("span", { className: 'date', "data-testid": 'tweet-panel-date' }, tweet.date),
                    React.createElement("p", { className: 'content', "data-testid": 'tweet-panel-content' }, formatTweetText(tweet.content)),
                    clicked && (React.createElement(React.Fragment, null,
                        React.createElement("span", null,
                            "Status: ",
                            React.createElement("span", { className: tweet.lie ? 'lie' : 'truth' }, tweet.lie ? 'Lie!' : 'True'))))))))));
};
exports["default"] = Tweet;
