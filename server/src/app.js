const express = require('express')
const cors = require('cors')

const serviceRoutes = require('./routes/serviceRoutes')
const barberRoutes = require('./routes/barberRoutes')
const contactRoutes = require('./routes/contactRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is working' })
})

app.use('/api/services', serviceRoutes)
app.use('/api/barbers', barberRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

module.exports = app