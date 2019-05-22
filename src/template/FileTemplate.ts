import * as fs from 'fs';
import { StringTemplate } from "./StringTemplate";
import { Template } from './Template';

export class FileTemplate implements Template
{
    protected file: string;
    protected stringTemplate: StringTemplate;

    constructor(file: string)
    {
        if (!fs.existsSync(file)) {
            throw "File '" + file + "' does not exists.";
        }
        this.stringTemplate = new StringTemplate(fs.readFileSync(file).toString());
    }

    public render(data: any): string
    {
        return this.stringTemplate.render(data);
    }
}