const Patient = require('../.././models/patient');
const mongoose = require('mongoose');
const DbTest = 'mongodb://localhost:27017/testdb';

beforeAll(async () => {
    await mongoose.connect(DbTest, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
})

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
})

describe('Patient Schema Test', () => {
    it('should be able to add new patient', async () => {
        let patient = await Patient.create({ 'username': "Bibek123", 'password':"Bibek123" });
        expect(patient.username).toMatch("Bibek123");
    })

    it('should be able to update patient', async () => {
        let patient = await Patient.findOne({
            'username': 'Bibek123'
        });
        patient.username = 'Bibek123123';

        let newPatient = await patient.save();
        expect(newPatient.username).toBe('Bibek123123');
    })

    it("should delete the patient", async () => {
        let patient = await Patient.findOneAndDelete({
            'username': 'Bibek123123'
        });
        expect(patient.username).toMatch('Bibek123123');
    })
})