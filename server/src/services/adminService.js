const prisma = require('../config/prisma')

const getDashboardStats = async () => {
  const [
    newAppointmentsCount,
    contactMessagesCount,
    servicesCount,
    barbersCount,
    subscriptionsCount,
  ] = await Promise.all([
    prisma.appointment.count({
      where: {
        status: 'NEW',
      },
    }),
    prisma.contactMessage.count({
      where: {
        status: 'NEW',
      },
    }),
    prisma.service.count({
      where: {
        isActive: true,
      },
    }),
    prisma.barber.count({
      where: {
        isActive: true,
      },
    }),
    prisma.subscription.count(),
  ])

  return {
    newAppointmentsCount,
    contactMessagesCount,
    servicesCount,
    barbersCount,
    subscriptionsCount,
  }
}



const getAppointments = async () => {
  return prisma.appointment.findMany({
    include: {
      service: true,
      barber: true,
    },
    orderBy: [
      {
        date: 'desc',
      },
      {
        startTime: 'desc',
      },
    ],
  })
}

const createAdminAppointment = async data => {
  const appointmentService = require('./appointmentService')

  return appointmentService.createAppointment({
    ...data,
    status: 'CONFIRMED',
    source: 'ADMIN',
  })
}

const updateAppointmentStatus = async ({ id, status }) => {
  return prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })
}

const getContactMessages = async () => {
  return prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

const updateContactMessageStatus = async ({ id, status }) => {
  return prisma.contactMessage.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })
}

const getSubscriptions = async () => {
  return prisma.subscription.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

const getAdminServices = async () => {
  return prisma.service.findMany({
    orderBy: {
      sortOrder: 'asc',
    },
  })
}

const createService = async data => {
  return prisma.service.create({
    data,
  })
}

const updateService = async ({ id, data }) => {
  return prisma.service.update({
    where: {
      id,
    },
    data,
  })
}

const toggleServiceStatus = async ({ id, isActive }) => {
  return prisma.service.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  })
}

const getAdminBarbers = async () => {
  return prisma.barber.findMany({
    include: {
      services: {
        include: {
          service: true,
        },
      },
      schedules: true,
    },
    orderBy: {
      sortOrder: 'asc',
    },
  })
}

const createBarber = async data => {
  const { serviceIds, schedules, ...barberData } = data

  return prisma.barber.create({
    data: {
      ...barberData,
      services: {
        create: serviceIds.map(serviceId => ({
          serviceId,
        })),
      },
      schedules: {
        create: schedules,
      },
    },
    include: {
      services: {
        include: {
          service: true,
        },
      },
      schedules: true,
    },
  })
}

const updateBarber = async ({ id, data }) => {
  const { serviceIds, schedules, ...barberData } = data

  await prisma.barberService.deleteMany({
    where: {
      barberId: id,
    },
  })

  await prisma.barberSchedule.deleteMany({
    where: {
      barberId: id,
    },
  })

  return prisma.barber.update({
    where: {
      id,
    },
    data: {
      ...barberData,
      services: {
        create: serviceIds.map(serviceId => ({
          serviceId,
        })),
      },
      schedules: {
        create: schedules,
      },
    },
    include: {
      services: {
        include: {
          service: true,
        },
      },
      schedules: true,
    },
  })
}

const toggleBarberStatus = async ({ id, isActive }) => {
  return prisma.barber.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  })
}


module.exports = {
  getDashboardStats,
  getAppointments,
  createAdminAppointment,
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