import _ from 'lodash';
import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import {
  log,
  warn
} from './log';
import {
  isFileExit,
  camelName
} from './util';

let cwdPath = process.cwd();
let curPath = __dirname;

export function createCom(name) {
  let filePath = path.resolve(cwdPath, `src/components/${name}`);

  // 是否存在
  if (isFileExit(filePath)) {
    log(filePath);

    return warn(`组件名 ${name} 已经被占用，请更换`);
  }

  try {
    log('正在拷贝 wpy 文件');

    gulp.src(path.resolve(curPath, '../template/com/tp.wpy'))
      .pipe(replace('Com', camelName(name)))
      .pipe(replace('<fileName>', name))
      .pipe(rename({
        basename: name,
        extname: '.wpy'
      }))
      .pipe(gulp.dest(filePath));

    log('正在拷贝 scss 文件');

    gulp.src(path.resolve(curPath, '../template/page/tp.scss'))
      .pipe(rename({
        basename: name,
        extname: '.scss'
      }))
      .pipe(gulp.dest(filePath));

    log('创建完成');
  } catch (error) {
    warn('创建失败');
    warn(error);
  }
}