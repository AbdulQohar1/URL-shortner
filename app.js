require('dotenv').config();
const express = require('express');
const nanoid = require('nanoid');
const routes = require('./routes/url');


//  coonect database
const connectDB = require('./db/connectDB');



const app = express();








const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    app.listen( port, () =>
      console.log(`Server listening on port ${port}...`)
    );
  }catch (error) {
    console.log(error)
  }
};

start();