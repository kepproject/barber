const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

const loginAdmin = async ({ email, password }) => {
  const admin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  })

  if (!admin) {
    throw new Error('Invalid credentials')
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    {
      adminId: admin.id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
  }
}

module.exports = {
  loginAdmin,
}