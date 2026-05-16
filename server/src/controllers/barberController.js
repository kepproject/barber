const barberService = require('../services/barberService')

const getBarbers = async (req, res) => {
  try {
    const barbers = await barberService.getAllBarbers()

    res.status(200).json({
      success: true,
      data: barbers,
    })
  } catch (error) {
    console.error('Error fetching barbers:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch barbers',
    })
  }
}

const getBarbersByService = async (req, res) => {
  try {
    const serviceId = Number(req.params.serviceId)

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service id',
      })
    }

    const barbers = await barberService.getBarbersByServiceId(serviceId)

    res.status(200).json({
      success: true,
      data: barbers,
    })
  } catch (error) {
    console.error('Error fetching service barbers:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch service barbers',
    })
  }
}

module.exports = {
  getBarbers,
  getBarbersByService,
}