import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb.js';

dotenv.config();
// calling database here
connectDb();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});