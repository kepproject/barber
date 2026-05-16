const servicesList = document.getElementById('servicesList')
const filterButtons = document.querySelectorAll('.bro-service-filter__btn')

const API_URL = `${API_BASE_URL}/api/services`

let services = []

const formatPrice = price => `від ${price} грн`
const formatDuration = duration => `${duration} хв`

const renderServices = filter => {
  if (!servicesList) return

  const filteredServices =
    filter === 'all'
      ? services
      : services.filter(service => service.categories.includes(filter))

  servicesList.innerHTML = filteredServices
    .map(service => {
      const categories = service.categories.join(', ')
      const includes = service.includes.join('|')

      return `
        <div class="col-xl-4 col-lg-4 col-md-6 bro-service-item"
             data-category="${categories}"
             data-aos="fade-up">

            <div class="bro-service-card mb-30">
                ${
                  service.badge
                    ? `<div class="bro-service-card__badge">${service.badge}</div>`
                    : ''
                }

                <div class="bro-service-card__icon">
                    <i class="flaticon-healthcare-and-medical"></i>
                </div>

                <div class="bro-service-card__content">
                    <h4>${service.title}</h4>

                    <p>${service.shortDesc}</p>

                    <div class="bro-service-card__meta">
                        <span>${formatPrice(service.price)}</span>
                        <span>${formatDuration(service.duration)}</span>
                    </div>

                    <div class="bro-service-card__actions">
                        <a
                            href="#"
                            class="bro-service-card__link js-service-modal-open"
                            data-service-title="${service.title}"
                            data-service-category="${service.categories.join(', ')}"
                            data-service-price="${formatPrice(service.price)}"
                            data-service-duration="${formatDuration(service.duration)}"
                            data-service-description="${service.fullDesc}"
                            data-service-includes="${includes}"
                        >
                            Детальніше
                        </a>

                        <a href="#" class="bro-service-card__book js-booking-open" data-service-id="${service.id}">
                            Записатись
                        </a>
                    </div>
                </div>
            </div>
        </div>
      `
    })
    .join('')

  if (typeof AOS !== 'undefined') {
    AOS.refresh()
  }
}

const loadServices = async () => {
  try {
    const response = await fetch(API_URL)
    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load services')
    }

    services = result.data
    renderServices('all')
  } catch (error) {
    console.error('Services loading error:', error)

    servicesList.innerHTML = `
      <div class="col-12 text-center">
        <p>Не вдалося завантажити послуги. Спробуйте пізніше.</p>
      </div>
    `
  }
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'))
    button.classList.add('active')

    const filter = button.dataset.filter
    renderServices(filter)
  })
})

loadServices()

document.addEventListener('click', event => {
  const openButton = event.target.closest('.js-service-modal-open')

  if (!openButton) return

  event.preventDefault()

  const modal = document.getElementById('serviceModal')

  if (!modal) return

  const titleEl = document.getElementById('serviceModalTitle')
  const categoryEl = document.getElementById('serviceModalCategory')
  const priceEl = document.getElementById('serviceModalPrice')
  const durationEl = document.getElementById('serviceModalDuration')
  const descriptionEl = document.getElementById('serviceModalDescription')
  const includesEl = document.getElementById('serviceModalIncludes')

  titleEl.textContent = openButton.dataset.serviceTitle || ''
  categoryEl.textContent = openButton.dataset.serviceCategory || ''
  priceEl.textContent = openButton.dataset.servicePrice || ''
  durationEl.textContent = openButton.dataset.serviceDuration || ''
  descriptionEl.textContent = openButton.dataset.serviceDescription || ''

  const includes = openButton.dataset.serviceIncludes
    ? openButton.dataset.serviceIncludes.split('|')
    : []

  includesEl.innerHTML = includes
    .map(item => `<li>${item}</li>`)
    .join('')

  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
})

document.addEventListener('click', event => {
  const closeButton = event.target.closest('.js-service-modal-close')

  if (!closeButton) return

  const modal = document.getElementById('serviceModal')

  if (!modal) return

  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
})