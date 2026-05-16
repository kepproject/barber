const adminService = require('../services/adminService')

const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats()

    res.status(200).json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
    })
  }
}

const getAppointments = async (req, res) => {
  try {
    const appointments = await adminService.getAppointments()

    res.status(200).json({
      success: true,
      data: appointments,
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
    })
  }
}

const createAppointment = async (req, res) => {
  try {
    const appointment = await adminService.createAdminAppointment({
      clientName: req.body.clientName,
      phone: req.body.phone,
      email: req.body.email,
      comment: req.body.comment,
      serviceId: Number(req.body.serviceId),
      barberId: Number(req.body.barberId),
      date: req.body.date,
      startTime: req.body.startTime,
    })

    res.status(201).json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    console.error('Error creating admin appointment:', error)

    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create appointment',
    })
  }
}

const updateAppointmentStatus = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { status } = req.body

    const allowedStatuses = ['NEW', 'CONFIRMED', 'DONE', 'CANCELED']

    if (!id || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment status',
      })
    }

    const appointment = await adminService.updateAppointmentStatus({
      id,
      status,
    })

    res.status(200).json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    console.error('Error updating appointment status:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status',
    })
  }
}

const getContactMessages = async (req, res) => {
  try {
    const messages = await adminService.getContactMessages()

    res.status(200).json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages',
    })
  }
}

const updateContactMessageStatus = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { status } = req.body

    const allowedStatuses = ['NEW', 'PROCESSED']

    if (!id || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact message status',
      })
    }

    const message = await adminService.updateContactMessageStatus({
      id,
      status,
    })

    res.status(200).json({
      success: true,
      data: message,
    })
  } catch (error) {
    console.error('Error updating contact message status:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update contact message status',
    })
  }
}

const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await adminService.getSubscriptions()

    res.status(200).json({
      success: true,
      data: subscriptions,
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscriptions',
    })
  }
}

const getAdminServices = async (req, res) => {
  try {
    const services = await adminService.getAdminServices()

    res.status(200).json({
      success: true,
      data: services,
    })
  } catch (error) {
    console.error('Error fetching admin services:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
    })
  }
}

const createService = async (req, res) => {
  try {
    const {
      title,
      slug,
      categories,
      shortDesc,
      fullDesc,
      includes,
      price,
      duration,
      badge,
      image,
      isActive,
      sortOrder,
    } = req.body

    if (!title || !slug || !shortDesc || !fullDesc || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      })
    }

    const service = await adminService.createService({
      title,
      slug,
      categories: Array.isArray(categories) ? categories : [],
      shortDesc,
      fullDesc,
      includes: Array.isArray(includes) ? includes : [],
      price: Number(price),
      duration: Number(duration),
      badge: badge || null,
      image: image || null,
      isActive: typeof isActive === 'boolean' ? isActive : true,
      sortOrder: Number(sortOrder) || 0,
    })

    res.status(201).json({
      success: true,
      data: service,
    })
  } catch (error) {
    console.error('Error creating service:', error)

    res.status(400).json({
      success: false,
      message: error.code === 'P2002'
        ? 'Service slug already exists'
        : 'Failed to create service',
    })
  }
}

const updateService = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const {
      title,
      slug,
      categories,
      shortDesc,
      fullDesc,
      includes,
      price,
      duration,
      badge,
      image,
      isActive,
      sortOrder,
    } = req.body

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service id',
      })
    }

    const service = await adminService.updateService({
      id,
      data: {
        title,
        slug,
        categories: Array.isArray(categories) ? categories : [],
        shortDesc,
        fullDesc,
        includes: Array.isArray(includes) ? includes : [],
        price: Number(price),
        duration: Number(duration),
        badge: badge || null,
        image: image || null,
        isActive: typeof isActive === 'boolean' ? isActive : true,
        sortOrder: Number(sortOrder) || 0,
      },
    })

    res.status(200).json({
      success: true,
      data: service,
    })
  } catch (error) {
    console.error('Error updating service:', error)

    res.status(400).json({
      success: false,
      message: error.code === 'P2002'
        ? 'Service slug already exists'
        : 'Failed to update service',
    })
  }
}

const toggleServiceStatus = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { isActive } = req.body

    if (!id || typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Invalid service status',
      })
    }

    const service = await adminService.toggleServiceStatus({
      id,
      isActive,
    })

    res.status(200).json({
      success: true,
      data: service,
    })
  } catch (error) {
    console.error('Error updating service status:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update service status',
    })
  }
}

const getAdminBarbers = async (req, res) => {
  try {
    const barbers = await adminService.getAdminBarbers()

    res.status(200).json({
      success: true,
      data: barbers,
    })
  } catch (error) {
    console.error('Error fetching admin barbers:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch barbers',
    })
  }
}

const normalizeBarberData = body => {
  return {
    name: body.name,
    slug: body.slug,
    position: body.position,
    description: body.description,
    experience: body.experience || null,
    image: body.image || null,
    isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
    sortOrder: Number(body.sortOrder) || 0,
    serviceIds: Array.isArray(body.serviceIds)
      ? body.serviceIds.map(Number)
      : [],
    schedules: Array.isArray(body.schedules)
      ? body.schedules.map(schedule => ({
          dayOfWeek: Number(schedule.dayOfWeek),
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          isActive: Boolean(schedule.isActive),
        }))
      : [],
  }
}

const createBarber = async (req, res) => {
  try {
    const data = normalizeBarberData(req.body)

    if (!data.name || !data.slug || !data.position || !data.description) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      })
    }

    const barber = await adminService.createBarber(data)

    res.status(201).json({
      success: true,
      data: barber,
    })
  } catch (error) {
    console.error('Error creating barber:', error)

    res.status(400).json({
      success: false,
      message: error.code === 'P2002'
        ? 'Barber slug already exists'
        : 'Failed to create barber',
    })
  }
}

const updateBarber = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const data = normalizeBarberData(req.body)

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid barber id',
      })
    }

    const barber = await adminService.updateBarber({
      id,
      data,
    })

    res.status(200).json({
      success: true,
      data: barber,
    })
  } catch (error) {
    console.error('Error updating barber:', error)

    res.status(400).json({
      success: false,
      message: error.code === 'P2002'
        ? 'Barber slug already exists'
        : 'Failed to update barber',
    })
  }
}

const toggleBarberStatus = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { isActive } = req.body

    if (!id || typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Invalid barber status',
      })
    }

    const barber = await adminService.toggleBarberStatus({
      id,
      isActive,
    })

    res.status(200).json({
      success: true,
      data: barber,
    })
  } catch (error) {
    console.error('Error updating barber status:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update barber status',
    })
  }
}

module.exports = {
  getDashboardStats,
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  getContactMessages,
  updateContactMessageStatus,
  getSubscriptions,
  getAdminServices,
  createService,
  updateService,
  toggleServiceStatus,
  getAdminBarbers,
  createBarber,
  updateBarber,
  toggleBarberStatus,
}