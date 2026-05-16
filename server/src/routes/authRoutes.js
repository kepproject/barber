const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login', authController.login)

router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.admin,
  })
})

module.exports = router