import { ICmd } from "./ICmd";
export declare class CmdFactory {
    static make(commandType: ICmd): ICmd | null;
}
