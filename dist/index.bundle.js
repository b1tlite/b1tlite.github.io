/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sen"] = factory();
	else
		root["sen"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addDOMContent.js":
/*!******************************!*\
  !*** ./src/addDOMContent.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction addDOMContent(content) {\n  var node = document.createElement('h1');\n  node.innerText = content;\n  document.body.appendChild(node);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addDOMContent);\n\n//# sourceURL=webpack://sen/./src/addDOMContent.js?");

/***/ }),

/***/ "./src/capital.js":
/*!************************!*\
  !*** ./src/capital.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction capital(string) {\n  var capitalizedString = string.substring(0, 1).toUpperCase() + string.substring(1);\n  return capitalizedString;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (capital);\n\n//# sourceURL=webpack://sen/./src/capital.js?");

/***/ }),

/***/ "./src/chain.js":
/*!**********************!*\
  !*** ./src/chain.js ***!
  \**********************/
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\src\\\\chain.js: Unexpected reserved word 'await'. (18:4)\\n\\n\\u001b[0m \\u001b[90m 16 |\\u001b[39m   \\u001b[36mif\\u001b[39m (\\u001b[33m!\\u001b[39m\\u001b[33mMoralis\\u001b[39m\\u001b[33m.\\u001b[39misWeb3Enabled()) {\\u001b[0m\\n\\u001b[0m \\u001b[90m 17 |\\u001b[39m     console\\u001b[33m.\\u001b[39mlog(\\u001b[32m'Connecting'\\u001b[39m)\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 18 |\\u001b[39m     \\u001b[36mawait\\u001b[39m \\u001b[33mMoralis\\u001b[39m\\u001b[33m.\\u001b[39menableWeb3()\\u001b[0m\\n\\u001b[0m \\u001b[90m    |\\u001b[39m     \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 19 |\\u001b[39m     console\\u001b[33m.\\u001b[39mlog(\\u001b[32m'Connected'\\u001b[39m)\\u001b[0m\\n\\u001b[0m \\u001b[90m 20 |\\u001b[39m   } \\u001b[36melse\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 21 |\\u001b[39m     console\\u001b[33m.\\u001b[39mlog(\\u001b[32m'Already connected'\\u001b[39m)\\u001b[0m\\n    at instantiate (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:72:32)\\n    at constructor (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:358:12)\\n    at Parser.raise (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3335:19)\\n    at Parser.checkReservedWord (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:14046:12)\\n    at Parser.parseIdentifierName (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13985:12)\\n    at Parser.parseIdentifier (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13955:23)\\n    at Parser.parseExprAtom (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12985:27)\\n    at Parser.parseExprSubscripts (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12540:23)\\n    at Parser.parseUpdate (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12519:21)\\n    at Parser.parseMaybeUnary (C:\\\\Users\\\\Bohdan Sapozhnikov\\\\source\\\\nft\\\\jslib\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12490:23)\");\n\n//# sourceURL=webpack://sen/./src/chain.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addDOMContent\": () => (/* reexport safe */ _addDOMContent__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"capital\": () => (/* reexport safe */ _capital__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"init\": () => (/* reexport safe */ _chain__WEBPACK_IMPORTED_MODULE_2__.init),\n/* harmony export */   \"loadNfts\": () => (/* reexport safe */ _chain__WEBPACK_IMPORTED_MODULE_2__.loadNfts)\n/* harmony export */ });\n/* harmony import */ var _capital__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capital */ \"./src/capital.js\");\n/* harmony import */ var _addDOMContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addDOMContent */ \"./src/addDOMContent.js\");\n/* harmony import */ var _chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chain */ \"./src/chain.js\");\n\n\n\n\n\n//# sourceURL=webpack://sen/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});