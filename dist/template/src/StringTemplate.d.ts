import { Template } from "./Template";
export declare class StringTemplate implements Template {
    protected template: string;
    constructor(template: string);
    render(data: any): string;
}
