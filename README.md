添加语法校验到`.git/hooks/pre-commit`中。预期效果：每次大家`commit`之前会`eslint`，如果不成功将无法提交

> **注意：** 需要安装这个包才行；会把之前的`pre-commit`覆盖掉

## 使用

```bash
npm install @shuli/pre-commit-eslint --save-dev --registry http://registry.npm.shuli.com
```

## 如何跳过

正常情况下，你不应该跳过

```bash
git commit --no-verify
```

## 工具使用

1. 命令行`commit`（建议）
2. SourceTree 工具提交会失败，但是无法显示 eslint 消息
3. Git Desktop 提交会失败，显示的消息无颜色

## 发布

每次发布都要修改`package.json`中的版本号

```bash
# 发布
npm publish --registry http://registry.npm.shuli.com
# 取消发布某个版本 [包名@版本号]
npm unpublish @shuli/pre-commit-eslint@1.0.0 --registry http://registry.npm.shuli.com
```

## MIT License

Copyright (c) 2016 @WXiaoming

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
