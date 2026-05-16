const token = localStorage.getItem('adminToken')
const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}')

if (!token) {
  window.location.href = 'login.html'
}

const checkAdminAuth = async () => {
  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error('Unauthorized')
    }
  } catch (error) {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = 'login.html'
  }
}

checkAdminAuth()

const loadDashboardStats = async () => {
  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load dashboard stats')
    }

    document.getElementById('newAppointmentsCount').textContent =
      result.data.newAppointmentsCount

    document.getElementById('contactMessagesCount').textContent =
      result.data.contactMessagesCount

    document.getElementById('servicesCount').textContent =
      result.data.servicesCount

    document.getElementById('barbersCount').textContent =
      result.data.barbersCount

    document.getElementById('subscriptionsCount').textContent =
      result.data.subscriptionsCount
  } catch (error) {
    console.error('Dashboard stats error:', error)
  }
}

loadDashboardStats()

const appointmentsTableBody = document.getElementById('appointmentsTableBody')

const appointmentSearch = document.getElementById('appointmentSearch')
const appointmentStatusFilter = document.getElementById('appointmentStatusFilter')
const appointmentSourceFilter = document.getElementById('appointmentSourceFilter')
const appointmentDateFilter = document.getElementById('appointmentDateFilter')
const appointmentSort = document.getElementById('appointmentSort')

let appointments = []

const statusLabels = {
  NEW: 'Новий',
  CONFIRMED: 'Підтверджено',
  DONE: 'Виконано',
  CANCELED: 'Скасовано',
}

const sourceLabels = {
  ONLINE: 'Онлайн',
  ADMIN: 'Адмін',
}

const formatDate = date => {
  return new Date(date).toLocaleDateString('uk-UA')
}

const getStatusClass = status => {
  const classes = {
    NEW: 'admin-status--new',
    CONFIRMED: 'admin-status--confirmed',
    DONE: 'admin-status--done',
    CANCELED: 'admin-status--canceled',
  }

  return classes[status] || 'admin-status--new'
}

const renderAppointmentActions = appointment => {
  return `
    <div class="admin-action-group">
      <button class="admin-action-btn" type="button" data-appointment-status="CONFIRMED" data-appointment-id="${appointment.id}">
        Підтвердити
      </button>

      <button class="admin-action-btn" type="button" data-appointment-status="DONE" data-appointment-id="${appointment.id}">
        Виконано
      </button>

      <button class="admin-action-btn" type="button" data-appointment-status="CANCELED" data-appointment-id="${appointment.id}">
        Скасувати
      </button>
    </div>
  `
}

const renderAppointments = appointments => {
  if (!appointmentsTableBody) return

  if (!appointments.length) {
    appointmentsTableBody.innerHTML = `
      <tr>
        <td colspan="9">Записів поки немає.</td>
      </tr>
    `
    return
  }

  appointmentsTableBody.innerHTML = appointments
    .map(appointment => {
      return `
        <tr>
          <td>${formatDate(appointment.date)}</td>
          <td>${appointment.startTime}–${appointment.endTime}</td>
          <td>${appointment.clientName}</td>
          <td>${appointment.phone}</td>
          <td>${appointment.service ? appointment.service.title : '-'}</td>
          <td>${appointment.barber ? appointment.barber.name : '-'}</td>
          <td>${sourceLabels[appointment.source] || appointment.source || '-'}</td>
          <td>
            <span class="admin-status ${getStatusClass(appointment.status)}">
              ${statusLabels[appointment.status] || appointment.status}
            </span>
          </td>
          <td>${renderAppointmentActions(appointment)}</td>
        </tr>
      `
    })
    .join('')
}

const loadAppointments = async () => {
  if (!appointmentsTableBody) return

  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/admin/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load appointments')
    }

    appointments = result.data
    applyAppointmentFilters()
  } catch (error) {
    console.error('Appointments loading error:', error)

    appointmentsTableBody.innerHTML = `
      <tr>
        <td colspan="9">Не вдалося завантажити записи.</td>
      </tr>
    `
  }
}

