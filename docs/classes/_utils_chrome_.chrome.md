[chrome-tools-ts](../README.md) › [Globals](../globals.md) › ["utils/Chrome"](../modules/_utils_chrome_.md) › [Chrome](_utils_chrome_.chrome.md)

# Class: Chrome

Chrome Class

## Hierarchy

* **Chrome**

## Index

### Constructors

* [constructor](_utils_chrome_.chrome.md#constructor)

### Properties

* [blockAds](_utils_chrome_.chrome.md#optional-blockads)
* [browser](_utils_chrome_.chrome.md#optional-browser)
* [headless](_utils_chrome_.chrome.md#optional-headless)
* [page](_utils_chrome_.chrome.md#optional-page)
* [path](_utils_chrome_.chrome.md#optional-path)
* [slow](_utils_chrome_.chrome.md#optional-slow)
* [useLocalChrome](_utils_chrome_.chrome.md#optional-uselocalchrome)

### Methods

* [buttonClick](_utils_chrome_.chrome.md#buttonclick)
* [checkExists](_utils_chrome_.chrome.md#checkexists)
* [closeBrowser](_utils_chrome_.chrome.md#closebrowser)
* [evalAttribute](_utils_chrome_.chrome.md#evalattribute)
* [getInnerText](_utils_chrome_.chrome.md#getinnertext)
* [getText](_utils_chrome_.chrome.md#gettext)
* [launchBrowser](_utils_chrome_.chrome.md#launchbrowser)
* [navigate](_utils_chrome_.chrome.md#navigate)
* [selectOption](_utils_chrome_.chrome.md#selectoption)
* [setCheckedState](_utils_chrome_.chrome.md#setcheckedstate)
* [typeInput](_utils_chrome_.chrome.md#typeinput)
* [wait](_utils_chrome_.chrome.md#wait)

## Constructors

###  constructor

\+ **new Chrome**(`args?`: [ChromeArgs](../modules/_utils_chrome_.md#chromeargs)): *[Chrome](_utils_chrome_.chrome.md)*

*Defined in [utils/Chrome.ts:33](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L33)*

Constructor

**Parameters:**

Name | Type |
------ | ------ |
`args?` | [ChromeArgs](../modules/_utils_chrome_.md#chromeargs) |

**Returns:** *[Chrome](_utils_chrome_.chrome.md)*

## Properties

### `Optional` blockAds

• **blockAds**? : *undefined | false | true*

*Defined in [utils/Chrome.ts:31](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L31)*

___

### `Optional` browser

• **browser**? : *any*

*Defined in [utils/Chrome.ts:32](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L32)*

___

### `Optional` headless

• **headless**? : *undefined | false | true*

*Defined in [utils/Chrome.ts:29](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L29)*

___

### `Optional` page

• **page**? : *any*

*Defined in [utils/Chrome.ts:33](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L33)*

___

### `Optional` path

• **path**? : *undefined | string*

*Defined in [utils/Chrome.ts:27](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L27)*

___

### `Optional` slow

• **slow**? : *undefined | false | true*

*Defined in [utils/Chrome.ts:30](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L30)*

___

### `Optional` useLocalChrome

• **useLocalChrome**? : *undefined | false | true*

*Defined in [utils/Chrome.ts:28](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L28)*

## Methods

###  buttonClick

▸ **buttonClick**(`selector`: string): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:233](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L233)*

Click Button Selector

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *Promise‹boolean›*

___

###  checkExists

▸ **checkExists**(`selector`: string): *Promise‹undefined | false | true›*

*Defined in [utils/Chrome.ts:250](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L250)*

Check if Selector Exists

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *Promise‹undefined | false | true›*

___

###  closeBrowser

▸ **closeBrowser**(): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:109](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L109)*

Close Browser

**Returns:** *Promise‹boolean›*

___

###  evalAttribute

▸ **evalAttribute**(`selector`: string, `attr`: string, `single`: boolean): *Promise‹any›*

*Defined in [utils/Chrome.ts:285](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L285)*

Evaluate Attribute of Selector

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`selector` | string | - |
`attr` | string | - |
`single` | boolean | false |

**Returns:** *Promise‹any›*

___

###  getInnerText

▸ **getInnerText**(`elements`: Array‹any›): *any[]*

*Defined in [utils/Chrome.ts:151](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L151)*

Get Inner Text of HTML Elements

**Parameters:**

Name | Type |
------ | ------ |
`elements` | Array‹any› |

**Returns:** *any[]*

___

###  getText

▸ **getText**(`selector`: string): *Promise‹any›*

*Defined in [utils/Chrome.ts:268](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L268)*

Get Text from Selector

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *Promise‹any›*

___

###  launchBrowser

▸ **launchBrowser**(): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:78](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L78)*

Launch Browser

**Returns:** *Promise‹boolean›*

___

###  navigate

▸ **navigate**(`url`: string): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:135](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L135)*

Navigate to URL

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹boolean›*

___

###  selectOption

▸ **selectOption**(`selector`: string, `optionSelector`: string): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:209](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L209)*

Select Option Selector from List Selector

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |
`optionSelector` | string |

**Returns:** *Promise‹boolean›*

___

###  setCheckedState

▸ **setCheckedState**(`selector`: string, `checked`: boolean): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:181](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L181)*

Set Checked State of Selector

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`selector` | string | - |
`checked` | boolean | true |

**Returns:** *Promise‹boolean›*

___

###  typeInput

▸ **typeInput**(`selector`: string, `text`: string): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:163](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L163)*

Type Input in Selector

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |
`text` | string |

**Returns:** *Promise‹boolean›*

___

###  wait

▸ **wait**(`selector`: string): *Promise‹any›*

*Defined in [utils/Chrome.ts:124](https://github.com/edmundpf/chrome-tools-ts/blob/e49a4fc/src/utils/Chrome.ts#L124)*

Wait for Selector

**Parameters:**

Name | Type |
------ | ------ |
`selector` | string |

**Returns:** *Promise‹any›*
