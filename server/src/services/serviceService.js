const prisma = require('../config/prisma')

const getAllServices = async () => {
  return prisma.service.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: 'asc',
    },
  })
}

module.exports = {
  getAllServices,
}