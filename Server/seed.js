const getConnection = require('./config/config.json');
const mongo_URI = getConnection.Mongo_URI;

const data = require('./json/datas.json');

const mongoose = require('mongoose');

const Company = require('./models/companyModel');
const City = require('./models/cityModel');

const seedDB = async () => {
    try{
        await mongoose.connect(mongo_URI);

        console.log('Succesfully connected')

        await Company.deleteMany({});
        await City.deleteMany({}); // clear database if there are any records

        const uniqueCities = [...new Set(data.map(item => item.city))] // extract unique cities from json data

        const cityDocs = await City.insertMany(uniqueCities.map(city => ({name: city}))) // seed cities
        console.log('Cities successfully inserted');

        const cityIdMap = cityDocs.reduce((acc, doc) => { // map for city names to their corresponding _id
            acc[doc.name] = doc._id;
            return acc;
        }, {});

        const companyPromises = data.map(company => { // seed companies
            return Company.create({
                ...company,
                city: cityIdMap[company.city]
            });
        });

        await Promise.all(companyPromises);

        console.log('Companies succesfully inserted')
    }
    catch(err){
        console.error('Error seending data in database: ', err)
    }
    finally{
        mongoose.connection.close();
    }
}

seedDB();