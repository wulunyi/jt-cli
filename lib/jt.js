'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _log = require('./log');

var _jtPage = require('./jt-page');

var _jtProject = require('./jt-project');

var _jtProject2 = _interopRequireDefault(_jtProject);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 解析命令
var cwdPath = process.cwd();
var curPath = __dirname;

_commander2.default.version('1.0.0').command('new <action> <name>').action(function (action, name) {
  if (!_lodash2.default.isString(action) || !_lodash2.default.isString(name)) {
    return (0, _log.warn)('command must be string');
  };

  switch (action) {
    case 'page':
      // 开始
      (0, _log.log)('\u6B63\u5728\u521B\u5EFA\u9875\u9762 ' + name + ' ...');

      (0, _jtPage.createPage)(name);
      break;
    case 'project':
      (0, _log.log)('\u6B63\u5728\u521B\u5EFA\u9879\u76EE ' + name + ' ...');

      (0, _jtProject2.default)(name);
    default:
      break;
  }
});

_commander2.default.parse(process.argv);
//# sourceMappingURL=jt.js.map