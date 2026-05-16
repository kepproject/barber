const express = require('express')
const barberController = require('../controllers/barberController')

const router = express.Router()

router.get('/', barberController.getBarbers)
router.get('/service/:serviceId', barberController.getBarbersByService)

module.exports = router