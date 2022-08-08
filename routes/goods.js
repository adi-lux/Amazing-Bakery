const express = require('express');
const goodController = require("../controllers/good-controller");
const router = express.Router();

router.post('/', goodController.addGood) // C
router.get('/add/', goodController.addGoodForm) // C
router.get('/', goodController.getGoods); // R
router.get('/:id', goodController.getGood) // R
router.post('/update/:id', goodController.updateGood) // U
router.get('/update/:id', goodController.updateGoodForm) // U
router.post('/delete/:id', goodController.deleteGood) // D

module.exports = router;