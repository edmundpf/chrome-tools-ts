"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const print_ts_1 = __importDefault(require("@edmundpf/print-ts"));
const defaults_json_1 = __importDefault(require("../data/defaults.json"));
const path_1 = require("path");
// Init
const p = new print_ts_1.default();
/**
 * Chrome Class
 */
class Chrome {
    /**
     * Constructor
     */
    constructor(args) {
        // Defaults
        const opts = Object.assign({ path: undefined, useLocalChrome: true, headless: true, slow: false, blockAds: false, browser: undefined, page: undefined }, args);
        this.path = opts.path;
        this.useLocalChrome = opts.useLocalChrome;
        this.headless = opts.headless;
        this.slow = opts.slow;
        this.blockAds = opts.blockAds;
        this.browser = undefined;
        this.page = undefined;
        // Set Chrome Path
        if (this.useLocalChrome && !this.path) {
            const setPath = (key) => this.path = path_1.resolve(defaults_json_1.default[key]);
            if (process.platform == 'win32') {
                setPath('windowsChromePath');
            }
            else if (process.platform == 'linux') {
                setPath('linuxChromePath');
            }
            else {
                setPath('wslChromePath');
            }
        }
    }
    /**
     * Launch Browser
     */
    launchBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chromeArgs = [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ];
                if (this.blockAds) {
                    chromeArgs = [
                        ...chromeArgs,
                        `--disable-extensions-except=${defaults_json_1.default.uBlockPath}`,
                        `--load-extension=${defaults_json_1.default.uBlockPath}`,
                    ];
                }
                this.browser = yield puppeteer_1.default.launch({
                    headless: this.headless,
                    slowMo: this.slow ? defaults_json_1.default.slowMo : undefined,
                    executablePath: this.path ? this.path : undefined,
                    args: chromeArgs
                });
                p.success(`Launched chrome: headless - ${this.headless} | slow motion - ${this.slow}`);
                return true;
            }
            catch (error) {
                p.error('Could not launch browser');
                p.error(error);
                return false;
            }
        });
    }
    /**
     * Close Browser
     */
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.browser.close();
                p.warn('Closed chrome');
                return true;
            }
            catch (error) {
                p.error('Could not close browser');
                return false;
            }
        });
    }
    /**
     * Wait for Selector
     */
    wait(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.waitForSelector(selector, {
                timeout: defaults_json_1.default.timeout * 1000,
                visible: true,
            });
        });
    }
    /**
     * Navigate to URL
     */
    navigate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.page = (yield this.browser.pages())[0];
                yield this.page.goto(url, { timeout: defaults_json_1.default.timeout * 1000 });
                p.success(`Navigated to ${url}`);
                return true;
            }
            catch (error) {
                p.error(`Could not navigate to ${url}`);
                return false;
            }
        });
    }
    /**
     * Get Inner Text of HTML Elements
     */
    getInnerText(elements) {
        const text = [];
        for (const element of elements) {
            text.push(element.innerText);
        }
        return text;
    }
    /**
     * Type Input in Selector
     */
    typeInput(selector, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                yield this.page.focus(selector);
                p.success(`Found ${selector}`);
                yield this.page.keyboard.type(text);
                p.success(`Typed text in ${selector}`);
                return true;
            }
            catch (error) {
                p.error(`Could not type in ${selector}`);
                return false;
            }
        });
    }
    /**
     * Set Checked State of Selector
     */
    setCheckedState(selector, checked = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                const checkbox = yield this.page.$(selector);
                let checkState = yield (yield checkbox.getProperty('checked')).jsonValue();
                p.success(`Checkbox ${selector} checked state: ${checkState}`);
                if ((checked && !checkState) || (!checked && checkState)) {
                    yield checkbox.click();
                    p.success('Checkbox clicked');
                    checkState = yield (yield checkbox.getProperty('checked')).jsonValue();
                }
                if (checked == checkState) {
                    p.success(`Checked state: ${checkState}`);
                    return true;
                }
                else {
                    p.error(`Checked state: ${checkState}`);
                    return false;
                }
            }
            catch (error) {
                p.error(`Could not ${checked ? 'check' : 'uncheck'} ${selector}`);
                return false;
            }
        });
    }
    /**
     * Select Option Selector from List Selector
     */
    selectOption(selector, optionSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                const getValue = (ele) => ele.value;
                const optionValue = yield this.page.$eval(optionSelector, getValue);
                yield this.page.select(selector, optionValue);
                const selectValue = yield this.page.$eval(selector, getValue);
                if (selectValue == optionValue) {
                    p.success(`Option selected: ${selectValue}`);
                    return true;
                }
                else {
                    p.error(`Could not select option for ${selector}`);
                    return false;
                }
            }
            catch (error) {
                p.error(`Could not select option for ${selector}`);
                return false;
            }
        });
    }
    /**
     * Click Button Selector
     */
    buttonClick(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                const button = yield this.page.$(selector);
                yield button.click();
                p.success(`Button ${selector} clicked`);
                return true;
            }
            catch (error) {
                p.error(`Could not click ${selector}`);
                return false;
            }
        });
    }
    /**
     * Check if Selector Exists
     */
    checkExists(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const element = yield this.wait(selector);
                if (element) {
                    p.success(`${selector} found`);
                    return true;
                }
            }
            catch (error) {
                p.error(`Could not find ${selector}`);
                // await this.page.screenshot({ path: 'pageFail.png', fullPage: true })
                return false;
            }
        });
    }
    /**
     * Get Text from Selector
     */
    getText(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                const element = yield this.page.$(selector);
                const text = yield (yield element.getProperty('textContent')).jsonValue();
                p.success(`${selector} text: ${text}`);
                return text;
            }
            catch (error) {
                p.error(`Could not get ${selector} text`);
                return false;
            }
        });
    }
    /**
     * Evaluate Attribute of Selector
     */
    evalAttribute(selector, attr, single = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let values = [];
                yield this.wait(selector);
                values = yield this.page.$$eval(selector, (eles, attr) => {
                    values = [];
                    for (const ele of eles) {
                        values.push(ele[attr]);
                    }
                    return values;
                }, attr);
                p.success(`Fetched ${selector} ${attr}`);
                return single ? values[0] : values;
            }
            catch (error) {
                p.error(`Could not get ${selector} ${attr}`);
                return false;
            }
        });
    }
}
exports.default = Chrome;
