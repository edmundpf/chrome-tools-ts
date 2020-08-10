[chrome-tools-ts](../README.md) › [Globals](../globals.md) › ["utils/Chrome"](../modules/_utils_chrome_.md) › [Chrome](_utils_chrome_.chrome.md)

# Class: Chrome

## Hierarchy

* **Chrome**

## Index

### Constructors

* [constructor](_utils_chrome_.chrome.md#constructor)

### Properties

* [browser](_utils_chrome_.chrome.md#optional-browser)
* [headless](_utils_chrome_.chrome.md#optional-headless)
* [page](_utils_chrome_.chrome.md#optional-page)
* [path](_utils_chrome_.chrome.md#optional-path)
* [slow](_utils_chrome_.chrome.md#optional-slow)

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

\+ **new Chrome**(`args`: any): *[Chrome](_utils_chrome_.chrome.md)*

*Defined in [utils/Chrome.ts:19](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

**Returns:** *[Chrome](_utils_chrome_.chrome.md)*

## Properties

### `Optional` browser

• **browser**? : *any*

*Defined in [utils/Chrome.ts:18](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L18)*

___

### `Optional` headless

• **headless**? : *undefined | false | true*

*Defined in [utils/Chrome.ts:16](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L16)*

___

### `Optional` page

• **page**? : *any*

*Defined in [utils/Chrome.ts:19](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L19)*

___

### `Optional` path

• **path**? : *string | null*

*Defined in [utils/Chrome.ts:15](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L15)*

___

### `Optional` slow

• **slow**? : *undefined | false | true*

*Defined in [utils/Chrome.ts:17](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L17)*

## Methods

###  buttonClick

▸ **buttonClick**(`selector`: any): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:205](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |

**Returns:** *Promise‹boolean›*

___

###  checkExists

▸ **checkExists**(`selector`: any): *Promise‹undefined | false | true›*

*Defined in [utils/Chrome.ts:220](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |

**Returns:** *Promise‹undefined | false | true›*

___

###  closeBrowser

▸ **closeBrowser**(): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:85](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L85)*

**Returns:** *Promise‹boolean›*

___

###  evalAttribute

▸ **evalAttribute**(`selector`: any, `attr`: any, `single`: any): *Promise‹any›*

*Defined in [utils/Chrome.ts:251](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |
`attr` | any |
`single` | any |

**Returns:** *Promise‹any›*

___

###  getInnerText

▸ **getInnerText**(`elements`: any): *any[]*

*Defined in [utils/Chrome.ts:121](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`elements` | any |

**Returns:** *any[]*

___

###  getText

▸ **getText**(`selector`: any): *Promise‹any›*

*Defined in [utils/Chrome.ts:236](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |

**Returns:** *Promise‹any›*

___

###  launchBrowser

▸ **launchBrowser**(): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:58](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L58)*

**Returns:** *Promise‹boolean›*

___

###  navigate

▸ **navigate**(`url`: any): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:107](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | any |

**Returns:** *Promise‹boolean›*

___

###  selectOption

▸ **selectOption**(`selector`: any, `optionSelector`: any): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:179](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L179)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |
`optionSelector` | any |

**Returns:** *Promise‹boolean›*

___

###  setCheckedState

▸ **setCheckedState**(`selector`: any, `checked`: any): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:147](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |
`checked` | any |

**Returns:** *Promise‹boolean›*

___

###  typeInput

▸ **typeInput**(`selector`: any, `text`: any): *Promise‹boolean›*

*Defined in [utils/Chrome.ts:131](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |
`text` | any |

**Returns:** *Promise‹boolean›*

___

###  wait

▸ **wait**(`selector`: any): *Promise‹any›*

*Defined in [utils/Chrome.ts:98](https://github.com/edmundpf/chrome-tools-ts/blob/0ef8d03/src/utils/Chrome.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`selector` | any |

**Returns:** *Promise‹any›*
