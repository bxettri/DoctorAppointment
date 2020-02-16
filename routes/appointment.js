const express= require('express');
const Speciality= require('../models/speciality');
const Doctor= require('../models/doctor');
const Patient= require('../models/patient');
const Appointment= require('../models/appointment');
const auth = require('../auth');

const router = express.Router();

router.post('/appointDoctor', (req, res, next) => {

        Appointment.create({
            DoctorId : req.body.DoctorId,
            BookedBy : req.patient._id,
            AppointmentDate: req.body.AppointmentDate,
            AppointmentTime: req.body.AppointmentTime,
            Query: req.body.Query,
        })
        .then((appointment)=>{
            res.json(appointment);
        })
        .catch(next);
});

router.get('/getAppointment', (req, res, next) =>{
    Appointment.findById({DoctorId: req.doctor._id})
    .then((appointment)=>{
        res.json(appointment);
    })
});
// router.get('/getDocAPpointmnet', (req, res, next) =>{
//     Appointment.findById({DoctorId: req.doctor._id})
//     .then((appointment)=>{
//         res.json(appointment);
//     })
// });

router.delete('/deleteAppointment', (req, res, next)=> {
    Appointment.findOneAndDelete({appointmentId:req.body.appointmentId})
    .then((appointment)=>{
        res.json({status:"deleted"});
    })
}); 

module.exports = router;
