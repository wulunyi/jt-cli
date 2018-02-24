import Git from 'nodegit';
import path from 'path';
import {isFileExit, camelName} from './util';

export default function update(params) {
  // 从 git 中获取数据
  let gitFilePath = path.join(__dirname, '../jt-base');
  let repository;

  if (isFileExit(path.join(__dirname, '../jt-base/src'))) {
    // 更新
    Git.Repository.open(gitFilePath)
      .then((repo) => {
        repository = repo;

        return repository.fetchAll({
          callbacks: {
            credentials: function(url, userName) {
              return Git.Cred.sshKeyFromAgent(userName);
            },
            certificateCheck: function() {
              return 1;
            }
          }
        });
      })
      .then(() => {
        return repository.mergeBranches("master", "origin/master");
      })
      .done(function() {
        console.log("Done!");
      });
  } else {
    // clone
    Git.Clone('https://github.com/wulunyi/jt-base.git', gitFilePath).then(function(repository) {
      console.log('clone success');
    });
  }
}