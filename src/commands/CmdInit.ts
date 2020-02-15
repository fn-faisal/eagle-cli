import {ICmd} from './ICmd';

export class CmdInit implements ICmd {

    // overwrite the execute.
    execute () {
        console.log('Initialize project');
    }

}