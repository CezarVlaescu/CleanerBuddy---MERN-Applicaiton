const express = require('express');
const router = express.Router();

const {
    listCities,
    getCity,
    createCity,
    updateCity,
    deleteCity
} = require('../controllers/citiesController');

router.get('/', listCities);
router.get('/:id', getCity);
router.post('/', createCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

module.exports = router;