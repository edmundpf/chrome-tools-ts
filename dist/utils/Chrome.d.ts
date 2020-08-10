export default class Chrome {
    path?: string | null;
    headless?: boolean;
    slow?: boolean;
    browser?: any;
    page?: any;
    constructor(args: any);
    launchBrowser(): Promise<boolean>;
    closeBrowser(): Promise<boolean>;
    wait(selector: any): Promise<any>;
    navigate(url: any): Promise<boolean>;
    getInnerText(elements: any): any[];
    typeInput(selector: any, text: any): Promise<boolean>;
    setCheckedState(selector: any, checked: any): Promise<boolean>;
    selectOption(selector: any, optionSelector: any): Promise<boolean>;
    buttonClick(selector: any): Promise<boolean>;
    checkExists(selector: any): Promise<boolean | undefined>;
    getText(selector: any): Promise<any>;
    evalAttribute(selector: any, attr: any, single: any): Promise<any>;
}
