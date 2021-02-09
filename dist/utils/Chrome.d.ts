declare type ChromeArgs = {
    path?: string;
    useLocalChrome?: boolean;
    headless?: boolean;
    slow?: boolean;
    blockAds?: boolean;
};
/**
 * Chrome Class
 */
export default class Chrome {
    path?: string;
    useLocalChrome?: boolean;
    headless?: boolean;
    slow?: boolean;
    blockAds?: boolean;
    browser?: any;
    page?: any;
    /**
     * Constructor
     */
    constructor(args?: ChromeArgs);
    /**
     * Launch Browser
     */
    launchBrowser(): Promise<boolean>;
    /**
     * Close Browser
     */
    closeBrowser(): Promise<boolean>;
    /**
     * Wait for Selector
     */
    wait(selector: string): Promise<any>;
    /**
     * Navigate to URL
     */
    navigate(url: string): Promise<boolean>;
    /**
     * Get Inner Text of HTML Elements
     */
    getInnerText(elements: Array<any>): any[];
    /**
     * Type Input in Selector
     */
    typeInput(selector: string, text: string): Promise<boolean>;
    /**
     * Set Checked State of Selector
     */
    setCheckedState(selector: string, checked?: boolean): Promise<boolean>;
    /**
     * Select Option Selector from List Selector
     */
    selectOption(selector: string, optionSelector: string): Promise<boolean>;
    /**
     * Click Button Selector
     */
    buttonClick(selector: string): Promise<boolean>;
    /**
     * Check if Selector Exists
     */
    checkExists(selector: string): Promise<boolean | undefined>;
    /**
     * Get Text from Selector
     */
    getText(selector: string): Promise<any>;
    /**
     * Evaluate Attribute of Selector
     */
    evalAttribute(selector: string, attr: string, single?: boolean): Promise<any>;
}
export {};
