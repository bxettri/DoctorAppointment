const express = require("express");
const mongoose = require("mongoose");
const morgan= require("morgan");
const patientRouter = require('./routes/patient');
const doctorRouter = require('./routes/doctor');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const specialityRouter= require('./routes/speciality');
const appointmentRouter = require('./routes/appointment');
const auth = require('./auth');
const cors = require('cors');

const app = express();
app.options('*', cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

    app.use('/doctor', doctorRouter);
    app.use('/patient', patientRouter);
    app.use('/upload', uploadRouter);
    app.use('/speciality', specialityRouter );
    app.use(auth.verifyPatient);
    app.use('/appointment', appointmentRouter);

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.statusCode = 500;
        res.json({ status: err.message });
    });  


app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});