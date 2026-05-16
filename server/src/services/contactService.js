const prisma = require('../config/prisma')

const createContactMessage = async data => {
  return prisma.contactMessage.create({
    data: {
      name: data.name,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    },
  })
}

module.exports = {
  createContactMessage,
}