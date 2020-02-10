import chalk from 'chalk';
import vcsLinks from './template-vcs';
import download from 'download-git-repo';

export async function createProject(options) {
    options = {
        ...options,
        dir: options.dir || process.cwd(),
    };



    download(`direct:${vcsLinks.blank}`, options.name, {
        clone: true
    }, function (err) {
        !err ?
            console.log('%s Your eagle is ready to fly', chalk.green.bold('DONE')) :
            console.log('%s There was an error while initializing your project', chalk.red.bold('ERROR')) ; 
    })

    return true;
}