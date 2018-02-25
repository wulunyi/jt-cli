import path from 'path';
import _ from 'lodash';
import {
  log,
  warn
} from './log';
import * as util from './util';

export default function createProject(name) {
  let inPlace = !name || name === '.';

  if (inPlace) {
    name = process.cwd().split(path.sep).pop();
    log('使用当前目录：' + name);
  } else {
    log('目录：' + name, '创建');

    if (util.mkdir(name) !== true) {
      return warn('创建目录失败。');
    }

    process.chdir(name);
  }

  let cwdPath = process.cwd();
  let curPath = __dirname;

  // 判断当前是否是一个项目
  let packagePath = path.join(cwdPath, 'package.json');

  if (util.isFile(packagePath) || util.isDir(path.join(cwdPath, 'src'))) {
    util.error('目录不为空, 请请勿重复初始化', '错误');
    return;
  }

  // 保存基础路径
  let template = path.join(curPath, '../template/project', path.sep);

  let pkg = path.join(template, 'package.json');

  pkg = util.readFile(pkg);
  pkg = JSON.parse(pkg);
  pkg.name = name;

  let dependencies = [
    'wepy',
    "lodash",
    "promise-polyfill",
    "wepy-async-function"
  ];

  let devDependencies = [
    'wepy-compiler-babel',
    "wepy-compiler-less",
    "wepy-compiler-pug",
    "wepy-compiler-sass",
    "wepy-plugin-imagemin",
    "wepy-plugin-uglifyjs",
    'wepy-plugin-autoprefixer',
    'babel-plugin-transform-decorators-legacy',
    'babel-plugin-syntax-export-extensions',
    'babel-plugin-transform-export-extensions',
    'babel-plugin-transform-class-properties',
    'babel-preset-env',
    'cross-env'
  ];

  const eslintDeps = [
    'eslint@3.18.0',
    'babel-eslint@7.2.1',
    'eslint-config-standard@7.1.0',
    'eslint-friendly-formatter@2.0.7',
    'eslint-plugin-html@2.0.1',
    'eslint-plugin-promise@3.5.0',
    'eslint-plugin-standard@2.0.1',
    'wepy-eslint'
  ];

  // 添加检查依赖
  devDependencies = devDependencies.concat(eslintDeps);

  util.writeFile(packagePath, JSON.stringify(pkg));
  log('配置: ' + 'package.json', '写入');

  let files = util.getFiles(template).filter(file => file !== 'package.json');

  const copyFn = function (sourcePath) {
    return function (file) {
      let target = path.join(cwdPath, file);

      let fileContent = util.readFile(path.join(sourcePath, file));

      if (file === 'wepy.config.js') {
        fileContent = fileContent.replace(/\s*eslint\: true,/ig, '')
      }

      util.writeFile(target, fileContent);
      log('文件: ' + file, '拷贝');
    }
  }

  files.forEach(copyFn(template));

  let cmd = 'npm install --save ' + dependencies.join(' ');
  let cmdDev = 'npm install --save-dev ' + devDependencies.join(' ');

  log('执行命令: ' + cmd, '执行');
  log('执行命令: ' + cmdDev, '执行');
  log('可能需要几分钟, 请耐心等待...', '信息');

  // 不能并行执行安装依赖
  util.execCmd(cmd).then(d => {
    return util.execCmd(cmdDev)
  }).then(d => {
    log('安装依赖完成', '完成');

    let cmd = 'wepy build';

    log('执行命令: ' + cmd, '执行');
    log('可能需要几分钟, 请耐心等待...', '信息');

    util.execCmd(cmd).then(d => {
      log('代码编译完成', '完成');
      log('项目初始化完成, 可以开始使用小程序。', '完成');
    }).catch(e => {
      warn('代码编译出错', '错误');
    })
  }).catch(e => {
    warn('安装依赖出错', '错误');
  });
};