import { StringFormater } from "./StringFormater";
export declare class PascalCaseFormater implements StringFormater {
    protected normalize(value: string): string;
    format(value: string): string;
}
