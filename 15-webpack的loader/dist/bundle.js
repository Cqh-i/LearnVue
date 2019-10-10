/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : null;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _info = __webpack_require__(3);

// 1.使用commonjs的模块化规范
var _require = __webpack_require__(4),
    add = _require.add,
    mul = _require.mul;

console.log(add(20, 30));
console.log(mul(20, 30));

// 2.使用ES6的模块化的规范


console.log(_info.name);
console.log(_info.age);
console.log(_info.height);

// 3.依赖css文件
__webpack_require__(5);

// 4.依赖less文件
__webpack_require__(9);
document.writeln('<h2>你好啊!</h2>');

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = 'why';
var age = exports.age = 18;
var height = exports.height = 1.88;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function add(num1, num2) {
  return num1 + num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

module.exports = {
  add: add,
  mul: mul
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(6);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(1)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// Imports
var getUrl = __webpack_require__(7);
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(8));
// Module
exports.push([module.i, "body {\r\n  /* background: red; */\r\n  background: url(" + ___CSS_LOADER_URL___0___ + ")\r\n}", ""]);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, needQuotes) {
  // eslint-disable-next-line no-underscore-dangle, no-param-reassign
  url = url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(10);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(1)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// Module
exports.push([module.i, "body {\n  font-size: 50px;\n  color: orange;\n}\n", ""]);


/***/ })
/******/ ]);