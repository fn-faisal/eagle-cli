import * as path from 'path';
import * as fs from 'fs';
import {ICmd} from './ICmd';
import chalk = require('chalk');

const PATH_SCREENS = process.cwd()+path.sep+'src'+path.sep+'screens';
const PATH_ROUTES = process.cwd()+path.sep+'src'+path.sep+'routes.ts';
const PATH_SRC = process.cwd()+path.sep+'src';
const isWin = process.platform === "win32";

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

const PATH_MODULES = isWin === false ?
    getUnixPath() : getWinPath();

const PATH_EAGLE = PATH_MODULES+path.sep+'@codesmmith/eagle-cli';

export class CmdScreen implements ICmd {

    // overwrite the execute.
    execute (name: String) {
        const CapitalCase = name[0].toUpperCase() + name.slice(1);
        if (!fs.existsSync(PATH_SCREENS)) {
            fs.mkdirSync(PATH_SCREENS);
        }
        if (!fs.existsSync(PATH_SCREENS+path.sep+CapitalCase+'Screen')) {
            // create the dir.
            fs.mkdirSync(PATH_SCREENS+path.sep+CapitalCase+'Screen');
            
        }
        // create the controller file.
        fs.copyFileSync(PATH_EAGLE+path.sep+'templates/screen/Controller.ts', PATH_SCREENS+path.sep+CapitalCase+'Screen'+path.sep+CapitalCase+'Controller.ts');
        // set class name
        fs.readFile(PATH_EAGLE+path.sep+'templates/screen/Controller.ts', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const result = data.replace('$Controller', CapitalCase+'Controller');
            
            fs.writeFile(PATH_SCREENS+path.sep+CapitalCase+'Screen'+path.sep+CapitalCase+'Controller.ts', result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
          });
        // create the view file.
        fs.copyFileSync(PATH_EAGLE+path.sep+'templates/screen/View.tsx', PATH_SCREENS+path.sep+CapitalCase+'Screen'+path.sep+CapitalCase+'View.tsx');
        // set view name
        fs.readFile(PATH_EAGLE+path.sep+'templates/screen/View.tsx', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const result = data.replace('$View', CapitalCase+'View');
          
            fs.writeFile(PATH_SCREENS+path.sep+CapitalCase+'Screen'+path.sep+CapitalCase+'View.tsx', result, 'utf8', function (err) {
               if (err) return console.log(err);
            //    console.log(`[${chalk.greenBright('SUCCESS')}] Please register the component in routes.ts`)
            });
        });

        // set up routing.
        // let routes = require(PATH_SRC+path.sep+'routes.ts')["default"];
        // if ( routes.length <= 0 ) {
            
        // } else routes[CapitalCase.toLocaleLowerCase()] = CapitalCase;
        // fs.writeFile(PATH_SRC+path.sep+'routes.ts', `export default ${JSON.stringify(routes)}`, 'utf8', function (err: any) {
        //     if (err) return console.log(err);
        // });
    }

}