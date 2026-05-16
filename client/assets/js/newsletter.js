(() => {
  const form = document.querySelector('.subscribe_form')
  const phoneInput = document.getElementById('newsletter-phone')
  const info = form ? form.querySelector('.info') : null

  if (!form || !phoneInput) return

  let iti = null

  if (window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: 'ua',
      onlyCountries: ['ua'],
      separateDialCode: true,
      nationalMode: true,
      allowDropdown: false,
      strictMode: true,
    })
  }

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

  form.addEventListener('submit', async event => {
    event.preventDefault()

    const rawPhone = phoneInput.value.replace(/\D/g, '')

    if (rawPhone.length !== 9) {
      if (info) {
        info.textContent = 'Введіть коректний номер телефону.'
        info.classList.add('error')
      }

      return
    }

    const payload = {
      phone: `+380${rawPhone}`,
    }

    try {
      const response = await fetch(`${window.API_BASE_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Subscription failed')
      }

      form.reset()

      if (info) {
        info.textContent = ''
        info.classList.remove('error')
      }

      const thanksModal = document.getElementById('thanksModal')

      if (thanksModal) {
        thanksModal.classList.add('is-open')
        thanksModal.setAttribute('aria-hidden', 'false')
        document.body.classList.add('bro-modal-open')
      }
    } catch (error) {
      console.error('Newsletter error:', error)

      if (info) {
        info.textContent =
          error.message === 'This phone is already subscribed'
            ? 'Цей номер вже є у списку підписки.'
            : 'Не вдалося оформити підписку. Спробуйте пізніше.'

        info.classList.add('error')
      }
    }
  })
})()