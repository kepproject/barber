const serviceService = require('../services/serviceService')

const getServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices()

    res.status(200).json({
      success: true,
      data: services,
    })
  } catch (error) {
    console.error('Error fetching services:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
    })
  }
}

module.exports = {
  getServices,
}