"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandArguments_1 = require("./CommandArguments");
var CommandSchema = (function () {
    function CommandSchema(required) {
        this.required = required;
    }
    CommandSchema.prototype.parseArgs = function (args) {
        return new CommandArguments_1.CommandArguments(args, this.required);
    };
    return CommandSchema;
}());
exports.CommandSchema = CommandSchema;
//# sourceMappingURL=CommandSchema.js.map