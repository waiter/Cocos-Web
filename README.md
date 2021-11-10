## Cocos Creator 开发的Web游戏加载优化

本项目仅为示例项目，使用Cocos Creator的`v2.4.6`版本，如果需要线上使用，则需要进行修改

详细说明请查看文章：https://mp.weixin.qq.com/s/VmiwVODVWYL4LX-p5iDMXA

### 使用说明

- 使用Cocos Creator v2.4.6 打开项目并打包到 web 端
- 用命令后进入项目的`optimization`目录，按照依赖(`yarn`或者`npm install`)，再执行处理(`yarn build`或者`npm run build`)，这样会在`build/web-mobile`目录下生成`index2.html`之类的文件
- 再在浏览器中打开打包后预览链接，让其访问类似`index2.html`之类的来查看效果