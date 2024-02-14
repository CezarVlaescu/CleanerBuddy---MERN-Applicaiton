const Company = require('../models/companyModel');
const City = require('../models/cityModel');

const listCompanies = async (req, res, next) => {
    try{
        const { city, sort } = req.query;
        let query = { };
        let sorted = { };
        
        if(city) {
            const cityDoc = await City.findOne({ name: city});
            if(cityDoc){
                query.city = cityDoc._id;
            }
        }

        if(sort){
            sorted = sort === 'rating' ? { rating : -1 } : { name : 1 };
        }

        const companies = await Company.find(query).populate('city', 'name').sort(sorted);

        return res.json(companies);
    }
    catch(err){
        next(err);
    }
}

const getCompany = async (req, res, next) => {
    try{
        const company = await Company.findById(req.params.id).populate('city', 'name');
        if(!company) return res.status(404).json({ message : 'Company not found' });
        res.json(company);
    }
    catch(err){
        next(err);
    }
}

const createCompany = async (req, res, next) => {
    try{
       const newCompany = new Company(req.body);
       const savedCompany = await newCompany.save();
       res.status(201).json(savedCompany);
    }
    catch(err){
        next(err);
    }
}

const updateCompany = async (req, res, next) => {
    try{
       const updateCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true});
       res.json(updateCompany);
    }
    catch (err){
       next(err);
    }
}

const deleteCompany = async (req, res, next) => {
    try{
        await Company.findByIdAndDelete(req.params.id);
        res.json({ message : 'Company deleted'});
    }
    catch(err){
        next(err);
    }
}



module.exports = {
    listCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}