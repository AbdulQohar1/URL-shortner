require('dotenv').config();
require('express-async-errors');
const express = require('express');
// const nanoid = require('nanoid');
const app = express();


// routers
const authRouter = require('./routes/auth');
const urlRouter = require('./routes/urls');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// routes
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/urls' , urlRouter);

app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//  connect database
const connectDB = require('./db/connect');

const port = process.env.PORT || 3000;

console.log('addaaaa');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen( port, () =>
      console.log(`Server listening on port ${port}...`)
    );
  } catch (err) {
    console.log(error)
  }
};

start();