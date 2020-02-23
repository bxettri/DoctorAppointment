const Appointment = require('../.././models/appointment');
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

describe('Appointment Schema Test', () => {
    it('should be able to add query in appointmnet', async () => {
        let appointment = await Appointment.create({ 'Query': "My head is paining" });
        expect(appointment.Query).toMatch("My head is paining");
    })

    it("should delete the appointment query", async () => {
        let appointment = await Appointment.findOneAndDelete({
            'Query': "My head is paining"
        });
        expect(appointment.Query).toMatch('My head is paining');
    })


})