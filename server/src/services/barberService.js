const prisma = require('../config/prisma')

const getAllBarbers = async () => {
  return prisma.barber.findMany({
    where: {
      isActive: true,
    },
    include: {
      services: {
        include: {
          service: true,
        },
      },
    },
    orderBy: {
      sortOrder: 'asc',
    },
  })
}

const getBarbersByServiceId = async serviceId => {
  return prisma.barber.findMany({
    where: {
      isActive: true,
      services: {
        some: {
          serviceId,
        },
      },
    },
    orderBy: {
      sortOrder: 'asc',
    },
  })
}

module.exports = {
  getAllBarbers,
  getBarbersByServiceId,
}