import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import mkdirp from 'mkdirp';
import {
  log,
  warn
} from './log';
import Case from 'case';
import {
  exec
} from 'child_process';
import cache from './cache';

export function isFileExit(filePath) {
  if (_.isString(filePath)) {
    return fs.existsSync(filePath);
  } else {
    return false;
  }
}

export function camelName(name) {
  return Case.pascal(name);
}

export function mkdir(name) {
  let rst = true;

  try {
    fs.mkdirSync(name);
  } catch (e) {
    rst = e;
  }

  return rst;
}

export function isFile(p) {
  p = (typeof (p) === 'object') ? path.join(p.dir, p.base) : p;

  if (!fs.existsSync(p)) {
    return false;
  }

  return fs.statSync(p).isFile();
}

export function isDir(p) {
  if (!fs.existsSync(p)) {
    return false;
  }

  return fs.statSync(p).isDirectory();
}

export function readFile(p) {
  let rst = '';

  p = (typeof (p) === 'object') ? path.join(p.dir, p.base) : p;

  try {
    rst = fs.readFileSync(p, 'utf-8');
  } catch (e) {
    rst = null;
  }

  return rst;
}

export function writeFile(p, data) {
  let opath = (_.isString(p) ? path.parse(p) : p);

  if (!isDir(opath.dir)) {
    mkdirp.sync(opath.dir);
  }

  fs.writeFileSync(p, data);
}

export function getFiles(dir = process.cwd(), prefix = '') {
  let cfiles = cache.getFileList(dir);

  if (cfiles)
    return cfiles;

  dir = path.normalize(dir);

  if (!fs.existsSync(dir)) {
    return [];
  }

  let files = fs.readdirSync(dir);
  let rst = [];

  files.forEach((item) => {
    let filepath = dir + path.sep + item;
    let stat = fs.statSync(filepath);

    if (stat.isFile()) {
      rst.push(prefix + item);
    } else if (stat.isDirectory()) {
      rst = rst.concat(getFiles(path.normalize(dir + path.sep + item), path.normalize(prefix + item + path.sep)));
    }
  });

  cache.setFileList(dir, rst);
  return rst;
}

export function execCmd(cmd, quite) {
  return new Promise((resolve, reject) => {
    let fcmd = exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout, stderr);
      }
    });
    fcmd.stdout.on('data', (chunk) => {
      !quite && process.stdout.write(chunk);
    });
    fcmd.stderr.on('data', (chunk) => {
      !quite && process.stdout.write(chunk);
    });
  });
}

export function getModifiedTime(p) {
  return isFile(p) ? +fs.statSync(p).mtime : false;
}

export function unlink(p) {
  let rst = '';
  p = (typeof (p) === 'object') ? path.join(p.dir, p.base) : p;
  try {
    rst = fs.unlinkSync(p);
  } catch (e) {
    rst = null;
  }
  return rst;
}