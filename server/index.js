const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const markdown = require('./markdown.js');

const app = express();

let env = process.env.NODE_ENV || 'development';

// if (env === 'development') {
//   app.use(cors());
// } else {
//   let corsOptions = {
//     origin: 'https://client-gmhtsvfjha-uc.a.run.app',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   };

//   app.use(cors(corsOptions));
// }

// console.log(markdown.getFiles());

app.get('/', async (req, res) => {
  try {
    // let fileDir = await markdown.getFileList();
    // console.log('fileDir:', fileDir);

    let debugResult = await debug();

    console.log(debugResult);

    res.status(200).send('hello world');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.get('/directory', async (req, res) => {
  try {
    let path = 'articles';
    let fileAttributes = await markdown.getFileAttributes(path);
    console.log(fileAttributes);
    res.status(200).send(fileAttributes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(8080, err => {
  console.log('Listening on port 8080');
});

async function debug() {
  //   return await markdown.getFileList();
  let path = 'articles';
  return await markdown.getFileMeta(path);
}

// console.log(await debug());
