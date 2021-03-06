import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import {
    stores
} from './template-configs';
import {
    createProject
} from './main';

const pkg = require('../package.json');

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--store': String,
        '--name': String,
        '--default': Boolean,
        '--version': Boolean,
        '-d': '--default',
        '-s': '--store',
        '-n': '--name',
        '-v': '--version'
    }, {
        argv: rawArgs.slice(2),
    });

    return {
        name: args['--name'] || null,
        store: args['--store'] || null,
        options: args['--op'] || false,
        default: args['--default'] || false,
        version: args['--version'] || false
    };
}

async function promptForMissingOptions(options) {

    

    if (options.default) {
        return {
            ...options,
            store: options.store || defaultStore,
        };
    }

    const questions = [];
    if (!options.store) {
        questions.push({
            type: 'list',
            name: 'store',
            message: 'Please choose a common store.',
            choices: Object.values(stores),
            default: Object.values(stores)[0],
        });
    }

    if (!options.name) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'Name:',
            default: 'MyEagleProject',
        });
    }


    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        store: answers.store || options.store,
        name: answers.name || options.name
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    if ( options.version ) {
        console.log(`Version : %s`, chalk.greenBright.bold(pkg.version));
        return;
    }
    options = await promptForMissingOptions(options);
    await createProject(options);
}