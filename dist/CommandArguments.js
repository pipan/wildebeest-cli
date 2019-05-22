"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandArguments = (function () {
    function CommandArguments(args, required) {
        this.arguments = {};
        for (var i = 0; i < args.length; i++) {
            var name_1 = "";
            var value = true;
            if (required.length > i) {
                name_1 = required[i];
                value = args[i];
            }
            else {
                var split = args[i].split("=");
                name_1 = split.pop();
                value = split.join("=");
            }
            this.add(name_1, value);
        }
    }
    CommandArguments.prototype.add = function (name, value) {
        if (value === void 0) { value = true; }
        this.arguments[name] = value;
    };
    CommandArguments.prototype.get = function (name) {
        return this.arguments[name];
    };
    CommandArguments.prototype.has = function (name) {
        return this.arguments[name] !== undefined;
    };
    return CommandArguments;
}());
exports.CommandArguments = CommandArguments;
//# sourceMappingURL=CommandArguments.js.map