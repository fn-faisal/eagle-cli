import {ICmd} from './ICmd';
import { GIT_EAGLE_BLANK } from '../constants/vcs';
import * as chalk from 'chalk';
import {exec} from 'child_process';
import {trackProgress} from './Util';

export class CmdInit implements ICmd {

    // overwrite the execute.
    execute (name?: String) {
        exec(`git clone ${GIT_EAGLE_BLANK} ${name}`, (err, stdout, stderr) => {
            if (err) {
                console.log('['+chalk.bgRed.white('ERROR')+'] An error occurred.');
                console.log(err);
            }
            else {
                // patch ios.
                exec(`cd ${name} && yarn && cd ..`, (err, stdout, stderr) => {
                    if (err) {
                        console.log('['+chalk.bgRed.white('ERROR')+'] An error occurred.');
                        console.log(err);
                    }
                    console.log(chalk.green('Installing pods'));
                    exec(`cd ${name} && cd ios && rm -rf build && pod install && cd ..`, (err, stdout, stderr) => {
                        if (err) {
                            console.log('['+chalk.bgRed.white('ERROR')+'] An error occurred.');
                            console.log(err);
                        }
                        console.log(chalk.green('Project Initialized... Happy developing'));
                    });
                });
                // console.log(chalk.green('Project Initialized... Happy developing'));
            }
        });
    }

}