const updateAppointmentStatus = async ({ appointmentId, status }) => {
  try {
    const response = await fetch(
      `${window.ADMIN_API_BASE_URL}/api/admin/appointments/${appointmentId}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to update appointment status')
    }

    await loadAppointments()
    await loadDashboardStats()
    await loadDashboardStats()
  } catch (error) {
    console.error('Appointment status update error:', error)
    alert('Не вдалося змінити статус запису.')
  }
}

document.addEventListener('click', event => {
  const statusButton = event.target.closest('[data-appointment-status]')

  if (!statusButton) return

  const appointmentId = Number(statusButton.dataset.appointmentId)
  const status = statusButton.dataset.appointmentStatus

  updateAppointmentStatus({
    appointmentId,
    status,
  })
})

const isSameDay = (dateA, dateB) => {
  return dateA.toDateString() === dateB.toDateString()
}

const applyAppointmentFilters = () => {
  const searchValue = appointmentSearch
    ? appointmentSearch.value.trim().toLowerCase()
    : ''

  const statusValue = appointmentStatusFilter
    ? appointmentStatusFilter.value
    : 'all'

  const sourceValue = appointmentSourceFilter
    ? appointmentSourceFilter.value
    : 'all'

  const dateValue = appointmentDateFilter
    ? appointmentDateFilter.value
    : 'all'

  const sortValue = appointmentSort
    ? appointmentSort.value
    : 'newest'

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    appointmentDate.setHours(0, 0, 0, 0)

    const searchableText = [
      appointment.clientName,
      appointment.phone,
      appointment.service ? appointment.service.title : '',
      appointment.barber ? appointment.barber.name : '',
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch =
      !searchValue || searchableText.includes(searchValue)

    const matchesStatus =
      statusValue === 'all' || appointment.status === statusValue

    const matchesSource =
      sourceValue === 'all' || appointment.source === sourceValue

    let matchesDate = true

    if (dateValue === 'today') {
      matchesDate = isSameDay(appointmentDate, today)
    }

    if (dateValue === 'future') {
      matchesDate = appointmentDate > today
    }

    if (dateValue === 'past') {
      matchesDate = appointmentDate < today
    }

    return matchesSearch && matchesStatus && matchesSource && matchesDate
  })

  filteredAppointments.sort((a, b) => {
    const dateA = new Date(`${a.date.split('T')[0]}T${a.startTime}`)
    const dateB = new Date(`${b.date.split('T')[0]}T${b.startTime}`)

    return sortValue === 'oldest'
      ? dateA - dateB
      : dateB - dateA
  })

  renderAppointments(filteredAppointments)
}

;[
  appointmentSearch,
  appointmentStatusFilter,
  appointmentSourceFilter,
  appointmentDateFilter,
  appointmentSort,
].forEach(filter => {
  if (!filter) return

  filter.addEventListener('input', applyAppointmentFilters)
  filter.addEventListener('change', applyAppointmentFilters)
})

loadAppointments()

const appointmentModal = document.getElementById('appointmentModal')
const addAppointmentBtn = document.getElementById('addAppointmentBtn')
const appointmentForm = document.getElementById('adminAppointmentForm')

const appointmentServiceSelect = document.getElementById('appointmentService')
const appointmentBarberSelect = document.getElementById('appointmentBarber')
const appointmentDateInput = document.getElementById('appointmentDate')
const appointmentTimeSelect = document.getElementById('appointmentTime')

const openAppointmentModal = () => {
  appointmentModal.classList.add('is-open')
  appointmentModal.setAttribute('aria-hidden', 'false')
}

const closeAppointmentModal = () => {
  appointmentModal.classList.remove('is-open')
  appointmentModal.setAttribute('aria-hidden', 'true')
}

document.addEventListener('click', event => {
  const closeBtn = event.target.closest('.js-admin-modal-close')

  if (!closeBtn) return

  closeAppointmentModal()
})

addAppointmentBtn.addEventListener('click', async () => {
  appointmentForm.reset()

  appointmentBarberSelect.disabled = true
  appointmentDateInput.disabled = true
  appointmentTimeSelect.disabled = true

  await loadAppointmentServices()

  openAppointmentModal()
})

const resetAppointmentSelect = (select, text) => {
  select.innerHTML = `<option value="">${text}</option>`
}

const loadAppointmentServices = async () => {
  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/services`)
    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load services')
    }

    resetAppointmentSelect(
      appointmentServiceSelect,
      'Оберіть послугу'
    )

    result.data.forEach(service => {
      const option = document.createElement('option')

      option.value = service.id
      option.textContent = `${service.title} – ${service.price} грн`

      appointmentServiceSelect.appendChild(option)
    })
  } catch (error) {
    console.error(error)
  }
}

