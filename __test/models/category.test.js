const Speciality = require('../.././models/speciality');
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

describe('Category Schema Test', () => {
    it('should be able to add new category', async () => {
        let speciality = await Speciality.create({ 'categoryName': "Intestine"});
        expect(speciality.categoryName).toMatch("Intestine");
    })


    it("should delete the category", async () => {
        let speciality = await Speciality.findOneAndDelete({
            'categoryName': 'Intestine'
        });
        expect(speciality.categoryName).toMatch('Intestine');
    })
})