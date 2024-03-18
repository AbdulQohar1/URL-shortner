require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require ('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const app = express();

// connectDB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');


// routers
const authRouter = require('./routes/auth');
const urlsRouter = require('./routes/urls');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// routes
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/urls', authenticateUser ,urlsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// security package
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, // limit each IP to 100 request per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());



const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Listening on port ${port}...`));

  } catch (error) {
    console.log(error)
  }
};

start();






// require('dotenv').config();
// require('express-async-errors');
// const express = require('express');
// const app = express();


// // routers
// const authRouter = require('./routes/auth');
// const urlsRouter = require('./controller/urls');

// // error handler
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

// app.use(express.json());

// // routes
// app.use('api/v1/auth' , authRouter);
// app.use('api/v1/urls' , urlsRouter);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

// const port = process.env.PORT || 3000;

// const start = async () => {
//   try {
//     app.listen( port, console.log(`Listening on port ${port}...`))
//   } catch (error) {
//     console.log(error)
//   }
// }

// start();