const loadAppointmentBarbers = async serviceId => {
  try {
    const response = await fetch(
      `${window.ADMIN_API_BASE_URL}/api/barbers/service/${serviceId}`
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load barbers')
    }

    resetAppointmentSelect(
      appointmentBarberSelect,
      'Оберіть барбера'
    )

    result.data.forEach(barber => {
      const option = document.createElement('option')

      option.value = barber.id
      option.textContent = barber.name

      appointmentBarberSelect.appendChild(option)
    })

    appointmentBarberSelect.disabled = false
  } catch (error) {
    console.error(error)
  }
}

const loadAppointmentSlots = async () => {
  const serviceId = appointmentServiceSelect.value
  const barberId = appointmentBarberSelect.value
  const date = appointmentDateInput.value

  if (!serviceId || !barberId || !date) return

  try {
    const response = await fetch(
      `${window.ADMIN_API_BASE_URL}/api/appointments/available-slots?serviceId=${serviceId}&barberId=${barberId}&date=${date}`
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load slots')
    }

    resetAppointmentSelect(
      appointmentTimeSelect,
      'Оберіть час'
    )

    result.data.forEach(slot => {
      const option = document.createElement('option')

      option.value = slot.startTime
      option.textContent = slot.startTime

      appointmentTimeSelect.appendChild(option)
    })

    appointmentTimeSelect.disabled = false
  } catch (error) {
    console.error(error)
  }
}

appointmentServiceSelect.addEventListener('change', async () => {
  const serviceId = appointmentServiceSelect.value

  appointmentDateInput.disabled = true
  appointmentTimeSelect.disabled = true

  resetAppointmentSelect(
    appointmentBarberSelect,
    'Оберіть барбера'
  )

  resetAppointmentSelect(
    appointmentTimeSelect,
    'Оберіть дату'
  )

  if (!serviceId) return

  await loadAppointmentBarbers(serviceId)
})

appointmentBarberSelect.addEventListener('change', () => {
  appointmentDateInput.disabled = !appointmentBarberSelect.value
})

appointmentDateInput.addEventListener('change', loadAppointmentSlots)

