export class CommandArguments
{
    protected arguments: any;

    constructor(args: Array<string>, required: Array<string>)
    {
        this.arguments = {};

        if (args.length < required.length) {
            throw new Error("Missing argument '" + required[args.length] + "'.");
        }

        for (let i = 0; i < args.length; i++) {
            let name: string = "";
            let value: any = true;
            if (required.length > i) {
                name = required[i];
                value = args[i];
            } else {
                let split = args[i].split("=");
                name = split.shift();
                value = split.join("=");
            }
            this.add(name, value);
        }
    }

    public add(name: string, value: any = true): void
    {
        this.arguments[name] = value;
    }

    public get(name: string): any
    {
        return this.arguments[name];
    }

    public has(name: string): boolean
    {
        return this.arguments[name] !== undefined;
    }
}