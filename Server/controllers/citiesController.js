const CityModel = require('../models/cityModel');

const listCities = async (req, res, next) => {
    try{
        const cities = await CityModel.find({}); // find all the cities (we have just city names here)
        res.json(cities); // return as JSON
    }
    catch(err){
        next(err);
    };
}

const getCity = async (req, res, next) => {
    try{
        const city = await CityModel.findById(req.params.id); // find the city by id
        if(!city) return res.status(404).json({ message : 'City not found' }); // if we don't find the city we return a message ( we have 404 error)

        res.json(city); // return as JSON
    }
    catch(err){
        next(err);
    }
}

const createCity = async (req, res, next) => {
    try{
        const newCity = new CityModel(req.body);
        const savedCity = await newCity.save();
        res.status(201).json(savedCity);
    } catch (err){
        next(err);
    }
}

const updateCity = async (req, res, next) => {
    try{
        const updateCity = await CityModel.findByIdAndUpdate(req.params.id);
        res.json(updateCity);
    }
    catch{
        next(err);
    }
}

const deleteCity = async (req, res, next) => {
    try{
        await CityModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully"})
    }
    catch(err){
        next(err);
    }
}


module.exports = { 
    listCities,
    getCity,
    createCity,
    updateCity,
    deleteCity
};