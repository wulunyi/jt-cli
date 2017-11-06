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

// 执行命令的路径
let cwdPath = process.cwd();
// 当前 jt-cli 的路径
let curPath = __dirname;

commander.version('1.0.0')
  .command('new <action> <name>')
  .action(function (action, name) {
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

commander.parse(process.argv);

if (isFileExit(path.join(__dirname, '../test/template'))) {
  Git.Repository.open(path.join(__dirname, '../test')).then((repository) => {
    repository.fetch('https://github.com/wulunyi/jt-cli.git').then(() => {
      console.log('更新成功');
    });
  });
} else {
  Git.Clone('https://github.com/wulunyi/jt-cli.git', path.join(__dirname, '../test')).then(function(repository) {
    console.log('clone success');
  });
}
