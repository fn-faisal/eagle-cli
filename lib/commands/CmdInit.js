"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vcs_1 = require("../constants/vcs");
var chalk = require("chalk");
var child_process_1 = require("child_process");
var CmdInit = /** @class */ (function () {
    function CmdInit() {
    }
    // overwrite the execute.
    CmdInit.prototype.execute = function (name) {
        child_process_1.exec("git clone " + vcs_1.GIT_EAGLE_BLANK + " " + name, function (err, stdout, stderr) {
            if (err) {
                console.log('[' + chalk.bgRed.white('ERROR') + '] An error occurred.');
                console.log(err);
            }
            else {
                // patch ios.
                child_process_1.exec("cd " + name + " && yarn && cd ..", function (err, stdout, stderr) {
                    if (err) {
                        console.log('[' + chalk.bgRed.white('ERROR') + '] An error occurred.');
                        console.log(err);
                    }
                    console.log(chalk.green('Installing pods'));
                    child_process_1.exec("cd " + name + " && cd ios && rm -rf build && pod install && cd ..", function (err, stdout, stderr) {
                        if (err) {
                            console.log('[' + chalk.bgRed.white('ERROR') + '] An error occurred.');
                            console.log(err);
                        }
                        console.log(chalk.green('Project Initialized... Happy developing'));
                    });
                });
                // console.log(chalk.green('Project Initialized... Happy developing'));
            }
        });
    };
    return CmdInit;
}());
exports.CmdInit = CmdInit;
