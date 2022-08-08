const express = require('express');
const goodController = require("../controllers/good-controller");
const router = express.Router();

router.post('/', goodController.addGood) // C
router.get('/add/', goodController.addGoodForm) // C
router.get('/', goodController.getGoods); // R
router.get('/:id', goodController.getGood) // R
router.put('/', goodController.updateGood) // U
router.get('/update/:id', goodController.updateGoodForm) // U
router.delete('/:id', goodController.deleteGood) // D
router.get('/delete/:id', goodController.deleteGoodForm) // D

module.exports = router;