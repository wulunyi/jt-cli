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

commander.version('1.0.4')
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

// 从 git 中获取数据
// let gitFilePath = path.join(__dirname, '../test');
// let repository;

// if (isFileExit(path.join(__dirname, '../test/template'))) {
//   // 更新
//   Git.Repository.open(gitFilePath)
//   .then((repo) => {
//     repository = repo;

//     return repository.fetchAll({
//       callbacks: {
//         credentials: function(url, userName) {
//           return Git.Cred.sshKeyFromAgent(userName);
//         },
//         certificateCheck: function() {
//           return 1;
//         }
//       }
//     });
//   })
//   .then(() => {
//     return repository.mergeBranches("master", "origin/master");
//   })
//   .done(function() {
//     console.log("Done!");
//   });
// } else {
//   // clone
//   Git.Clone('https://github.com/wulunyi/jt-cli.git', gitFilePath).then(function(repository) {
//     console.log('clone success');
//   });
// }
