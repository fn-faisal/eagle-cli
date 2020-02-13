import chalk from 'chalk';
import vcsLinks from './template-vcs';
import download from 'download-git-repo';
import fs from 'fs';
import path from 'path';


const PATH_SCREENS = process.cwd()+path.sep+'src'+path.sep+'screens';
const isWin = process.platform === "win32";

const PATH_MODULES = isWin === false ?
    getUnixPath() : getWinPath();

const PATH_EAGLE = PATH_MODULES+path.sep+'@codesmmith/eagle-cli';

function getUnixPath () {
    if (fs.existsSync('/usr/local/lib/node')) return '/usr/local/lib/node';
    else if (fs.existsSync('/usr/local/lib/node_modules')) return '/usr/local/lib/node_modules';
    return null;
}

function getWinPath () {
    if (fs.existsSync('%USERPROFILE%\AppData\Roaming\npm\node_modules')) return '%USERPROFILE%\AppData\Roaming\npm\node_modules';
    else if (fs.existsSync('%USERPROFILE%\AppData\npm\node_modules')) return '%USERPROFILE%\AppData\npm\node_modules';
    return null;
}

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

export async function createScreen(options) {
    if (!fs.existsSync(PATH_SCREENS)) {
        fs.mkdirSync(PATH_SCREENS);
    }

    if (!fs.existsSync(PATH_SCREENS+path.sep+options.newScreen+'Screen')) {
        // create the dir.
        fs.mkdirSync(PATH_SCREENS+path.sep+options.newScreen+'Screen');
        
    }
    // create the controller file.
    fs.copyFileSync(PATH_EAGLE+path.sep+'templates/screen/Controller.ts', PATH_SCREENS+path.sep+options.newScreen+'Screen'+path.sep+options.newScreen+'Controller.ts');
    // set class name
    fs.readFile(PATH_EAGLE+path.sep+'templates/screen/Controller.ts', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace('$Controller', options.newScreen+'Controller');
      
        fs.writeFile(PATH_EAGLE+path.sep+'templates/screen/Controller.ts', result, 'utf8', function (err) {
           if (err) return console.log(err);
        });
      });
    // create the view file.
    fs.copyFileSync(PATH_EAGLE+path.sep+'templates/screen/View.tsx', PATH_SCREENS+path.sep+options.newScreen+'Screen'+path.sep+options.newScreen+'View.tsx');
    // set view name
    fs.readFile(PATH_EAGLE+path.sep+'templates/screen/View.tsx', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace('$View', options.newScreen+'View');
      
        fs.writeFile(PATH_EAGLE+path.sep+'templates/screen/View.tsx', result, 'utf8', function (err) {
           if (err) return console.log(err);
        });
      });
}