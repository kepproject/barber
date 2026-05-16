const contactService = require('../services/contactService')

const createContactMessage = async (req, res) => {
  try {
    const { name, phone, subject, message } = req.body

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const contactMessage = await contactService.createContactMessage({
      name,
      phone,
      subject,
      message,
    })

    res.status(201).json({
      success: true,
      data: contactMessage,
    })
  } catch (error) {
    console.error('Error creating contact message:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to send contact message',
    })
  }
}

module.exports = {
  createContactMessage,
}