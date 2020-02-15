import { CmdInit } from "./CmdInit";
import { CmdScreen } from './CmdScreen';
import { ICmd } from "./ICmd";

export class CmdFactory {

    public static make(commandType: ICmd): ICmd | null {
        if ( commandType instanceof CmdInit )
            return new CmdInit();
        else if (commandType instanceof CmdScreen)
            return new CmdScreen(); 
        return null;
    }

}