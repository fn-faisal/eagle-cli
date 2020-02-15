"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arg = require("arg");
var operation_1 = require("./constants/operation");
// import arg from 'arg';
// import inquirer from 'inquirer';
// import chalk from 'chalk';
// import {
//     stores
// } from './template-configs';
// import {
//     createProject, createScreen
// } from './main';
// async function copyTemplateFiles(options) {
//     return copy(options.templateDirectory, options.targetDirectory, {
//         clobber: false,
//     });
// }
// function parseArgumentsIntoOptions(rawArgs) {
//     console.log(rawArgs.slice(2));
//     const args = arg({
//         '--store': String,
//         '--default': Boolean,
//         '--name': String,
//         '--new-screen': String,
//         '-d': '--default',
//         '-s': '--store',
//         '-n': '--name'
//     }, {
//         argv: rawArgs.slice(2),
//     });
//     return {
//         name: args['--name'] || null,
//         store: args['--store'] || null,
//         options: args['--op'] || false,
//         default: args['--default'] || false,
//         newScreen: args['--new-screen'] || null,
//     };
// }
// async function promptForMissingOptions(options) {
//     if (options.default) {
//         return {
//             ...options,
//             store: options.store || defaultStore,
//         };
//     }
//     const questions = [];
//     if (!options.store) {
//         questions.push({
//             type: 'list',
//             name: 'store',
//             message: 'Please choose a common store.',
//             choices: Object.values(stores),
//             default: Object.values(stores)[0],
//         });
//     }
//     if (!options.name) {
//         questions.push({
//             type: 'input',
//             name: 'name',
//             message: 'Name:',
//             default: 'MyEagleProject',
//         });
//     }
//     const answers = await inquirer.prompt(questions);
//     return {
//         ...options,
//         store: answers.store || options.store,
//         name: answers.name || options.name
//     };
// }
function parseArgumentsIntoOptions(rawArgs) {
    return arg({}, {
        argv: rawArgs.slice(2),
    });
    // return {
    // };
}
/**
 * The function run when the cli is executed.
 * @param args the command line arguments.
 */
function run(args) {
    var options = parseArgumentsIntoOptions(args);
    var operation = options._.pop();
    // check operation.
    switch (operation) {
        case operation_1.OP_INIT:
            console.log('create a new project');
            break;
        case operation_1.OP_SCREEN:
            console.log('new screen');
            break;
        default:
            console.log('Output Help');
    }
    // CmdFactory.make(new CmdScreen);
}
exports.run = run;
