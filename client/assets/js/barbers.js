const barbersList = document.getElementById('barbersList')
const BARBERS_API_URL = `${API_BASE_URL}/api/barbers`

let barbers = []

const getBarberImage = image => {
  return image || 'assets/img/gallery/team1.png'
}

const renderBarbers = () => {
  if (!barbersList) return

  barbersList.innerHTML = barbers
    .map((barber, index) => {
      const delay = 100 + index * 150

      const services = barber.services
        ? barber.services.map(item => item.service.title).join('|')
        : ''

      return `
        <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-team mb-80 text-center js-barber-modal-open"
                 data-barber-id="${barber.id}"
                 data-barber-name="${barber.name}"
                 data-barber-position="${barber.position}"
                 data-barber-description="${barber.description || ''}"
                 data-barber-experience="${barber.experience || ''}"
                 data-barber-image="${getBarberImage(barber.image)}"
                 data-barber-services="${services}">

                <div class="team-img">
                    <img src="${getBarberImage(barber.image)}" alt="Барбер ${barber.name}">
                </div>

                <div class="team-caption">
                    <span>${barber.position}</span>
                    <h3>${barber.name}</h3>
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

const loadBarbers = async () => {
  try {
    const response = await fetch(BARBERS_API_URL)
    const result = await response.json()

    if (!result.success) {
      throw new Error('Failed to load barbers')
    }

    barbers = result.data
    renderBarbers()
    initBarbersSlider()
  } catch (error) {
    console.error('Barbers loading error:', error)

    barbersList.innerHTML = `
      <div class="col-12 text-center">
        <p>Не вдалося завантажити барберів. Спробуйте пізніше.</p>
      </div>
    `
  }
}

const initBarbersSlider = () => {
  const slider = $('.team-active')

  if (!slider.length) return

  if (slider.hasClass('slick-initialized')) {
    slider.slick('unslick')
  }

  slider.slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  })
}

document.addEventListener('click', event => {
  const card = event.target.closest('.js-barber-modal-open')

  if (!card) return

  const modal = document.getElementById('barberModal')

  if (!modal) return

  const imageEl = document.getElementById('barberModalImage')
  const positionEl = document.getElementById('barberModalPosition')
  const nameEl = document.getElementById('barberModalName')
  const experienceEl = document.getElementById('barberModalExperience')
  const descriptionEl = document.getElementById('barberModalDescription')
  const servicesEl = document.getElementById('barberModalServices')

  imageEl.src = card.dataset.barberImage || ''
  imageEl.alt = `Барбер ${card.dataset.barberName || ''}`

  positionEl.textContent = card.dataset.barberPosition || ''
  nameEl.textContent = card.dataset.barberName || ''
  experienceEl.textContent = card.dataset.barberExperience || ''
  descriptionEl.textContent = card.dataset.barberDescription || ''

  const services = card.dataset.barberServices
    ? card.dataset.barberServices.split('|')
    : []

  servicesEl.innerHTML = services.map(service => `<li>${service}</li>`).join('')

  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
})

document.addEventListener('click', event => {
  const closeButton = event.target.closest('.js-barber-modal-close')

  if (!closeButton) return

  const modal = document.getElementById('barberModal')

  if (!modal) return

  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
})

loadBarbers()