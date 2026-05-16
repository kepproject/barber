const appointmentService = require('../services/appointmentService')

const getAvailableSlots = async (req, res) => {
  try {
    const serviceId = Number(req.query.serviceId)
    const barberId = Number(req.query.barberId)
    const date = req.query.date

    if (!serviceId || !barberId || !date) {
      return res.status(400).json({
        success: false,
        message: 'serviceId, barberId and date are required',
      })
    }

    const slots = await appointmentService.getAvailableSlots({
      serviceId,
      barberId,
      date,
    })

    res.status(200).json({
      success: true,
      data: slots,
    })
  } catch (error) {
    console.error('Error fetching available slots:', error)

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch available slots',
    })
  }
}

const createAppointment = async (req, res) => {
  try {
    const {
      clientName,
      phone,
      email,
      comment,
      serviceId,
      barberId,
      date,
      startTime,
    } = req.body

    if (!clientName || !phone || !serviceId || !barberId || !date || !startTime) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      })
    }

    const appointment = await appointmentService.createAppointment({
      clientName,
      phone,
      email,
      comment,
      serviceId: Number(serviceId),
      barberId: Number(barberId),
      date,
      startTime,
    })

    res.status(201).json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    console.error('Error creating appointment:', error)

    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create appointment',
    })
  }
}

module.exports = {
  getAvailableSlots,
  createAppointment,
}