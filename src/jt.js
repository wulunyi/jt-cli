import commander from 'commander'; // 解析命令
import {log, warn} from './log';
import {createPage} from './jt-page';
import createProject from './jt-project';
import _ from 'lodash';

let cwdPath = process.cwd();
let curPath = __dirname;

commander.version('1.0.0')
  .command('new <action> <name>')
  .action(function (action, name) {
    if (!_.isString(action) || !_.isString(name)) {
      return warn(`command must be string`)
    };

    switch (action) {
      case 'page':
        // 开始
        log(`正在创建页面 ${name} ...`);

        createPage(name);
        break;
      case 'project': 
        log(`正在创建项目 ${name} ...`);

        createProject(name);
      default:
        break;
    }
  });

commander.parse(process.argv);
