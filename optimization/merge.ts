import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import utils from './utils';

interface AllJsonType {
  [prop: string]: {
    [prop: string]: any;
  };
};

const sampleJs = fs.readFileSync(path.join(__dirname, 'no-need-sample.js'), 'utf-8').trim();

export function mergeAllJs(dirPath: string, bundles: string[] = ['internal', 'main', 'resources']) {
  let allJs = 'window.allJsDone=function(){\n';
  bundles.forEach(bundle => {
    const bundlePath = path.join(dirPath, bundle);
    const allFiles = utils.listAllFile(bundlePath, /\.js$/);
    allFiles.forEach(file => {
      const content = fs.readFileSync(path.join(bundlePath, file), 'utf-8').trim();
      if (content !== sampleJs) {
        allJs += content;
        allJs += '\n';
      } else {
        console.log(`【无需合并的js】: ${bundle}/${file}`);
      }
    });
  });
  allJs += '};';
  const allJsMd5 = crypto.createHash('md5').update(allJs).digest('hex');
  const jsFileName = `all-js.${allJsMd5}.js`;
  fs.writeFileSync(path.join(dirPath, jsFileName), allJs);
  console.log(`【js合并成功】: ${jsFileName}`);
  return jsFileName;
}

export function mergeAllJson(dirPath: string, bundles: string[] = ['internal', 'main', 'resources']) {
  const allJson: AllJsonType = {};
  bundles.forEach(bundle => {
    allJson[bundle] = {};
    const bundlePath = path.join(dirPath, bundle);
    const allFiles = utils.listAllFile(bundlePath, /\.json$/);
    allFiles.forEach(file => {
      allJson[bundle][path.basename(file)] = require(path.join(bundlePath, file));
    });
  });
  const allData = JSON.stringify(allJson);
  const allJsonMd5 = crypto.createHash('md5').update(allData).digest('hex');
  const jsonFileName = `all-json.${allJsonMd5}.js`;
  fs.writeFileSync(path.join(dirPath, jsonFileName), `window.allJSON=${allData}`);
  console.log(`【js合并成功】: ${jsonFileName}`);
  return jsonFileName;
}
