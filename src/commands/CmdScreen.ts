import {ICmd} from './ICmd';

export class CmdScreen implements ICmd {

    // overwrite the execute.
    execute () {
        console.log('Make screen');
    }

}