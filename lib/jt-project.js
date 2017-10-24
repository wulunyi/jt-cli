'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProject;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _log = require('./log');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createProject(name) {
  debugger;
  var inPlace = !name || name === '.';

  if (inPlace) {
    name = process.cwd().split(_path2.default.sep).pop();
    (0, _log.log)('使用当前目录：' + name);
  } else {
    (0, _log.log)('目录：' + name, '创建');

    if (util.mkdir(name) !== true) {
      return (0, _log.warn)('创建目录失败。');
    }

    process.chdir(name);
  }

  var cwdPath = process.cwd();
  var curPath = __dirname;

  // 判断当前是否是一个项目
  var packagePath = _path2.default.join(cwdPath, 'package.json');

  if (util.isFile(packagePath) || util.isDir(_path2.default.join(cwdPath, 'src'))) {
    util.error('目录不为空, 请请勿重复初始化', '错误');
    return;
  }

  // 保存基础路径
  var template = _path2.default.join(curPath, '../template/project', _path2.default.sep);

  var pkg = _path2.default.join(template, 'package.json');

  pkg = util.readFile(pkg);
  pkg = JSON.parse(pkg);
  pkg.name = name;

  var dependencies = ['wepy', "lodash", "promise-polyfill", "wepy-async-function"];

  var devDependencies = ['wepy-compiler-babel', "wepy-compiler-less", "wepy-compiler-pug", "wepy-compiler-sass", "wepy-plugin-imagemin", "wepy-plugin-uglifyjs", 'babel-plugin-transform-decorators-legacy', 'babel-plugin-syntax-export-extensions', 'babel-plugin-transform-export-extensions', 'babel-plugin-transform-class-properties', 'babel-preset-env', 'cross-env'];

  var eslintDeps = ['eslint@3.18.0', 'babel-eslint@7.2.1', 'eslint-config-standard@7.1.0', 'eslint-friendly-formatter@2.0.7', 'eslint-plugin-html@2.0.1', 'eslint-plugin-promise@3.5.0', 'eslint-plugin-standard@2.0.1', 'wepy-eslint'];

  // 添加检查依赖
  devDependencies = devDependencies.concat(eslintDeps);

  util.writeFile(packagePath, JSON.stringify(pkg));
  (0, _log.log)('配置: ' + 'package.json', '写入');

  var files = util.getFiles(template).filter(function (file) {
    return file !== 'package.json';
  });

  var copyFn = function copyFn(sourcePath) {
    return function (file) {
      var target = _path2.default.join(cwdPath, file);

      var fileContent = util.readFile(_path2.default.join(sourcePath, file));

      if (file === 'wepy.config.js') {
        fileContent = fileContent.replace(/\s*eslint\: true,/ig, '');
      }

      util.writeFile(target, fileContent);
      (0, _log.log)('文件: ' + file, '拷贝');
    };
  };

  files.forEach(copyFn(template));

  var cmd = 'npm install --save ' + dependencies.join(' ');
  var cmdDev = 'npm install --save-dev ' + devDependencies.join(' ');

  (0, _log.log)('执行命令: ' + cmd, '执行');
  (0, _log.log)('执行命令: ' + cmdDev, '执行');
  (0, _log.log)('可能需要几分钟, 请耐心等待...', '信息');

  // 不能并行执行安装依赖
  util.execCmd(cmd).then(function (d) {
    return util.execCmd(cmdDev);
  }).then(function (d) {
    (0, _log.log)('安装依赖完成', '完成');

    var cmd = 'wepy build';

    (0, _log.log)('执行命令: ' + cmd, '执行');
    (0, _log.log)('可能需要几分钟, 请耐心等待...', '信息');

    util.execCmd(cmd).then(function (d) {
      (0, _log.log)('代码编译完成', '完成');
      (0, _log.log)('项目初始化完成, 可以开始使用小程序。', '完成');
    }).catch(function (e) {
      (0, _log.warn)('代码编译出错', '错误');
    });
  }).catch(function (e) {
    (0, _log.warn)('安装依赖出错', '错误');
  });
};
//# sourceMappingURL=jt-project.js.map