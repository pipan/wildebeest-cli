import { CommandArguments } from "./CommandArguments";

export class CommandSchema
{
    protected required: Array<string>

    constructor(required: Array<string>)
    {
        this.required = required;
    }

    parseArgs(args: Array<string>): CommandArguments
    {
        return new CommandArguments(args, this.required);
    }
}