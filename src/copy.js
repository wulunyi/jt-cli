import _ from 'lodash';
import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import {isFileExit} from './util';

export default function copy(source, target) {
  if (isFileExit(target)) {
    return console.log('文件已存在');
  }

  gulp.src(source).pipe(gulp.dest(target));
}