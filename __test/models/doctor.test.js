const Doctor = require('../.././models/doctor');
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

describe('Doctor Schema Test', () => {
    it('should be able to add new patient', async () => {
        let doctor = await Doctor.create({ 'username': "Bibek123", 'password':"Bibek123" });
        expect(doctor.username).toMatch("Bibek123");
    })

    it('should be able to update patient', async () => {
        let doctor = await Doctor.findOne({
            'username': 'Bibek123'
        });
        doctor.username = 'Bibek123123';

        let newDoctor = await doctor.save();
        expect(newDoctor.username).toBe('Bibek123123');
    })

    it("should delete the doctor", async () => {
        let doctor = await Doctor.findOneAndDelete({
            'username': 'Bibek123123'
        });
        expect(doctor.username).toMatch('Bibek123123');
    })
})