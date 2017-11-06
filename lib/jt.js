'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _log = require('./log');

var _jtPage = require('./jt-page');

var _jtCom = require('./jt-com');

var _jtProject = require('./jt-project');

var _jtProject2 = _interopRequireDefault(_jtProject);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodegit = require('nodegit');

var _nodegit2 = _interopRequireDefault(_nodegit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 执行命令的路径
// 解析命令
var cwdPath = process.cwd();
// 当前 jt-cli 的路径
var curPath = __dirname;

_commander2.default.version('1.0.0').command('new <action> <name>').action(function (action, name) {
  if (!_lodash2.default.isString(action) || !_lodash2.default.isString(name)) {
    return (0, _log.warn)('command must be string');
  };

  switch (action) {
    case 'page':
      (0, _log.log)('\u6B63\u5728\u521B\u5EFA\u9875\u9762 ' + name + ' ...');

      (0, _jtPage.createPage)(name);
      break;
    case 'project':
      (0, _log.log)('\u6B63\u5728\u521B\u5EFA\u9879\u76EE ' + name + ' ...');

      (0, _jtProject2.default)(name);
      break;
    case 'com':
      (0, _log.log)('\u6B63\u5728\u521B\u5EFA\u7EC4\u4EF6 ' + name + ' ...');

      (0, _jtCom.createCom)(name);
      break;
    default:
      break;
  }
});

_commander2.default.parse(process.argv);

_nodegit2.default.Clone('git@github.com:wulunyi/jt-cli.git').then(function (repo) {
  debuuger;
});
//# sourceMappingURL=jt.js.map