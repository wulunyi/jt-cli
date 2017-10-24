'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isFileExit = isFileExit;
exports.camelName = camelName;
exports.mkdir = mkdir;
exports.isFile = isFile;
exports.isDir = isDir;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.getFiles = getFiles;
exports.execCmd = execCmd;
exports.getModifiedTime = getModifiedTime;
exports.unlink = unlink;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _log = require('./log');

var _case = require('case');

var _case2 = _interopRequireDefault(_case);

var _child_process = require('child_process');

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFileExit(filePath) {
  if (_lodash2.default.isString(filePath)) {
    return _fs2.default.existsSync(filePath);
  } else {
    return false;
  }
}

function camelName(name) {
  return _case2.default.pascal(name);
}

function mkdir(name) {
  var rst = true;

  try {
    _fs2.default.mkdirSync(name);
  } catch (e) {
    rst = e;
  }

  return rst;
}

function isFile(p) {
  p = (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' ? _path2.default.join(p.dir, p.base) : p;

  if (!_fs2.default.existsSync(p)) {
    return false;
  }

  return _fs2.default.statSync(p).isFile();
}

function isDir(p) {
  if (!_fs2.default.existsSync(p)) {
    return false;
  }

  return _fs2.default.statSync(p).isDirectory();
}

function readFile(p) {
  var rst = '';

  p = (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' ? _path2.default.join(p.dir, p.base) : p;

  try {
    rst = _fs2.default.readFileSync(p, 'utf-8');
  } catch (e) {
    rst = null;
  }

  return rst;
}

function writeFile(p, data) {
  var opath = _lodash2.default.isString(p) ? _path2.default.parse(p) : p;

  if (!isDir(opath.dir)) {
    _mkdirp2.default.sync(opath.dir);
  }

  _fs2.default.writeFileSync(p, data);
}

function getFiles() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var cfiles = _cache2.default.getFileList(dir);

  if (cfiles) return cfiles;

  dir = _path2.default.normalize(dir);

  if (!_fs2.default.existsSync(dir)) {
    return [];
  }

  var files = _fs2.default.readdirSync(dir);
  var rst = [];

  files.forEach(function (item) {
    var filepath = dir + _path2.default.sep + item;
    var stat = _fs2.default.statSync(filepath);

    if (stat.isFile()) {
      rst.push(prefix + item);
    } else if (stat.isDirectory()) {
      rst = rst.concat(getFiles(_path2.default.normalize(dir + _path2.default.sep + item), _path2.default.normalize(prefix + item + _path2.default.sep)));
    }
  });

  _cache2.default.setFileList(dir, rst);
  return rst;
}

function execCmd(cmd, quite) {
  return new Promise(function (resolve, reject) {
    var fcmd = (0, _child_process.exec)(cmd, function (err, stdout, stderr) {
      if (err) {
        reject(err);
      } else {
        resolve(stdout, stderr);
      }
    });
    fcmd.stdout.on('data', function (chunk) {
      !quite && process.stdout.write(chunk);
    });
    fcmd.stderr.on('data', function (chunk) {
      !quite && process.stdout.write(chunk);
    });
  });
}

function getModifiedTime(p) {
  return isFile(p) ? +_fs2.default.statSync(p).mtime : false;
}

function unlink(p) {
  var rst = '';
  p = (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' ? _path2.default.join(p.dir, p.base) : p;
  try {
    rst = _fs2.default.unlinkSync(p);
  } catch (e) {
    rst = null;
  }
  return rst;
}
//# sourceMappingURL=util.js.map