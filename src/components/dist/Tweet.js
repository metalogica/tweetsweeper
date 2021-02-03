"use strict";
exports.__esModule = true;
function Tweet(_a) {
    var clicked = _a.clicked, tweet = _a.tweet;
    if (tweet) {
        var date = tweet.date, content = tweet.content, lie = tweet.lie, source = tweet.source;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { "data-testid": 'tweet-panel' },
                React.createElement("p", { "data-testid": 'tweet-panel-date', className: 'date' }, date),
                React.createElement("p", { "data-testid": 'tweet-panel-content', className: 'content' }, content),
                clicked && (React.createElement(React.Fragment, null,
                    React.createElement("p", null,
                        "Status : ",
                        lie ? 'Lie!' : 'True',
                        " "),
                    React.createElement("p", null,
                        "Source : ",
                        source,
                        " "))))));
    }
    else {
        return (React.createElement(React.Fragment, null));
    }
}
exports["default"] = Tweet;
