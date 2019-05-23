import { StringFormater } from "./StringFormater";
import { injectable } from "inversify";

@injectable()
export class PascalCaseFormater implements StringFormater
{
    protected normalize(value: string): string
    {
        value = value.replace(new RegExp('[^a-zA-Z]', 'g'), '-');
        let normalized: string = "";
        for (let i = 0; i < value.length; i++) {
            if (value[i] == value[i].toUpperCase()) {
                normalized += "-";
            }
            normalized += value[i];
        }
        return normalized.toLowerCase();
    }

    format(value: string): string
    {
        let normalized: string = this.normalize(value);
        let pascalCase: string = "";
        let toUpper: boolean = true;
        for (let i = 0; i < normalized.length; i++) {
            if (normalized[i] == '-') {
                toUpper = true;
                continue;
            }
            if (toUpper) {
                pascalCase += normalized[i].toUpperCase();
                toUpper = false;
            } else {
                pascalCase += normalized[i];   
            }
        }
        return pascalCase;
    }
}