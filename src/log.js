import chalk from 'chalk'; // 控制颜色输出

export function log(...args) {
  console.log(chalk.green(args.join(';')));
}

export function warn(...args) {
  console.warn(chalk.red(args.join(';')));
}