const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const { execSync } = require('child_process');
const fs = require('fs');


before(() => {
  fs.mkdirSync('../../../.git');
  fs.mkdirSync('../../../.git/hooks');

  execSync('node index.js');
});

describe('文件是否创建', () => {
  it('.git/hooks/pre-commit 应该存在', () => {
    const obj = fs.statSync('../../../.git/hooks/pre-commit');

    expect(obj).to.be.a('object');
  });
  it('.eslintrc 应该存在', () => {
    const obj = fs.statSync('../../../.eslintrc');

    expect(obj).to.be.a('object');
  });
});

describe('内容是否正确', () => {
  it('.git/hooks/pre-commit 文件无误', () => {
    const src = fs.readFileSync('./pre-commit').toString();
    const tar = fs.readFileSync('../../../.git/hooks/pre-commit').toString();

    expect(tar).to.equal(src);
  });
  it('.eslintrc 文件无误', () => {
    const src = fs.readFileSync('./.eslintrc').toString();
    const tar = fs.readFileSync('../../../.eslintrc').toString();

    expect(tar).to.equal(src);
  });
});

after(() => {
  fs.unlinkSync('../../../.git/hooks/pre-commit');
  fs.rmdirSync('../../../.git/hooks');
  fs.rmdirSync('../../../.git');
  fs.unlinkSync('../../../.eslintrc');
});