import puppet from 'puppeteer'
import Print from '@edmundpf/print-ts'
import defaults from '../data/defaults.json'
import { resolve } from 'path'

// Init

const p = new Print()

// Chrome Args Type

type ChromeArgs = {
	path?: string
	useLocalChrome?: boolean
	headless?: boolean
	slow?: boolean
	blockAds?: boolean
}

/**
 * Chrome Class
 */

export default class Chrome {
	// Properties

	path?: string
	useLocalChrome?: boolean
	headless?: boolean
	slow?: boolean
	blockAds?: boolean
	browser?: any
	page?: any

	/**
	 * Constructor
	 */

	constructor(args?: ChromeArgs) {
		// Defaults

		const opts = {
			path: undefined,
			useLocalChrome: true,
			headless: true,
			slow: false,
			blockAds: false,
			browser: undefined,
			page: undefined,
			...args,
		}
		this.path = opts.path
		this.useLocalChrome = opts.useLocalChrome
		this.headless = opts.headless
		this.slow = opts.slow
		this.blockAds = opts.blockAds
		this.browser = undefined
		this.page = undefined

		// Set Chrome Path

		if (this.useLocalChrome && !this.path) {
			const setPath = (key: string) => (this.path = resolve(defaults[key]))
			if (process.platform == 'win32') {
				setPath('windowsChromePath')
			} else if (process.platform == 'linux') {
				setPath('linuxChromePath')
			} else {
				setPath('wslChromePath')
			}
		}
	}

	/**
	 * Launch Browser
	 */

	async launchBrowser() {
		try {
			let chromeArgs = ['--no-sandbox', '--disable-setuid-sandbox']
			if (this.blockAds) {
				chromeArgs = [
					...chromeArgs,
					`--disable-extensions-except=${defaults.uBlockPath}`,
					`--load-extension=${defaults.uBlockPath}`,
				]
			}
			this.browser = await puppet.launch({
				headless: this.headless,
				slowMo: this.slow ? defaults.slowMo : undefined,
				executablePath: this.path ? this.path : undefined,
				args: chromeArgs,
			})
			p.success(
				`Launched chrome: headless - ${this.headless} | slow motion - ${this.slow}`
			)
			return true
		} catch (error) {
			p.error('Could not launch browser')
			p.error(error)
			return false
		}
	}

	/**
	 * Close Browser
	 */

	async closeBrowser() {
		try {
			await this.browser.close()
			p.warn('Closed chrome')
			return true
		} catch (error) {
			p.error('Could not close browser')
			return false
		}
	}

	/**
	 * Wait for Selector
	 */

	async wait(selector: string) {
		return await this.page.waitForSelector(selector, {
			timeout: defaults.timeout * 1000,
			visible: true,
		})
	}

	/**
	 * Navigate to URL
	 */

	async navigate(url: string) {
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

	/**
	 * Get Inner Text of HTML Elements
	 */

	getInnerText(elements: Array<any>) {
		const text: Array<any> = []
		for (const element of elements) {
			text.push(element.innerText)
		}
		return text
	}

	/**
	 * Type Input in Selector
	 */

	async typeInput(selector: string, text: string) {
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

	/**
	 * Set Checked State of Selector
	 */

	async setCheckedState(selector: string, checked = true) {
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
			if (checked == checkState) {
				p.success(`Checked state: ${checkState}`)
				return true
			} else {
				p.error(`Checked state: ${checkState}`)
				return false
			}
		} catch (error) {
			p.error(`Could not ${checked ? 'check' : 'uncheck'} ${selector}`)
			return false
		}
	}

	/**
	 * Select Option Selector from List Selector
	 */

	async selectOption(selector: string, optionSelector: string) {
		try {
			await this.wait(selector)
			const getValue = (ele) => ele.value
			const optionValue = await this.page.$eval(optionSelector, getValue)
			await this.page.select(selector, optionValue)
			const selectValue = await this.page.$eval(selector, getValue)
			if (selectValue == optionValue) {
				p.success(`Option selected: ${selectValue}`)
				return true
			} else {
				p.error(`Could not select option for ${selector}`)
				return false
			}
		} catch (error) {
			p.error(`Could not select option for ${selector}`)
			return false
		}
	}

	/**
	 * Click Button Selector
	 */

	async buttonClick(selector: string) {
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

	/**
	 * Check if Selector Exists
	 */

	async checkExists(selector: string) {
		try {
			const element = await this.wait(selector)
			if (element) {
				p.success(`${selector} found`)
				return true
			}
		} catch (error) {
			p.error(`Could not find ${selector}`)
			// await this.page.screenshot({ path: 'pageFail.png', fullPage: true })
			return false
		}
	}

	/**
	 * Get Text from Selector
	 */

	async getText(selector: string) {
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

	/**
	 * Evaluate Attribute of Selector
	 */

	async evalAttribute(selector: string, attr: string, single = false) {
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
			return single ? values[0] : values
		} catch (error) {
			p.error(`Could not get ${selector} ${attr}`)
			return false
		}
	}
}
