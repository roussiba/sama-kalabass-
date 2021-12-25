const express = require('express');
require('dotenv/config');

// Variable
const app = express();

// Database
const connectDB = require('./db/connect');

//Import Routes
const authRoutes = require('./route/user/authRoute');

app.use(express.json());

//Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//Middlwares
app.use('/api/v1/auth', authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//RUN
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.DB_CONNECTION);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();