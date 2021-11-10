import fs from 'fs';
import path from 'path';

const utils = {
  listAllFileFullPath: function(dirPath: string, arr: string[] = [], filter?: RegExp) {
    const files = fs.readdirSync(dirPath);
    files.forEach(name => {
      // 忽略隐藏文件/文件夹
      if (!name.startsWith('.')) {
        const curPath = path.join(dirPath, name);
        const stats = fs.statSync(curPath);
        if (stats.isFile()) {
          if (!filter || filter.test(name)) {
            arr.push(curPath);
          }
        } else if (stats.isDirectory()) {
          utils.listAllFileFullPath(curPath, arr, filter);
        }
      }
    });
  },
  listAllFile: function(dirPath: string, filter?: RegExp) {
    const arr: string[] = [];
    utils.listAllFileFullPath(dirPath, arr, filter);
    let length = dirPath.length;
    if (!dirPath.endsWith('/')) {
      length ++;
    }
    return arr.map(it => it.substr(length));
  },
  findFile: function(dirPath: string, start: string) {
    const files = fs.readdirSync(dirPath);
    return files.find(it => it.startsWith(start));
  },
};

export default utils;
