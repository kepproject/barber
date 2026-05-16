const prisma = require('../config/prisma')

const timeToMinutes = time => {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}

const minutesToTime = minutes => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

const getDayOfWeek = date => {
  const day = new Date(date).getDay()

  return day === 0 ? 7 : day
}

const getAvailableSlots = async ({ serviceId, barberId, date }) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  })

  if (!service) {
    throw new Error('Service not found')
  }

  const dayOfWeek = getDayOfWeek(date)

  const schedule = await prisma.barberSchedule.findFirst({
    where: {
      barberId,
      dayOfWeek,
      isActive: true,
    },
  })

  if (!schedule) {
    return []
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      barberId,
      date: new Date(date),
      status: {
        not: 'CANCELED',
      },
    },
  })

  const start = timeToMinutes(schedule.startTime)
  const end = timeToMinutes(schedule.endTime)
  const duration = service.duration

  const slots = []

  for (let current = start; current + duration <= end; current += 15) {
    const slotStart = current
    const slotEnd = current + duration

    const isBusy = appointments.some(appointment => {
      const appointmentStart = timeToMinutes(appointment.startTime)
      const appointmentEnd = timeToMinutes(appointment.endTime)

      return slotStart < appointmentEnd && slotEnd > appointmentStart
    })

    if (!isBusy) {
      slots.push({
        startTime: minutesToTime(slotStart),
        endTime: minutesToTime(slotEnd),
      })
    }
  }

  return slots
}

const createAppointment = async data => {
  const service = await prisma.service.findUnique({
    where: {
      id: data.serviceId,
    },
  })

  if (!service) {
    throw new Error('Service not found')
  }

  const start = timeToMinutes(data.startTime)
  const endTime = minutesToTime(start + service.duration)

  const busyAppointments = await prisma.appointment.findMany({
    where: {
      barberId: data.barberId,
      date: new Date(data.date),
      status: {
        not: 'CANCELED',
      },
    },
  })

  const isBusy = busyAppointments.some(appointment => {
    const appointmentStart = timeToMinutes(appointment.startTime)
    const appointmentEnd = timeToMinutes(appointment.endTime)

    return start < appointmentEnd && start + service.duration > appointmentStart
  })

  if (isBusy) {
    throw new Error('Selected time is not available')
  }

  return prisma.appointment.create({
    data: {
      clientName: data.clientName,
      phone: data.phone,
      email: data.email || null,
      comment: data.comment || null,
      date: new Date(data.date),
      startTime: data.startTime,
      endTime,
      status: data.status || 'NEW',
      source: data.source || 'ONLINE',
      serviceId: data.serviceId,
      barberId: data.barberId,
    },
  })
}

module.exports = {
  getAvailableSlots,
  createAppointment,
}