const path = require('path');
const fs = require('fs');

// 文件名
const FILE_PRE_COMMIT = './pre-commit';
const FILE_ESLINT = './.eslintrc';
// 当前项目目录
const DIR_PROJECT = path.resolve(__dirname, '../../..');
// 个别情况下无 .git/hooks 目录
const DIR_HOOK = path.resolve(DIR_PROJECT, '.git/hooks');
// 生产的 .git/hooks/pre-commit 文件
const TARGET_PRE_COMMIT = path.resolve(DIR_HOOK, 'pre-commit');
// 如果没有，会生成 .eslintrc 文件
const TARGET_ESLINT = path.resolve(DIR_PROJECT, '.eslintrc');

/**
 * 读取文件的 Promise 形式
 * @param {String} target 文件名
 * @return {Promise}
 */
const readFile = target => new Promise((resolve, reject) => {
  fs.readFile(target, 'utf8', (err, data) => {
    if (err) return reject(err);
    resolve(data);
  });
});

/**
 * 写文件的 Promise 形式
 * @param {String} target 写入的文件地址
 * @param {Stream} raw 读取到的数据、字符等等
 * @param {Object} ops 写入的配置
 * @return {Promise}
 */
const writeFile = (target, raw, ops = {}) => new Promise((resolve, reject) => {
  fs.writeFile(target, raw, { mode: '0755', ...ops }, (err) => {
    if (err) return reject(err);
    resolve();
  });
});


// 个别情况下 .git/hooks 不存在，则创建之
if (fs.existsSync(DIR_HOOK) === false) fs.mkdirSync(DIR_HOOK);

// 写入 .git/pre-commit
fs.stat(TARGET_PRE_COMMIT, (err) => {
  readFile(FILE_PRE_COMMIT)
  .then(raw => writeFile(TARGET_PRE_COMMIT, raw))
  .then(() => {
    // 已存在，显示警告
    if (err) console.log('\033[33m 警告：覆盖 .git/hooks/pre-commit 成功\033[0m');
    else console.log('\033[32m 写入 .git/hooks/pre-commit 成功！\033[0m');
  })
  .catch(err => console.error('\033[31m 写入 .git/hooks/pre-commit 失败：\033[0m', err));
});

// 写入 .eslintrc
fs.stat(TARGET_ESLINT, (err) => {
  // 只有不存在时才写入
  if (err) {
    readFile(FILE_ESLINT)
      .then(raw => writeFile(TARGET_ESLINT, raw))
      .then(() => console.log('\033[32m 写入 .eslintrc 成功！ \033[0m'))
      .catch(err => console.error('\033[31m 写入 .eslintrc 失败：\033[0m', err));
  }
});
