"use strict";
exports.__esModule = true;
require("./DesktopIcons.scss");
var Icon = function (_a) {
    var name = _a.name, url = _a.url;
    return (React.createElement("a", { href: url, target: '_blank', className: 'icon', id: name },
        React.createElement("p", { className: 'icon-label' }, name)));
};
function DesktopIcons() {
    return (React.createElement("div", { className: "desktop-icons-container" },
        React.createElement(Icon, { name: 'github', url: 'https://github.com/catonmat' }),
        React.createElement(Icon, { name: 'stack-overflow', url: 'https://stackoverflow.com/users/10565289/richard-jarram' }),
        React.createElement(Icon, { name: 'linkedin', url: 'https://www.linkedin.com/in/richardjarram/' }),
        React.createElement(Icon, { name: 'twitter', url: 'https://twitter.com/methalogica' })));
}
exports["default"] = DesktopIcons;
