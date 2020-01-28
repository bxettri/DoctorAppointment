const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');
const router = express.Router();
const auth = require('../auth');


router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        Patient.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            address: req.body.address,
            email: req.body.email,
            dob:req.body.dob,
            password: hash,
            image: req.body.image
        }).then((patient) => {
            let token = jwt.sign({ _id: patient._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    Patient.findOne({ username: req.body.username })
        .then((patient) => {
            if (patient == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, patient.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: patient._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
});

router.get('/me', auth.verifyPatient, (req, res, next) => {
    res.json({ _id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName, username: req.user.username, image: req.user.image });
});

router.put('/me', auth.verifyPatient, (req, res, next) => {
    User.findByIdAndUpdate(req.patient._id, { $set: req.body }, { new: true })
        .then((patient) => {
            res.json({ _id: patient._id, firstName: req.user.firstName, lastName: req.user.lastName, username: user.username, image: user.image });
        }).catch(next);
});

module.exports = router;