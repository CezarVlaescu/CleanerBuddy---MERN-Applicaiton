// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const {
  listCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers//companiesController');

router.get('/', listCompanies);
router.get('/:id', getCompany);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;
