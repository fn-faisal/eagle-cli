"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CmdScreen = /** @class */ (function () {
    function CmdScreen() {
    }
    // overwrite the execute.
    CmdScreen.prototype.execute = function () {
        console.log('Make screen');
    };
    return CmdScreen;
}());
exports.CmdScreen = CmdScreen;
