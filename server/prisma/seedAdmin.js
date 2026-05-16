const bcrypt = require('bcrypt')
const prisma = require('../src/config/prisma')

async function main() {
  const email = 'admin@brobarber.ua'
  const password = 'admin12345'

  const existingAdmin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  })

  if (existingAdmin) {
    console.log('Admin already exists')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.adminUser.create({
  data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
    },
    })

  console.log('Admin created successfully')
}

main()
  .catch(error => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })