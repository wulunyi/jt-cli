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

export function createPage(pageName) {
  let filePath = path.resolve(cwdPath, `src/pages/${pageName}`);

  if (isFileExit(filePath)) {
    log(filePath);
    return warn(`页面名 ${pageName} 已经被占用，请更换`);
  }

  try {
    log('正在拷贝 wpy 文件');

    gulp.src(path.resolve(curPath, '../template/page/tp.wpy'))
      .pipe(replace('TpPage', camelName(pageName)))
      .pipe(replace('<fileName>', pageName))
      .pipe(rename({
        basename: pageName,
        extname: '.wpy'
      }))
      .pipe(gulp.dest(filePath));

    log('正在拷贝 scss 文件');

    gulp.src(path.resolve(curPath, '../template/page/tp.scss'))
      .pipe(rename({
        basename: pageName,
        extname: '.scss'
      }))
      .pipe(gulp.dest(filePath));

    log('正在拷贝 data 文件');

    gulp.src(path.resolve(curPath, '../template/page/data.js'))
      .pipe(gulp.dest(filePath));

    // 是否存在深拷贝函数
    let exitDC = isFileExit(path.resolve(cwdPath, './src/utils/deep-clone.js'));
    // 是否存在基础扩展
    let exitBM = isFileExit(path.resolve(cwdPath, './src/mixins/page-base-mixin.js'));
    // 是否存在图片
    let exitWarmPng = isFileExit(path.resolve(cwdPath, './src/images/warm-icon.png'));

    if (!exitDC) {
      log('正在拷贝依赖文件');
      gulp.src(path.resolve(curPath, '../template/utils/deep-clone.js'))
        .pipe(gulp.dest(path.resolve(cwdPath, './src/utils')));
    }

    if (!exitBM) {
      log('正在拷贝依赖文件');
      gulp.src(path.resolve(curPath, '../template/mixins/page-base-mixin.js'))
        .pipe(gulp.dest(path.resolve(cwdPath, './src/mixins')));
    }

    if (!exitWarmPng) {
      log('正在拷贝依赖文件');
      gulp.src(path.resolve(curPath, '../template/images/warm-icon.png'))
        .pipe(gulp.dest(path.resolve(cwdPath, './src/images')));
    }

    log('创建完成');
    log(`pages/${pageName}/${pageName}`)
  } catch (error) {
    warn('创建失败');
    warn(error);
  }
}