appointmentForm.addEventListener('submit', async event => {
  event.preventDefault()

  const formData = new FormData(appointmentForm)

  const payload = {
    serviceId: Number(formData.get('serviceId')),
    barberId: Number(formData.get('barberId')),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    clientName: formData.get('clientName').trim(),
    phone: formData.get('phone').trim(),
    comment: formData.get('comment').trim(),
  }

  try {
    const response = await fetch(
      `${window.ADMIN_API_BASE_URL}/api/admin/appointments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Failed to create appointment')
    }

    closeAppointmentModal()

    await loadDashboardStats()
  } catch (error) {
    console.error(error)
    alert('Не вдалося створити запис.')
  }
})

const today = new Date().toISOString().split('T')[0]
appointmentDateInput.min = today

const contactsTableBody = document.getElementById('contactsTableBody')
const contactSearch = document.getElementById('contactSearch')
const contactStatusFilter = document.getElementById('contactStatusFilter')

let contactMessages = []

const contactStatusLabels = {
  NEW: 'Нове',
  PROCESSED: 'Опрацьовано',
}

const getContactStatusClass = status => {
  const classes = {
    NEW: 'admin-status--new',
    PROCESSED: 'admin-status--done',
  }

  return classes[status] || 'admin-status--new'
}

const truncateText = (text, maxLength = 90) => {
  if (!text) return '-'

  return text.length > maxLength
    ? `${text.slice(0, maxLength)}...`
    : text
}

const renderContactMessages = messages => {
  if (!contactsTableBody) return

  if (!messages.length) {
    contactsTableBody.innerHTML = `
      <tr>
        <td colspan="7">Звернень поки немає.</td>
      </tr>
    `
    return
  }

  contactsTableBody.innerHTML = messages
    .map(message => {
      const isProcessed = message.status === 'PROCESSED'

      return `
        <tr>
          <td>${formatDate(message.createdAt)}</td>
          <td>${message.name}</td>
          <td>${message.phone}</td>
          <td>${message.subject}</td>
          <td>
            <div class="admin-message-preview" title="${message.message}">
              ${truncateText(message.message)}
            </div>
          </td>
          <td>
            <span class="admin-status ${getContactStatusClass(message.status)}">
              ${contactStatusLabels[message.status] || message.status}
            </span>
          </td>
          <td>
            <div class="admin-action-group">
              <button
                class="admin-action-btn"
                type="button"
                data-contact-status="PROCESSED"
                data-contact-id="${message.id}"
                ${isProcessed ? 'disabled' : ''}
              >
                Опрацьовано
              </button>
            </div>
          </td>
        </tr>
      `
    })
    .join('')
}

const applyContactFilters = () => {
  const searchValue = contactSearch
    ? contactSearch.value.trim().toLowerCase()
    : ''

  const statusValue = contactStatusFilter
    ? contactStatusFilter.value
    : 'all'

  const filteredMessages = contactMessages.filter(message => {
    const searchableText = [
      message.name,
      message.phone,
      message.subject,
      message.message,
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch =
      !searchValue || searchableText.includes(searchValue)

    const matchesStatus =
      statusValue === 'all' || message.status === statusValue

    return matchesSearch && matchesStatus
  })

  renderContactMessages(filteredMessages)
}

const loadContactMessages = async () => {
  if (!contactsTableBody) return

  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/admin/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load contact messages')
    }

    contactMessages = result.data
    applyContactFilters()
  } catch (error) {
    console.error('Contact messages loading error:', error)

    contactsTableBody.innerHTML = `
      <tr>
        <td colspan="7">Не вдалося завантажити звернення.</td>
      </tr>
    `
  }
}

const updateContactMessageStatus = async ({ contactId, status }) => {
  try {
    const response = await fetch(
      `${window.ADMIN_API_BASE_URL}/api/admin/contacts/${contactId}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to update contact message status')
    }

    await loadContactMessages()
    await loadDashboardStats()
  } catch (error) {
    console.error('Contact status update error:', error)
    alert('Не вдалося змінити статус звернення.')
  }
}

document.addEventListener('click', event => {
  const statusButton = event.target.closest('[data-contact-status]')

  if (!statusButton) return

  const contactId = Number(statusButton.dataset.contactId)
  const status = statusButton.dataset.contactStatus

  updateContactMessageStatus({
    contactId,
    status,
  })
})

;[contactSearch, contactStatusFilter].forEach(filter => {
  if (!filter) return

  filter.addEventListener('input', applyContactFilters)
  filter.addEventListener('change', applyContactFilters)
})

loadContactMessages()

const subscriptionsTableBody = document.getElementById('subscriptionsTableBody')
const subscriptionSearch = document.getElementById('subscriptionSearch')
const exportSubscriptionsCsv = document.getElementById('exportSubscriptionsCsv')

let subscriptions = []

const renderSubscriptions = items => {
  if (!subscriptionsTableBody) return

  if (!items.length) {
    subscriptionsTableBody.innerHTML = `
      <tr>
        <td colspan="3">Підписок поки немає.</td>
      </tr>
    `
    return
  }

  subscriptionsTableBody.innerHTML = items
    .map(item => {
      return `
        <tr>
          <td>${formatDate(item.createdAt)}</td>
          <td>${item.phone}</td>
          <td>
            <button
              class="admin-action-btn"
              type="button"
              data-copy-phone="${item.phone}"
            >
              Копіювати
            </button>
          </td>
        </tr>
      `
    })
    .join('')
}

const applySubscriptionFilters = () => {
  const searchValue = subscriptionSearch
    ? subscriptionSearch.value.trim().toLowerCase()
    : ''

  const filteredSubscriptions = subscriptions.filter(item => {
    return !searchValue || item.phone.toLowerCase().includes(searchValue)
  })

  renderSubscriptions(filteredSubscriptions)
}

const loadSubscriptions = async () => {
  if (!subscriptionsTableBody) return

  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/admin/subscriptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load subscriptions')
    }

    subscriptions = result.data
    applySubscriptionFilters()
  } catch (error) {
    console.error('Subscriptions loading error:', error)

    subscriptionsTableBody.innerHTML = `
      <tr>
        <td colspan="3">Не вдалося завантажити підписки.</td>
      </tr>
    `
  }
}

