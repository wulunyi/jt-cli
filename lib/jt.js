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

// commander.version('1.0.0')
//   .command('new <action> <name>')
//   .action(function (action, name) {
//     if (!_.isString(action) || !_.isString(name)) {
//       return warn(`command must be string`)
//     };

//     switch (action) {
//       case 'page':
//         // 开始
//         log(`正在创建页面 ${name} ...`);

//         createPage(name);
//         break;
//       case 'project': 
//         log(`正在创建项目 ${name} ...`);

//         createProject(name);
//       default:
//         break;
//     }
//   });
(0, _jtProject2.default)('name');
_commander2.default.parse(process.argv);
//# sourceMappingURL=jt.js.map