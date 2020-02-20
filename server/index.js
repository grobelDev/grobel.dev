const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  app.use(cors());
} else {
  let corsOptions = {
    origin: 'https://client-gmhtsvfjha-uc.a.run.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(cors(corsOptions));
}

app.get('/', async (req, res) => {
  try {
    res.status(200).send('hello world');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(8080, err => {
  console.log('Listening on port 8080');
});