const exportSubscriptionsToCsv = () => {
  if (!subscriptions.length) {
    alert('Немає даних для експорту.')
    return
  }

  const rows = [
    ['Дата', 'Телефон'],
    ...subscriptions.map(item => [
      formatDate(item.createdAt),
      item.phone,
    ]),
  ]

  const csvContent = rows
    .map(row =>
      row
        .map(value => `"${String(value).replace(/"/g, '""')}"`)
        .join(',')
    )
    .join('\n')

  const blob = new Blob([`\uFEFF${csvContent}`], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'bro-barber-subscriptions.csv'
  link.click()

  URL.revokeObjectURL(url)
}

document.addEventListener('click', async event => {
  const copyButton = event.target.closest('[data-copy-phone]')

  if (!copyButton) return

  const phone = copyButton.dataset.copyPhone

  try {
    await navigator.clipboard.writeText(phone)
    copyButton.textContent = 'Скопійовано'

    setTimeout(() => {
      copyButton.textContent = 'Копіювати'
    }, 1500)
  } catch (error) {
    alert('Не вдалося скопіювати номер.')
  }
})

if (subscriptionSearch) {
  subscriptionSearch.addEventListener('input', applySubscriptionFilters)
}

if (exportSubscriptionsCsv) {
  exportSubscriptionsCsv.addEventListener('click', exportSubscriptionsToCsv)
}

loadSubscriptions()

const servicesTableBody = document.getElementById('servicesTableBody')
const serviceModal = document.getElementById('serviceModal')
const addServiceBtn = document.getElementById('addServiceBtn')
const serviceForm = document.getElementById('adminServiceForm')
const serviceModalTitle = document.getElementById('serviceModalTitle')

let adminServices = []

const openServiceModal = () => {
  document.body.classList.add('admin-modal-open')
  serviceModal.classList.add('is-open')
  serviceModal.setAttribute('aria-hidden', 'false')
}

const closeServiceModal = () => {
  document.body.classList.remove('admin-modal-open')
  serviceModal.classList.remove('is-open')
  serviceModal.setAttribute('aria-hidden', 'true')
}

const parseCommaList = value => {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
}

const parseLines = value => {
  return value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean)
}

const renderAdminServices = services => {
  if (!servicesTableBody) return

  if (!services.length) {
    servicesTableBody.innerHTML = `
      <tr>
        <td colspan="7">Послуг поки немає.</td>
      </tr>
    `
    return
  }

  servicesTableBody.innerHTML = services
    .map(service => {
      return `
        <tr>
          <td>${service.sortOrder}</td>
          <td>${service.title}</td>
          <td>${service.categories.join(', ')}</td>
          <td>${service.price} грн</td>
          <td>${service.duration} хв</td>
          <td>
            <span class="admin-status ${service.isActive ? 'admin-status--confirmed' : 'admin-status--canceled'}">
              ${service.isActive ? 'Активна' : 'Прихована'}
            </span>
          </td>
          <td>
            <div class="admin-action-group">
              <button class="admin-action-btn" type="button" data-service-edit="${service.id}">
                Редагувати
              </button>

              <button
                class="admin-action-btn"
                type="button"
                data-service-toggle="${service.id}"
                data-service-active="${service.isActive}"
              >
                ${service.isActive ? 'Приховати' : 'Активувати'}
              </button>
            </div>
          </td>
        </tr>
      `
    })
    .join('')
}

const loadAdminServices = async () => {
  if (!servicesTableBody) return

  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/admin/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load services')
    }

    adminServices = result.data
    renderAdminServices(adminServices)
  } catch (error) {
    console.error('Admin services loading error:', error)

    servicesTableBody.innerHTML = `
      <tr>
        <td colspan="7">Не вдалося завантажити послуги.</td>
      </tr>
    `
  }
}

