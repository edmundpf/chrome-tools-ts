import p from 'print-tools-js'
import pup from 'puppeteer-core'
import defaultJson from '../data/defaults.json'
import path from 'path'

// Variables

let defaults = { ...defaultJson }

//::: Chrome Class :::

export default class Chrome {
	// Properties

	path?: string | null
	headless?: boolean
	slow?: boolean
	browser?: any
	page?: any

	// Constructor

	constructor(args) {
		if (defaults.useLocalChrome) {
			if (process.platform === 'win32') {
				this.path = path.resolve(
					'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
				)
			} else {
				this.path = path.resolve(
					'/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe'
				)
			}
		} else {
			this.path = null
		}
		this.headless = true
		this.slow = false
		if (args != null) {
			if (args.headless != null) {
				this.headless = args.headless
			}
			if (args.slow != null) {
				this.slow = args.slow
			}
			if (args.path != null) {
				this.path = args.path
			}
			defaults = {
				...defaults,
				...args,
			}
		}
	}

	//: Launch Browser

	async launchBrowser() {
		try {
			this.browser = await pup.launch({
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
			})
			p.success(
				`Launched chrome: headless - ${this.headless} | slow motion - ${this.slow}`
			)
			return true
		} catch (error) {
			console.error(error)
			p.error('Could not launch browser')
			return false
		}
	}

	//: Close Browser

	async closeBrowser() {
		try {
			await this.browser.close()
			p.warning('Closed chrome')
			return true
		} catch (error) {
			p.error('Could not close browser')
			return false
		}
	}

	//: Wait for Selector

	async wait(selector) {
		return await this.page.waitForSelector(selector, {
			timeout: defaults.timeout * 1000,
			visible: true,
		})
	}

	//: Navigate to Page

	async navigate(url) {
		try {
			this.page = (await this.browser.pages())[0]
			await this.page.goto(url, { timeout: defaults.timeout * 1000 })
			p.success(`Navigated to ${url}`)
			return true
		} catch (error) {
			p.error(`Could not navigate to ${url}`)
			return false
		}
	}

	// Get Inner Text of HTML elements

	getInnerText(elements) {
		const text: Array<any> = []
		for (const element of elements) {
			text.push(element.innerText)
		}
		return text
	}

	//: Input

	async typeInput(selector, text) {
		try {
			await this.wait(selector)
			await this.page.focus(selector)
			p.success(`Found ${selector}`)
			await this.page.keyboard.type(text)
			p.success(`Typed text in ${selector}`)
			return true
		} catch (error) {
			p.error(`Could not type in ${selector}`)
			return false
		}
	}

	//: Checkbox set checked

	async setCheckedState(selector, checked) {
		if (checked == null) {
			checked = true
		}
		try {
			await this.wait(selector)
			const checkbox = await this.page.$(selector)
			let checkState = await (await checkbox.getProperty('checked')).jsonValue()
			p.success(`Checkbox ${selector} checked state: ${checkState}`)
			if ((checked && !checkState) || (!checked && checkState)) {
				await checkbox.click()
				p.success('Checkbox clicked')
				checkState = await (await checkbox.getProperty('checked')).jsonValue()
			}
			if (checked === checkState) {
				p.success(`Checked state: ${checkState}`)
			} else {
				p.error(`Checked state: ${checkState}`)
			}
			return true
		} catch (error) {
			if (checked) {
				p.error(`Could not check ${selector}`)
			} else {
				p.error(`Could not uncheck ${selector}`)
			}
			return false
		}
	}

	//: Select Option

	async selectOption(selector, optionSelector) {
		try {
			await this.wait(selector)
			const optionValue = await this.page.$eval(
				optionSelector,
				(optionEle) => optionEle.value
			)
			await this.page.select(selector, optionValue)
			let selectValue = await this.page.$eval(
				selector,
				(selectEle) => selectEle.value
			)
			if ((selectValue = optionValue)) {
				p.success(`Option selected: ${selectValue}`)
			} else {
				p.error(`Could not select option for ${selector}`)
			}
			return true
		} catch (error) {
			p.error(`Could not select option for ${selector}`)
			return false
		}
	}

	//: Button Click

	async buttonClick(selector) {
		try {
			await this.wait(selector)
			const button = await this.page.$(selector)
			await button.click()
			p.success(`Button ${selector} clicked`)
			return true
		} catch (error) {
			p.error(`Could not click ${selector}`)
			return false
		}
	}

	//: Check if selector exists

	async checkExists(selector) {
		try {
			const element = await this.wait(selector)
			if (element != null) {
				p.success(`${selector} found`)
				return true
			}
		} catch (error) {
			p.error(`Could not find ${selector}`)
			// await this.page.screenshot({ path: 'pageFail.png', fullPage: true })
			return false
		}
	}

	//: Get Element Text

	async getText(selector) {
		try {
			await this.wait(selector)
			const element = await this.page.$(selector)
			const text = await (await element.getProperty('textContent')).jsonValue()
			p.success(`${selector} text: ${text}`)
			return text
		} catch (error) {
			p.error(`Could not get ${selector} text`)
			return false
		}
	}

	//: Eval Attribute

	async evalAttribute(selector, attr, single) {
		if (single == null) {
			single = false
		}
		try {
			let values: Array<any> = []
			await this.wait(selector)
			values = await this.page.$$eval(
				selector,
				(eles, attr) => {
					values = []
					for (const ele of eles) {
						values.push(ele[attr])
					}
					return values
				},
				attr
			)
			p.success(`Fetched ${selector} ${attr}`)
			if (single) {
				return values[0]
			} else {
				return values
			}
		} catch (error) {
			p.error(`Could not get ${selector} ${attr}`)
			console.error(error)
			return false
		}
	}
}
