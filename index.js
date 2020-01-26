const express = require("express");
const mongoose = require("mongoose");
const morgan= require("morgan");
const patientRouter = require('./routes/patient');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const auth = require('./auth');
const cors = require('cors');

const app = express();
app.options('*', cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

    app.use('/patient', patientRouter);
    app.use('/upload', uploadRouter);
    app.use(auth.verifyPatient);
    

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.statusCode = 500;
        res.json({ status: err.message });
    });  


app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});