const fillServiceForm = service => {
  document.getElementById('serviceId').value = service ? service.id : ''
  document.getElementById('serviceTitle').value = service ? service.title : ''
  document.getElementById('serviceSlug').value = service ? service.slug : ''
  document.getElementById('serviceCategories').value = service ? service.categories.join(', ') : ''
  document.getElementById('serviceShortDesc').value = service ? service.shortDesc : ''
  document.getElementById('serviceFullDesc').value = service ? service.fullDesc : ''
  document.getElementById('serviceIncludes').value = service ? service.includes.join('\n') : ''
  document.getElementById('servicePrice').value = service ? service.price : ''
  document.getElementById('serviceDuration').value = service ? service.duration : ''
  document.getElementById('serviceBadge').value = service && service.badge ? service.badge : ''
  document.getElementById('serviceSortOrder').value = service ? service.sortOrder : 0
  document.getElementById('serviceIsActive').value = service && !service.isActive ? 'false' : 'true'
}

addServiceBtn.addEventListener('click', () => {
  serviceForm.reset()
  serviceModalTitle.textContent = 'Додати послугу'
  fillServiceForm(null)
  openServiceModal()
})

document.addEventListener('click', async event => {
  const closeBtn = event.target.closest('.js-service-modal-close')

  if (closeBtn) {
    closeServiceModal()
  }

  const editButton = event.target.closest('[data-service-edit]')

  if (editButton) {
    const serviceId = Number(editButton.dataset.serviceEdit)
    const service = adminServices.find(item => item.id === serviceId)

    if (!service) return

    serviceModalTitle.textContent = 'Редагувати послугу'
    fillServiceForm(service)
    openServiceModal()
  }

  const toggleButton = event.target.closest('[data-service-toggle]')

  if (toggleButton) {
    const serviceId = Number(toggleButton.dataset.serviceToggle)
    const isActive = toggleButton.dataset.serviceActive === 'true'

    await toggleAdminServiceStatus({
      serviceId,
      isActive: !isActive,
    })
  }
})

