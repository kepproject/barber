(() => {
  const bookingModal = document.getElementById('bookingModal')
  const bookingForm = document.getElementById('bookingForm')
  const thanksModal = document.getElementById('bookingThanksModal')

  if (!bookingModal || !bookingForm) return

  const serviceSelect = document.getElementById('bookingService')
  const barberSelect = document.getElementById('bookingBarber')
  const dateInput = document.getElementById('bookingDate')
  const timeSelect = document.getElementById('bookingTime')
  const today = new Date().toISOString().split('T')[0]
    dateInput.min = today

    const phoneInput = document.getElementById('bookingPhone')

    let iti = null

    if (phoneInput && window.intlTelInput) {
        iti = window.intlTelInput(phoneInput, {
            initialCountry: 'ua',
            onlyCountries: ['ua'],
            separateDialCode: true,
            nationalMode: true,
            allowDropdown: false,
            strictMode: true,
        })
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', () => {
                let value = phoneInput.value.replace(/\D/g, '')

                value = value.slice(0, 9)

                phoneInput.value = value
            })

            phoneInput.addEventListener('keypress', event => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
                }
            })

            phoneInput.addEventListener('paste', event => {
                const pasted = (event.clipboardData || window.clipboardData).getData('text')

                if (!/^\d+$/.test(pasted)) {
                event.preventDefault()
                }
            })
            }

  const servicesUrl = `${window.API_BASE_URL}/api/services`
  const barbersUrl = serviceId => `${window.API_BASE_URL}/api/barbers/service/${serviceId}`
  const slotsUrl = ({ serviceId, barberId, date }) =>
    `${window.API_BASE_URL}/api/appointments/available-slots?serviceId=${serviceId}&barberId=${barberId}&date=${date}`
  const appointmentsUrl = `${window.API_BASE_URL}/api/appointments`

  let servicesLoaded = false

  const resetSelect = (select, text) => {
    select.innerHTML = `<option value="">${text}</option>`
  }

  const destroyBookingNiceSelect = () => {
    if (typeof $ === 'undefined') return

    $('#bookingService, #bookingBarber, #bookingTime').each(function () {
      const select = $(this)

      select.next('.nice-select').remove()
      select.css('display', 'block')
      select.show()
    })
  }

  const openModal = () => {
    bookingModal.classList.add('is-open')
    bookingModal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('bro-modal-open')
    destroyBookingNiceSelect()
  }

  const closeModal = () => {
    bookingModal.classList.remove('is-open')
    bookingModal.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('bro-modal-open')
  }

  const openThanksModal = () => {
    if (!thanksModal) return

    thanksModal.classList.add('is-open')
    thanksModal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('bro-modal-open')
  }

  const closeThanksModal = () => {
    if (!thanksModal) return

    thanksModal.classList.remove('is-open')
    thanksModal.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('bro-modal-open')
  }

  const loadServices = async () => {
    if (servicesLoaded) return

    const response = await fetch(servicesUrl)
    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load services')
    }

    resetSelect(serviceSelect, 'Оберіть послугу')

    result.data.forEach(service => {
      const option = document.createElement('option')
      option.value = service.id
      option.textContent = `${service.title} – ${service.price} грн`
      serviceSelect.appendChild(option)
    })

    servicesLoaded = true
    destroyBookingNiceSelect()
  }

  const loadBarbers = async serviceId => {
    barberSelect.disabled = true
    dateInput.disabled = true
    timeSelect.disabled = true

    resetSelect(barberSelect, 'Завантаження майстрів...')
    resetSelect(timeSelect, 'Оберіть дату')
    destroyBookingNiceSelect()

    const response = await fetch(barbersUrl(serviceId))
    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load barbers')
    }

    resetSelect(barberSelect, 'Оберіть барбера')

    result.data.forEach(barber => {
      const option = document.createElement('option')
      option.value = barber.id
      option.textContent = barber.name
      barberSelect.appendChild(option)
    })

    barberSelect.disabled = false
    destroyBookingNiceSelect()
  }

  const loadSlots = async () => {
    const serviceId = serviceSelect.value
    const barberId = barberSelect.value
    const date = dateInput.value

    if (!serviceId || !barberId || !date) return

    timeSelect.disabled = true
    resetSelect(timeSelect, 'Завантаження часу...')
    destroyBookingNiceSelect()

    const response = await fetch(slotsUrl({ serviceId, barberId, date }))
    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load slots')
    }

    resetSelect(timeSelect, 'Оберіть час')

    if (!result.data.length) {
      resetSelect(timeSelect, 'Немає доступного часу')
      timeSelect.disabled = true
      destroyBookingNiceSelect()
      return
    }

    result.data.forEach(slot => {
      const option = document.createElement('option')
      option.value = slot.startTime
      option.textContent = slot.startTime
      timeSelect.appendChild(option)
    })

    timeSelect.disabled = false
    destroyBookingNiceSelect()
  }

  document.addEventListener('click', async event => {
    const openButton = event.target.closest('.js-booking-open')

    if (!openButton) return

    event.preventDefault()

    try {
      await loadServices()

      bookingForm.reset()

      resetSelect(barberSelect, 'Спочатку оберіть послугу')
      resetSelect(timeSelect, 'Оберіть дату')

      barberSelect.disabled = true
      dateInput.disabled = true
      timeSelect.disabled = true

      const serviceId = openButton.dataset.serviceId

      if (serviceId) {
        serviceSelect.value = serviceId
        await loadBarbers(serviceId)
      }

      openModal()
      destroyBookingNiceSelect()
    } catch (error) {
      console.error('Booking open error:', error)
      alert('Не вдалося відкрити форму запису.')
    }
  })

  document.addEventListener('click', event => {
    const closeButton = event.target.closest('.js-booking-close')

    if (!closeButton) return

    closeModal()
  })

  document.addEventListener('click', event => {
    const closeButton = event.target.closest('.js-booking-thanks-close')

    if (!closeButton) return

    closeThanksModal()
  })

  serviceSelect.addEventListener('change', async () => {
    const serviceId = serviceSelect.value

    resetSelect(barberSelect, 'Спочатку оберіть послугу')
    resetSelect(timeSelect, 'Оберіть дату')

    barberSelect.disabled = true
    dateInput.disabled = true
    timeSelect.disabled = true
    destroyBookingNiceSelect()

    if (!serviceId) return

    await loadBarbers(serviceId)
  })

  barberSelect.addEventListener('change', () => {
    dateInput.disabled = !barberSelect.value
    timeSelect.disabled = true
    resetSelect(timeSelect, 'Оберіть дату')
    destroyBookingNiceSelect()
  })

  dateInput.addEventListener('change', loadSlots)

  bookingForm.addEventListener('submit', async event => {
    event.preventDefault()

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity()
      return
    }

    const formData = new FormData(bookingForm)

    const rawPhone = phoneInput ? phoneInput.value.replace(/\D/g, '') : ''

    const payload = {
    serviceId: Number(formData.get('serviceId')),
    barberId: Number(formData.get('barberId')),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    clientName: formData.get('clientName').trim(),
    phone: rawPhone ? `+380${rawPhone}` : '',
    email: formData.get('email') ? formData.get('email').trim() : '',
    comment: formData.get('comment') ? formData.get('comment').trim() : '',
    }

    try {
      const response = await fetch(appointmentsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to create appointment')
      }

      bookingForm.reset()
      closeModal()
      openThanksModal()
    } catch (error) {
      console.error('Booking submit error:', error)
      alert('Не вдалося створити запис. Спробуйте інший час.')
    }
  })
})()