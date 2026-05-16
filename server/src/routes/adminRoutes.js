const express = require('express')
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/dashboard', authMiddleware, adminController.getDashboardStats)
router.get('/appointments', authMiddleware, adminController.getAppointments)
router.post('/appointments', authMiddleware, adminController.createAppointment)
router.get('/contacts', authMiddleware, adminController.getContactMessages)
router.get('/services', authMiddleware, adminController.getAdminServices)
router.post('/services', authMiddleware, adminController.createService)
router.put('/services/:id', authMiddleware, adminController.updateService)
router.get('/barbers', authMiddleware, adminController.getAdminBarbers)
router.post('/barbers', authMiddleware, adminController.createBarber)
router.put('/barbers/:id', authMiddleware, adminController.updateBarber)

router.patch(
  '/appointments/:id/status',
  authMiddleware,
  adminController.updateAppointmentStatus
)

router.patch(
  '/contacts/:id/status',
  authMiddleware,
  adminController.updateContactMessageStatus
)

router.get(
  '/subscriptions',
  authMiddleware,
  adminController.getSubscriptions
)

router.patch(
  '/services/:id/status',
  authMiddleware,
  adminController.toggleServiceStatus
)

router.patch(
  '/barbers/:id/status',
  authMiddleware,
  adminController.toggleBarberStatus
)

module.exports = router