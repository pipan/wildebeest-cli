export declare class CommandArguments {
    protected arguments: any;
    constructor(args: Array<string>, required: Array<string>);
    add(name: string, value?: any): void;
    get(name: string): any;
    has(name: string): boolean;
}
