"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CmdInit_1 = require("./CmdInit");
var CmdScreen_1 = require("./CmdScreen");
var CmdFactory = /** @class */ (function () {
    function CmdFactory() {
    }
    CmdFactory.make = function (commandType) {
        console.log(commandType instanceof CmdInit_1.CmdInit);
        if (commandType instanceof CmdInit_1.CmdInit)
            return new CmdInit_1.CmdInit();
        else if (commandType instanceof CmdScreen_1.CmdScreen)
            return new CmdScreen_1.CmdScreen();
        return null;
    };
    return CmdFactory;
}());
exports.CmdFactory = CmdFactory;
