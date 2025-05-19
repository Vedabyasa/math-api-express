const express = require('express');
const router = express.Router();
const mathController = require('../controllers/math');

router.post('/add', mathController.add);
router.post('/subtract', mathController.subtract);
router.post('/multiply', mathController.multiply);
router.post('/divide', mathController.divide);
router.post('/power', mathController.power);
router.post('/sqrt', mathController.sqrt);
router.post('/log', mathController.log);
router.post('/factorial', mathController.factorial);

router.post('/sin', mathController.sin);
router.post('/cos', mathController.cos);
router.post('/tan', mathController.tan);

router.post('/history', mathController.history);
router.get('/history', mathController.getHistory);

module.exports = router;