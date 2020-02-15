"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CmdInit = /** @class */ (function () {
    function CmdInit() {
    }
    // overwrite the execute.
    CmdInit.prototype.execute = function () {
        console.log('Initialize project');
    };
    return CmdInit;
}());
exports.CmdInit = CmdInit;
