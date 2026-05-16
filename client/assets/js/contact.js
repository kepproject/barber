const contactForm = document.getElementById('broContactForm')
const CONTACT_API_URL = `${window.API_BASE_URL}/api/contact`

if (contactForm) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault()

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity()
      return
    }

    const formData = new FormData(contactForm)

    const payload = {
      name: formData.get('name').trim(),
      phone: formData.get('phone').trim(),
      subject: formData.get('subject').trim(),
      message: formData.get('message').trim(),
    }

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to send message')
      }

      
      contactForm.reset()
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Не вдалося надіслати звернення. Спробуйте пізніше.')
    }
  })
}