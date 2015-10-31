require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var express = __webpack_require__(8);
	var app = express();
	
	console.log(_App2.default.MW('globals').foo);
	
	// console.log(require('/Users/jmazz/Documents/repos/express-es6/middleware/globals').foo);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _config2 = __webpack_require__(2);
	
	var _config3 = _interopRequireDefault(_config2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var path = __webpack_require__(3);
	var colors = __webpack_require__(4);
	
	var DIRS = {
	    model: './models',
	    middleware: '../middleware/',
	    library: './lib'
	};
	
	function tryRequire(moduleName, type) {
	    try {
	        return __webpack_require__(5)(path.resolve(DIRS[type], moduleName) + '.js');
	    } catch (e) {
	        console.log('Error'.red + ' requiring ' + type + ' ' + moduleName);
	        throw new Error(e);
	    }
	}
	
	exports.default = {
	    config: function config() {
	        return process.env.NODE_ENV === 'prod' ? _config3.default.prod : _config3.default.dev;
	    },
	    MW: function MW(middlewareName) {
	        // Doesn't work
	        // return tryRequire(middlewareName, 'middleware');
	        try {
	            // doesn't work
	            // return require(DIRS.middleware + middlewareName + '.js');
	
	            // works because explicit
	            return __webpack_require__(6)("./" + middlewareName + '.js');
	        } catch (e) {
	            console.log('Error'.red + ' requiring middleware ' + middlewareName);
	            throw new Error(e);
	        }
	    },
	    Model: function Model(modelName) {
	        return tryRequire(modelName, 'model');
	    },
	    Lib: function Lib(libName) {
	        return tryRequire(libName, 'library');
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict'
	/**
	 * The main configuration file.
	 * 'prod' and 'dev' must both follow this schema:
	 * {
	 *      port: Number
	 * }
	 */
	;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    prod: {
	        port: 10000 },
	    // do not change this
	    dev: {
	        port: 9001
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./App.js": 1
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 5;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./globals.js": 7
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    foo: 'hello world'
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map