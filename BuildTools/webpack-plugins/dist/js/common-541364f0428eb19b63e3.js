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
/******/ 	__webpack_require__.p = "http://imgsf.cdn/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by Administrator on 2016/6/14 0014.
 */

/**
 * DOM工具
 * @type {{$: Function, getInnerText: Function, setInnerText: Function, getNextElementSibling: Function, getFirstElementChild: Function}}
 */
/**
 * 根据字符串参数获取对象
 * @param {string} str
 * @returns {node}
 */
function $(str){
    // 如果传的是字符串
    if(typeof(str) === "string"){
        if(str[0] === "#"){          // 传的是ID
            return document.getElementById(str.substr(1));
        }else if(str[0] === "."){    // 如果是class
            return document.getElementsByClassName(str.substr(1));
        }else{                       // 标签
            return document.getElementsByTagName(str.substr(1));
        }
    }
}

var EleUtil = {
    /**
     * 获取计算后的样式
     * @param {Node} element
     * @param {String} attr
     * @returns {StyleObject}
     */
    getCalcStyle : function(element,attr) {
        if (window.getComputedStyle) {
            // 标准
            return window.getComputedStyle(element, null)[attr];
        } else {
            // IE9-
            return element.currentStyle(attr);
        }
    },
    //获取浏览器可视区域的大小
    getClient : function() {
        return {
            clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    },
    getScreen : function() {
        return {
            scrollWidth : document.body.scrollWidth || window.screen.availWidth,
            scrollHeight : document.body.scrollHeight || window.screen.availHeight
        }
    }

};

var DomOperaTools = {
    /**
     * 获dom对象的innerText的取值
     * @param {element} element
     * @returns {string}
     */
    getInnerText : function(element){
        //判断当前浏览器是否支持innerText
        if(typeof element.innerText  === "string") {
            return element.innerText;
        }else{
            return element.textContent;
        }
    },
    /**
     * 设置dom对象的innerText
     * @param {element} element
     * @param {string} content
     */
    setInnerText : function(element,content){
        if(typeof element.innerText === "string") {
            element.innerText = content;
        }else{
            element.textContent = content;
        }
    },
    /**
     * 兼容浏览器   获取下一个兄弟元素
     * @param {Node} element
     * @returns {Node}
     */
    getNextElementSibling : function(element){
        if(element.nextElementSibling){
            return element.nextElementSibling;
        }else{
            //获取下一个兄弟节点
            var node = element.nextSibling;
            //如果没有下一个节点，此时null
            while(node && node.nodeType !== 1) {
                node = node.nextSibling;
            }
            return node;
        }
    },
    /**
     * 获取第一个子元素  屏蔽浏览器的差异
     * @param {Node} element
     * @returns {Node}
     */
    getFirstElementChild : function(element){
        if(element.firstElementChild){
            return element.firstElementChild;
        }else{
            //获取第一个子节点
            var node = element.firstChild;
            while(node && node.type !== 1){
                node = element.nextSibling;
            }
            return node;
        }
    }
};

/**
 * 事件管理工具
 * @type {{addEventListener: Function}}
 */
var EventTools = {
    /**
     * 注册事件
     * @param {Element} ele
     * @param {string} type
     * @param {function} handle
     */
    addEventListener : function (ele,type,handle){
        if(ele.addEventListener){
            ele.addEventListener(type,handle,false);
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,handle);
        }else{
            ele["on" + type] = handle;
        }
    },
    /**
     * 移除事件
     * @param {element} ele
     * @param {string} type
     * @param {function} handle
     */
    removeEventListener : function(ele,type,handle){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handle);
        }else if(ele.detachEvent){
            ele.detachEvent("on" + type, handle);
        }else{
            ele["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target ? event.target : event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    getPageX: function (event) {
        if (event.pageX) {
            return event.pageX;
        }else{
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return scrollLeft + event.clientX;
        }
    },
    getPageY: function (event) {
        if (event.pageY) {
            return event.pageY;
        }else{
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            return scrollTop + event.clientY;
        }
    },
    getScroll : function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        return {
            scrollTop: scrollTop,
            scrollLeft : scrollLeft
        };
    }
};

/***/ })
/******/ ]);