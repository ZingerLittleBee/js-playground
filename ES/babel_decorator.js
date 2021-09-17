'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

// 装饰器
function classDecorator(target) {
    target.hasDecorator = true;
    return target;
}

var _require = require('sleep'),
    sleep = _require.sleep;

var Button = classDecorator(_class = (_class2 = function () {
    function Button() {
        _classCallCheck(this, Button);
    }

    _createClass(Button, [{
        key: 'onClick',
        value: function onClick() {
            console.log('button onclick event');
            sleep(1);
        }
    }]);

    return Button;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onClick', [funcExecTime], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClick'), _class2.prototype)), _class2)) || _class;

// 需使用 babel 编译: babel Decorator.js --out-file babel_decorator.js


console.log('Button 是否被装饰: ', Button.hasDecorator);

/*
descriptor {
  value: [Function: onClick],
  writable: true,
  enumerable: false,
  configurable: true
}
 */
function funcExecTime(target, name, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        console.log(name, '被装饰');
        console.time('\u65B9\u6CD5: ' + name + ', \u6267\u884C\u65F6\u95F4');
        originalMethod.apply(this, arguments);
        console.timeEnd('\u65B9\u6CD5: ' + name + ', \u6267\u884C\u65F6\u95F4');
    };
    return descriptor;
}

var btn = new Button();
btn.onClick();
