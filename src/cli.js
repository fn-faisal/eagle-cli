import arg from 'arg';
import inquirer from 'inquirer';

const stores = {
    'context-api-hooks': 'Context Api ( Hooks )',
    'redux': 'Redux'   
};

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
      {
        '--op': Boolean,
        '-o': '--o',
        '--default': Boolean,
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
        options: args['--op'] || false,
        default: args['--default'] || false,
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
    if (!options.template) {
      questions.push({
        type: 'list',
        name: 'store',
        message: 'Please choose a common store.',
        choices: Object.values(stores),
        default: Object.values(stores)[0],
      });
    }
   
   
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      store: answers.store || options.store,
    };
   }
   
   export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    console.log(options);
   }
