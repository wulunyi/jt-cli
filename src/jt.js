import commander from 'commander'; // 解析命令
import {log, warn} from './log';
import {createPage} from './jt-page';
import {createCom} from './jt-com';
import createProject from './jt-project';
import _ from 'lodash';
import Git from 'nodegit';
import path from 'path';
import {
  isFileExit,
  camelName
} from './util';
import updateJtBase from './update-jt-base';
import copy from './copy';

// 执行命令的路径
let cwdPath = process.cwd();
// 当前 jt-cli 的路径
let curPath = __dirname;

commander.version('1.0.4');

commander.command('new <action> <name>').action(function (action, name) {
  if (!_.isString(action) || !_.isString(name)) {
    return warn(`command must be string`)
  };

  switch (action) {
    case 'page':
      log(`正在创建页面 ${name} ...`);

      createPage(name);
      break;
    case 'project': 
      log(`正在创建项目 ${name} ...`);

      createProject(name);
      break;
    case 'com':
      log(`正在创建组件 ${name} ...`);

      createCom(name);
      break;
    default:
      break;
  }
});

commander.command('update base').action(function () {
  // 从 git 中获取数据
  updateJtBase();
});

commander.option('-o, --out <target>', '输出地址');
commander.command('use <action> <name>').action(function (action, name) {
  let cwdPath = process.cwd();
  let curPath = __dirname;

  switch (action) {
    case 'style':
      let outPath = commander.out ? commander.out : 'src/styles/';
      
      copy(path.join(curPath, `../jt-base/src/styles/${name}.scss`), path.join(cwdPath, outPath));
      break;
  
    default:
      break;
  }
});

commander.parse(process.argv);

