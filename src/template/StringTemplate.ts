import { Template } from "./Template";

export class StringTemplate implements Template
{
    protected template: string;

    constructor(template: string)
    {
        this.template = template;
    }

    public render(data: any): string
    {
        let result: string = this.template;
        for (let key in data) {
            result = result.replace(new RegExp("%" + key + "%", 'g'), data[key]);
        }
        return result;
    }
}