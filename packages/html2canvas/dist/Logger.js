'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = function () {
  function Logger(enabled, id, start) {
    (0, _classCallCheck3.default)(this, Logger);

    this.enabled = typeof window !== 'undefined' && enabled;
    this.start = start || Date.now();
    this.id = id;
  }

  (0, _createClass3.default)(Logger, [{
    key: 'child',
    value: function child(id) {
      return new Logger(this.enabled, id, this.start);
    }

    // eslint-disable-next-line flowtype/no-weak-types

  }, {
    key: 'log',
    value: function log() {
      if (this.enabled && window.console && window.console.log) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
      }
    }

    // eslint-disable-next-line flowtype/no-weak-types

  }, {
    key: 'error',
    value: function error() {
      if (this.enabled && window.console && window.console.error) {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
      }
    }
  }]);
  return Logger;
}();

exports.default = Logger;