import { Application } from '@wildebeest/js-modules';
import { CliModule, StringFormater } from '../src';


let app: Application = new Application();
app.run([CliModule]);
let pascalCaseFormater: StringFormater = app.getContainer().getNamed("StringFormater", "pascalCase");

test("spaces", () => {
    expect(pascalCaseFormater.format("test text space")).toEqual("TestTextSpace");
});

test("in pacal case", () => {
    expect(pascalCaseFormater.format("TestTextSpace")).toEqual("TestTextSpace");
});

test("in cammel case", () => {
    expect(pascalCaseFormater.format("testTextSpace")).toEqual("TestTextSpace");
});

test("dots", () => {
    expect(pascalCaseFormater.format("test.text.space")).toEqual("TestTextSpace");
});

test("dashes", () => {
    expect(pascalCaseFormater.format("test-text-space")).toEqual("TestTextSpace");
});

test("single word", () => {
    expect(pascalCaseFormater.format("test")).toEqual("Test");
});

test("multiple non alphabet chars", () => {
    expect(pascalCaseFormater.format("test--multiple")).toEqual("TestMultiple");
});

test("numbers", () => {
    expect(pascalCaseFormater.format("test0num1ber")).toEqual("TestNumBer");
});

test("mixed", () => {
    expect(pascalCaseFormater.format("test-some  very.sk wierd//Sentan$e")).toEqual("TestSomeVerySkWierdSentanE");
});

test("last char", () => {
    expect(pascalCaseFormater.format("test=")).toEqual("Test");
});

test("every letter seperated", () => {
    expect(pascalCaseFormater.format("t.e.s.t")).toEqual("TEST");
});