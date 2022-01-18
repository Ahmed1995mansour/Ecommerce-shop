const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    // replace this path with your own database path
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log(`Db Connection Err ${err}`);
  });

// MiddleWare
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(cors());

// routes middleware

fs.readdirSync('./routes').map((r) => {
  app.use('/api', require('./routes/' + r));
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('app is running');
});
