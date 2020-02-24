const path = require('path');
const fs = require('fs');
const fm = require('front-matter');

async function getFileList() {
  // path to directory
  const directoryPath = path.join(__dirname, 'articles');

  let result = await readdirAsync(directoryPath);

  return result;
}

async function getFileMeta(path) {
  let filelist = await getFileList();

  let fileData = {};

  for (i = 0; i < filelist.length; i++) {
    let fileContent = await readFileAsync(`./${path}/${filelist[i]}`);

    let fileContentFrontMatter = fm(fileContent);

    fileData[`${filelist[i]}`] = fileContentFrontMatter;
  }

  return fileData;
}

async function getFiles(path) {
  let filelist = await getFileList();

  let fileData = {};

  for (i = 0; i < filelist.length; i++) {
    let fileContent = await readFileAsync(`./${path}/${filelist[i]}`);

    let fileContentFrontMatter = fm(fileContent);

    fileData[`${filelist[i]}`] = fileContentFrontMatter;
  }

  return fileData;
}

function readdirAsync(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = {
  getFileList: getFileList,
  getFileMeta: getFileMeta,
  getFiles: getFiles
};
