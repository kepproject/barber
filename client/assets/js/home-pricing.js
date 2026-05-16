(() => {
  const pricingList = document.getElementById('homePricingList')
  const PRICING_API_URL = `${window.API_BASE_URL}/api/services`

  if (!pricingList) return

  const renderPricingColumn = services => {
    return `
      <div class="col-lg-6 col-md-6 col-sm-6" >
        <div class="pricing-list">
          <ul>
            ${services
              .map(
                service => `
                  <li>
                    ${service.title}. . . . . . . . . . . . . . .
                    <span>${service.price} грн</span>
                  </li>
                `
              )
              .join('')}
          </ul>
        </div>
      </div>
    `
  }

  const loadPricing = async () => {
    try {
      const response = await fetch(PRICING_API_URL)
      const result = await response.json()

      if (!result.success) {
        throw new Error('Failed to load pricing')
      }

      const services = result.data
      const middleIndex = Math.ceil(services.length / 2)

      const firstColumn = services.slice(0, middleIndex)
      const secondColumn = services.slice(middleIndex)

      pricingList.innerHTML =
        renderPricingColumn(firstColumn) + renderPricingColumn(secondColumn)

      if (typeof AOS !== 'undefined') {
        AOS.refresh()
      }
    } catch (error) {
      console.error('Pricing loading error:', error)

      pricingList.innerHTML = `
        <div class="col-12 text-center">
          <p>Не вдалося завантажити прайс. Спробуйте пізніше.</p>
        </div>
      `
    }
  }

  loadPricing()
})()