import { CommandArguments } from "./CommandArguments";
export declare class CommandSchema {
    protected required: Array<string>;
    constructor(required: Array<string>);
    parseArgs(args: Array<string>): CommandArguments;
}
