const express = require('express');

const router = express.Router();

const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middlewares/TaskValidation')
const MacAddressValidation = require('../middlewares/MacAddressValidation')

router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.get('/filter/all', MacAddressValidation, TaskController.all);

module.exports = router;