const express = require('express')
const appointmentController = require('../controllers/appointmentController')

const router = express.Router()

router.get('/available-slots', appointmentController.getAvailableSlots)
router.post('/', appointmentController.createAppointment)

module.exports = router