const toggleAdminServiceStatus = async ({ serviceId, isActive }) => {
  try {
    const response = await fetch(
      `${window.ADMIN_API_BASE_URL}/api/admin/services/${serviceId}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive }),
      }
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to update service status')
    }

    await loadAdminServices()
    await loadDashboardStats()
  } catch (error) {
    console.error('Service status update error:', error)
    alert('Не вдалося змінити статус послуги.')
  }
}

serviceForm.addEventListener('submit', async event => {
  event.preventDefault()

  const formData = new FormData(serviceForm)
  const serviceId = formData.get('id')

  const payload = {
    title: formData.get('title').trim(),
    slug: formData.get('slug').trim(),
    categories: parseCommaList(formData.get('categories')),
    shortDesc: formData.get('shortDesc').trim(),
    fullDesc: formData.get('fullDesc').trim(),
    includes: parseLines(formData.get('includes')),
    price: Number(formData.get('price')),
    duration: Number(formData.get('duration')),
    badge: formData.get('badge').trim(),
    sortOrder: Number(formData.get('sortOrder')),
    isActive: formData.get('isActive') === 'true',
  }

  const url = serviceId
    ? `${window.ADMIN_API_BASE_URL}/api/admin/services/${serviceId}`
    : `${window.ADMIN_API_BASE_URL}/api/admin/services`

  const method = serviceId ? 'PUT' : 'POST'

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Failed to save service')
    }

    closeServiceModal()
    await loadAdminServices()
    await loadDashboardStats()
  } catch (error) {
    console.error('Service save error:', error)
    alert('Не вдалося зберегти послугу.')
  }
})

loadAdminServices()

const barbersTableBody = document.getElementById('barbersTableBody')
const barberModal = document.getElementById('barberModal')
const addBarberBtn = document.getElementById('addBarberBtn')
const barberForm = document.getElementById('adminBarberForm')
const barberModalTitle = document.getElementById('barberModalTitle')
const barberServicesList = document.getElementById('barberServicesList')

let adminBarbers = []

const openBarberModal = () => {
  barberModal.classList.add('is-open')
  barberModal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('admin-modal-open')
}

const closeBarberModal = () => {
  barberModal.classList.remove('is-open')
  barberModal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('admin-modal-open')
}

const getBarberImage = image => {
  return image || '../assets/img/gallery/team1.png'
}

const getBarberServiceIds = barber => {
  return barber.services
    ? barber.services.map(item => item.serviceId)
    : []
}

const getBarberServiceTitles = barber => {
  return barber.services
    ? barber.services.map(item => item.service.title).join(', ')
    : '-'
}

const renderAdminBarbers = barbers => {
  if (!barbersTableBody) return

  if (!barbers.length) {
    barbersTableBody.innerHTML = `
      <tr>
        <td colspan="7">Барберів поки немає.</td>
      </tr>
    `
    return
  }

  barbersTableBody.innerHTML = barbers
    .map(barber => {
      return `
        <tr>
          <td>${barber.sortOrder}</td>
          <td>
            <img
              class="admin-barber-photo"
              src="${getBarberImage(barber.image)}"
              alt="${barber.name}"
            >
          </td>
          <td>${barber.name}</td>
          <td>${barber.position}</td>
          <td>${getBarberServiceTitles(barber)}</td>
          <td>
            <span class="admin-status ${barber.isActive ? 'admin-status--confirmed' : 'admin-status--canceled'}">
              ${barber.isActive ? 'Активний' : 'Прихований'}
            </span>
          </td>
          <td>
            <div class="admin-action-group">
              <button class="admin-action-btn" type="button" data-barber-edit="${barber.id}">
                Редагувати
              </button>

              <button
                class="admin-action-btn"
                type="button"
                data-barber-toggle="${barber.id}"
                data-barber-active="${barber.isActive}"
              >
                ${barber.isActive ? 'Приховати' : 'Активувати'}
              </button>
            </div>
          </td>
        </tr>
      `
    })
    .join('')
}

const renderBarberServicesCheckboxes = (selectedIds = []) => {
  if (!barberServicesList) return

  barberServicesList.innerHTML = adminServices
    .map(service => {
      const isChecked = selectedIds.includes(service.id)

      return `
        <label class="admin-checkbox-item">
          <input
            type="checkbox"
            value="${service.id}"
            ${isChecked ? 'checked' : ''}
          >
          <span>${service.title}</span>
        </label>
      `
    })
    .join('')
}

const resetBarberSchedule = () => {
  document.querySelectorAll('[data-day]').forEach(checkbox => {
    const day = Number(checkbox.dataset.day)

    checkbox.checked = day >= 1 && day <= 6

    const startInput = document.querySelector(`[data-start="${day}"]`)
    const endInput = document.querySelector(`[data-end="${day}"]`)

    if (startInput) startInput.value = '10:00'
    if (endInput) endInput.value = day === 6 ? '17:00' : '19:00'
  })
}

const fillBarberSchedule = schedules => {
  resetBarberSchedule()

  if (!schedules || !schedules.length) return

  document.querySelectorAll('[data-day]').forEach(checkbox => {
    checkbox.checked = false
  })

  schedules.forEach(schedule => {
    const checkbox = document.querySelector(`[data-day="${schedule.dayOfWeek}"]`)
    const startInput = document.querySelector(`[data-start="${schedule.dayOfWeek}"]`)
    const endInput = document.querySelector(`[data-end="${schedule.dayOfWeek}"]`)

    if (checkbox) checkbox.checked = schedule.isActive
    if (startInput) startInput.value = schedule.startTime
    if (endInput) endInput.value = schedule.endTime
  })
}

const getSelectedBarberServices = () => {
  return Array.from(
    barberServicesList.querySelectorAll('input[type="checkbox"]:checked')
  ).map(input => Number(input.value))
}

const getBarberSchedulePayload = () => {
  return Array.from(document.querySelectorAll('[data-day]')).map(checkbox => {
    const dayOfWeek = Number(checkbox.dataset.day)
    const startInput = document.querySelector(`[data-start="${dayOfWeek}"]`)
    const endInput = document.querySelector(`[data-end="${dayOfWeek}"]`)

    return {
      dayOfWeek,
      startTime: startInput ? startInput.value : '10:00',
      endTime: endInput ? endInput.value : '19:00',
      isActive: checkbox.checked,
    }
  })
}

const fillBarberForm = barber => {
  document.getElementById('barberId').value = barber ? barber.id : ''
  document.getElementById('barberName').value = barber ? barber.name : ''
  document.getElementById('barberSlug').value = barber ? barber.slug : ''
  document.getElementById('barberPosition').value = barber ? barber.position : ''
  document.getElementById('barberExperience').value = barber && barber.experience ? barber.experience : ''
  document.getElementById('barberImage').value = barber && barber.image ? barber.image : ''
  document.getElementById('barberDescription').value = barber ? barber.description : ''
  document.getElementById('barberSortOrder').value = barber ? barber.sortOrder : 0
  document.getElementById('barberIsActive').value = barber && !barber.isActive ? 'false' : 'true'

  renderBarberServicesCheckboxes(barber ? getBarberServiceIds(barber) : [])
  fillBarberSchedule(barber ? barber.schedules : [])
}

const loadAdminBarbers = async () => {
  if (!barbersTableBody) return

  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/admin/barbers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load barbers')
    }

    adminBarbers = result.data
    renderAdminBarbers(adminBarbers)
  } catch (error) {
    console.error('Admin barbers loading error:', error)

    barbersTableBody.innerHTML = `
      <tr>
        <td colspan="7">Не вдалося завантажити барберів.</td>
      </tr>
    `
  }
}

const toggleAdminBarberStatus = async ({ barberId, isActive }) => {
  try {
    const response = await fetch(
      `${window.ADMIN_API_BASE_URL}/api/admin/barbers/${barberId}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive }),
      }
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to update barber status')
    }

    await loadAdminBarbers()
    await loadDashboardStats()
  } catch (error) {
    console.error('Barber status update error:', error)
    alert('Не вдалося змінити статус барбера.')
  }
}

