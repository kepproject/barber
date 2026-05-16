const prisma = require('../config/prisma')

const createSubscription = async phone => {
  return prisma.subscription.create({
    data: {
      phone,
    },
  })
}

module.exports = {
  createSubscription,
}