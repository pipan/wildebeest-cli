import { StringTemplate } from "./StringTemplate";
import { Template } from './Template';
export declare class FileTemplate implements Template {
    protected file: string;
    protected stringTemplate: StringTemplate;
    constructor(file: string);
    render(data: any): string;
}
