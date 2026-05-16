const subscriptionService = require('../services/subscriptionService')

const createSubscription = async (req, res) => {
  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone is required',
      })
    }

    const subscription = await subscriptionService.createSubscription(phone)

    res.status(201).json({
      success: true,
      data: subscription,
    })
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'This phone is already subscribed',
      })
    }

    console.error('Error creating subscription:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to create subscription',
    })
  }
}

module.exports = {
  createSubscription,
}