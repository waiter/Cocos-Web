import path from 'path';
import fs from 'fs';
import Utils from './utils';
import * as Merge from './merge';

interface StringObject {
  [prop: string]: string;
}

const templateDirPath = path.join(__dirname, 'template'); 
const webMobilePath = path.join(__dirname, '../build/web-mobile');
const webMobileSrcPath = path.join(webMobilePath, 'src');
const webMobileAssetsPath = path.join(webMobilePath, 'assets');

const needReplace: StringObject = {};
const file = Utils.findFile(webMobileSrcPath, 'settings');
needReplace.engineJs = Utils.findFile(webMobilePath, 'cocos2d-js');
needReplace.settingsJS = fs.readFileSync(path.join(webMobileSrcPath, file), 'utf-8');
needReplace.allJs = `assets/${Merge.mergeAllJs(webMobileAssetsPath)}`;
needReplace.allJSON = `assets/${Merge.mergeAllJson(webMobileAssetsPath)}`;

console.log(needReplace);
const allHtml = [];
Utils.listAllFileFullPath(templateDirPath, allHtml);
allHtml.forEach(html => {
  const name = html.split('/').pop();
  console.log(`===处理 ${name}===`);
  let tempData = fs.readFileSync(html, 'utf-8');

  Object.keys(needReplace).forEach(key => {
    const replaceValue = typeof needReplace[key] === 'string' ? needReplace[key] as string : JSON.stringify(needReplace[key]);
    tempData = tempData.replace(new RegExp(`\\{\\s*\\{\\s*${key}\\s*\\}\\s*\\}`, 'gi'), replaceValue);
  });

  fs.writeFileSync(path.join(webMobilePath, name), tempData);
  console.log(`===${name} 处理完成===`);
});
