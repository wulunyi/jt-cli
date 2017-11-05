'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPage = createPage;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpReplace = require('gulp-replace');

var _gulpReplace2 = _interopRequireDefault(_gulpReplace);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _log = require('./log');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwdPath = process.cwd();
var curPath = __dirname;

function createPage(pageName) {
  var filePath = _path2.default.resolve(cwdPath, 'src/pages/' + pageName);

  if ((0, _util.isFileExit)(filePath)) {
    (0, _log.log)(filePath);
    return (0, _log.warn)('\u9875\u9762\u540D ' + pageName + ' \u5DF2\u7ECF\u88AB\u5360\u7528\uFF0C\u8BF7\u66F4\u6362');
  }

  try {
    (0, _log.log)('正在拷贝 wpy 文件');

    _gulp2.default.src(_path2.default.resolve(curPath, '../template/page/tp.wpy')).pipe((0, _gulpReplace2.default)('TpPage', (0, _util.camelName)(pageName))).pipe((0, _gulpReplace2.default)('<fileName>', pageName)).pipe((0, _gulpRename2.default)({
      basename: pageName,
      extname: '.wpy'
    })).pipe(_gulp2.default.dest(filePath));

    (0, _log.log)('正在拷贝 scss 文件');

    _gulp2.default.src(_path2.default.resolve(curPath, '../template/page/tp.scss')).pipe((0, _gulpRename2.default)({
      basename: pageName,
      extname: '.scss'
    })).pipe(_gulp2.default.dest(filePath));

    (0, _log.log)('正在拷贝 data 文件');

    _gulp2.default.src(_path2.default.resolve(curPath, '../template/page/data.js')).pipe(_gulp2.default.dest(filePath));

    // 是否存在深拷贝函数
    var exitDC = (0, _util.isFileExit)(_path2.default.resolve(cwdPath, './src/utils/deep-clone.js'));
    // 是否存在基础扩展
    var exitBM = (0, _util.isFileExit)(_path2.default.resolve(cwdPath, './src/mixins/page-base-mixin.js'));
    // 是否存在图片
    var exitWarmPng = (0, _util.isFileExit)(_path2.default.resolve(cwdPath, './src/images/warm-icon.png'));

    if (!exitDC) {
      (0, _log.log)('正在拷贝依赖文件');
      _gulp2.default.src(_path2.default.resolve(curPath, '../template/utils/deep-clone.js')).pipe(_gulp2.default.dest(_path2.default.resolve(cwdPath, './src/utils')));
    }

    if (!exitBM) {
      (0, _log.log)('正在拷贝依赖文件');
      _gulp2.default.src(_path2.default.resolve(curPath, '../template/mixins/page-base-mixin.js')).pipe(_gulp2.default.dest(_path2.default.resolve(cwdPath, './src/mixins')));
    }

    if (!exitWarmPng) {
      (0, _log.log)('正在拷贝依赖文件');
      _gulp2.default.src(_path2.default.resolve(curPath, '../template/images/warm-icon.png')).pipe(_gulp2.default.dest(_path2.default.resolve(cwdPath, './src/images')));
    }

    (0, _log.log)('创建完成');
    (0, _log.log)('pages/' + pageName + '/' + pageName);
  } catch (error) {
    (0, _log.warn)('创建失败');
    (0, _log.warn)(error);
  }
}
//# sourceMappingURL=jt-page.js.map