if (addBarberBtn) {
  addBarberBtn.addEventListener('click', async () => {
    barberForm.reset()
    barberModalTitle.textContent = 'Додати барбера'

    if (!adminServices.length) {
      await loadAdminServices()
    }

    fillBarberForm(null)
    openBarberModal()
  })
}

document.addEventListener('click', async event => {
  const closeBtn = event.target.closest('.js-barber-modal-close')

  if (closeBtn) {
    closeBarberModal()
  }

  const editButton = event.target.closest('[data-barber-edit]')

  if (editButton) {
    const barberId = Number(editButton.dataset.barberEdit)
    const barber = adminBarbers.find(item => item.id === barberId)

    if (!barber) return

    if (!adminServices.length) {
      await loadAdminServices()
    }

    barberModalTitle.textContent = 'Редагувати барбера'
    fillBarberForm(barber)
    openBarberModal()
  }

  const toggleButton = event.target.closest('[data-barber-toggle]')

  if (toggleButton) {
    const barberId = Number(toggleButton.dataset.barberToggle)
    const isActive = toggleButton.dataset.barberActive === 'true'

    await toggleAdminBarberStatus({
      barberId,
      isActive: !isActive,
    })
  }
})

if (barberForm) {
  barberForm.addEventListener('submit', async event => {
    event.preventDefault()

    const formData = new FormData(barberForm)
    const barberId = formData.get('id')

    const payload = {
      name: formData.get('name').trim(),
      slug: formData.get('slug').trim(),
      position: formData.get('position').trim(),
      description: formData.get('description').trim(),
      experience: formData.get('experience').trim(),
      image: formData.get('image').trim(),
      sortOrder: Number(formData.get('sortOrder')),
      isActive: formData.get('isActive') === 'true',
      serviceIds: getSelectedBarberServices(),
      schedules: getBarberSchedulePayload(),
    }

    if (!payload.serviceIds.length) {
      alert('Оберіть хоча б одну послугу для барбера.')
      return
    }

    const url = barberId
      ? `${window.ADMIN_API_BASE_URL}/api/admin/barbers/${barberId}`
      : `${window.ADMIN_API_BASE_URL}/api/admin/barbers`

    const method = barberId ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to save barber')
      }

      closeBarberModal()

      await loadAdminBarbers()
      await loadDashboardStats()
    } catch (error) {
      console.error('Barber save error:', error)
      alert('Не вдалося зберегти барбера.')
    }
  })
}

loadAdminBarbers()

const sidebarLinks = document.querySelectorAll('.admin-nav__item')

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    const sectionName = link.dataset.section

    if (!sectionName) return

    const targetSection = document.getElementById(`${sectionName}Section`)

    if (!targetSection) return

    sidebarLinks.forEach(item => {
      item.classList.remove('active')
    })

    link.classList.add('active')

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
})

const logoutBtn = document.getElementById('adminLogout')

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = 'login.html'
  })
}