const express = require('express');
const http = require('http');
const cors = require('cors');
const mangoose = require('mongoose');
require("dotenv").config();
const { default: mongoose } = require('mongoose');


const authRoutes = require('./Routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT || 8081;
// console.log(process.env.PORT);
// console.log(process.env.MONGO_URL);
console.log("Starting Our Server");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoutes);

const server =http.createServer(app);

// server.listen(PORT,() => {
//     console.log(`Server is listening on ${PORT}`);
// });
// const MONGO = process.env.MONGO_URL;
const MONGO = process.env.MONGO_URL;
mongoose.connect(MONGO).then (() => {
    server.listen(PORT,() =>{
        console.log(`Server is listening on ${PORT}`);
    });
}).catch ((err) => {
    console.log("database connection fialed. Server not started");
    console.log(err);
});