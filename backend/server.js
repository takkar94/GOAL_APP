const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorMiddleware');
const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');
const connectDB = require('./config/db');

const app = express();
connectDB();

// MongoDB Connection URL
// const mongoURL = 'mongodb://127.0.0.1:27017';

// // Create a new MongoClient
// const client = new MongoClient(mongoURL);

// // Connect to the MongoDB server
// async function run() {
//     try {
//       // Connect the client to the server
//       await client.connect();
//       // Establish and verify connection
//       await client.db("goals").command({ ping: 1 });
//       console.log("Connected successfully to MongoDB server");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
// }
  
// run().catch(console.dir);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));