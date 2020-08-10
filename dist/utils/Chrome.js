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
const print_tools_js_1 = __importDefault(require("print-tools-js"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const defaults_json_1 = __importDefault(require("../data/defaults.json"));
const path_1 = __importDefault(require("path"));
// Variables
let defaults = Object.assign({}, defaults_json_1.default);
//::: Chrome Class :::
class Chrome {
    // Constructor
    constructor(args) {
        if (defaults.useLocalChrome) {
            if (process.platform === 'win32') {
                this.path = path_1.default.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe');
            }
            else {
                this.path = path_1.default.resolve('/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe');
            }
        }
        else {
            this.path = null;
        }
        this.headless = true;
        this.slow = false;
        if (args != null) {
            if (args.headless != null) {
                this.headless = args.headless;
            }
            if (args.slow != null) {
                this.slow = args.slow;
            }
            if (args.path != null) {
                this.path = args.path;
            }
            defaults = Object.assign(Object.assign({}, defaults), args);
        }
    }
    //: Launch Browser
    launchBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.browser = yield puppeteer_core_1.default.launch({
                    headless: this.headless,
                    defaultViewport: null,
                    slowMo: this.slow ? defaults.slowMo : null,
                    executablePath: this.path ? this.path : null,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        `--disable-extensions-except=${defaults.uBlockPath}`,
                        `--load-extension=${defaults.uBlockPath}`,
                    ],
                });
                print_tools_js_1.default.success(`Launched chrome: headless - ${this.headless} | slow motion - ${this.slow}`);
                return true;
            }
            catch (error) {
                console.error(error);
                print_tools_js_1.default.error('Could not launch browser');
                return false;
            }
        });
    }
    //: Close Browser
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.browser.close();
                print_tools_js_1.default.warning('Closed chrome');
                return true;
            }
            catch (error) {
                print_tools_js_1.default.error('Could not close browser');
                return false;
            }
        });
    }
    //: Wait for Selector
    wait(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.waitForSelector(selector, {
                timeout: defaults.timeout * 1000,
                visible: true,
            });
        });
    }
    //: Navigate to Page
    navigate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.page = (yield this.browser.pages())[0];
                yield this.page.goto(url, { timeout: defaults.timeout * 1000 });
                print_tools_js_1.default.success(`Navigated to ${url}`);
                return true;
            }
            catch (error) {
                print_tools_js_1.default.error(`Could not navigate to ${url}`);
                return false;
            }
        });
    }
    // Get Inner Text of HTML elements
    getInnerText(elements) {
        const text = [];
        for (const element of elements) {
            text.push(element.innerText);
        }
        return text;
    }
    //: Input
    typeInput(selector, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                yield this.page.focus(selector);
                print_tools_js_1.default.success(`Found ${selector}`);
                yield this.page.keyboard.type(text);
                print_tools_js_1.default.success(`Typed text in ${selector}`);
                return true;
            }
            catch (error) {
                print_tools_js_1.default.error(`Could not type in ${selector}`);
                return false;
            }
        });
    }
    //: Checkbox set checked
    setCheckedState(selector, checked) {
        return __awaiter(this, void 0, void 0, function* () {
            if (checked == null) {
                checked = true;
            }
            try {
                yield this.wait(selector);
                const checkbox = yield this.page.$(selector);
                let checkState = yield (yield checkbox.getProperty('checked')).jsonValue();
                print_tools_js_1.default.success(`Checkbox ${selector} checked state: ${checkState}`);
                if ((checked && !checkState) || (!checked && checkState)) {
                    yield checkbox.click();
                    print_tools_js_1.default.success('Checkbox clicked');
                    checkState = yield (yield checkbox.getProperty('checked')).jsonValue();
                }
                if (checked === checkState) {
                    print_tools_js_1.default.success(`Checked state: ${checkState}`);
                }
                else {
                    print_tools_js_1.default.error(`Checked state: ${checkState}`);
                }
                return true;
            }
            catch (error) {
                if (checked) {
                    print_tools_js_1.default.error(`Could not check ${selector}`);
                }
                else {
                    print_tools_js_1.default.error(`Could not uncheck ${selector}`);
                }
                return false;
            }
        });
    }
    //: Select Option
    selectOption(selector, optionSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                const optionValue = yield this.page.$eval(optionSelector, (optionEle) => optionEle.value);
                yield this.page.select(selector, optionValue);
                let selectValue = yield this.page.$eval(selector, (selectEle) => selectEle.value);
                if ((selectValue = optionValue)) {
                    print_tools_js_1.default.success(`Option selected: ${selectValue}`);
                }
                else {
                    print_tools_js_1.default.error(`Could not select option for ${selector}`);
                }
                return true;
            }
            catch (error) {
                print_tools_js_1.default.error(`Could not select option for ${selector}`);
                return false;
            }
        });
    }
    //: Button Click
    buttonClick(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                const button = yield this.page.$(selector);
                yield button.click();
                print_tools_js_1.default.success(`Button ${selector} clicked`);
                return true;
            }
            catch (error) {
                print_tools_js_1.default.error(`Could not click ${selector}`);
                return false;
            }
        });
    }
    //: Check if selector exists
    checkExists(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const element = yield this.wait(selector);
                if (element != null) {
                    print_tools_js_1.default.success(`${selector} found`);
                    return true;
                }
            }
            catch (error) {
                print_tools_js_1.default.error(`Could not find ${selector}`);
                // await this.page.screenshot({ path: 'pageFail.png', fullPage: true })
                return false;
            }
        });
    }
    //: Get Element Text
    getText(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(selector);
                const element = yield this.page.$(selector);
                const text = yield (yield element.getProperty('textContent')).jsonValue();
                print_tools_js_1.default.success(`${selector} text: ${text}`);
                return text;
            }
            catch (error) {
                print_tools_js_1.default.error(`Could not get ${selector} text`);
                return false;
            }
        });
    }
    //: Eval Attribute
    evalAttribute(selector, attr, single) {
        return __awaiter(this, void 0, void 0, function* () {
            if (single == null) {
                single = false;
            }
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
                print_tools_js_1.default.success(`Fetched ${selector} ${attr}`);
                if (single) {
                    return values[0];
                }
                else {
                    return values;
                }
            }
            catch (error) {
                print_tools_js_1.default.error(`Could not get ${selector} ${attr}`);
                console.error(error);
                return false;
            }
        });
    }
}
exports.default = Chrome;
