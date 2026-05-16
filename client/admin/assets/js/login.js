const loginForm = document.getElementById('adminLoginForm')
const errorEl = document.getElementById('adminLoginError')

const token = localStorage.getItem('adminToken')

if (token) {
  window.location.href = 'dashboard.html'
}

loginForm.addEventListener('submit', async event => {
  event.preventDefault()

  errorEl.textContent = ''

  const formData = new FormData(loginForm)

  const payload = {
    email: formData.get('email').trim(),
    password: formData.get('password').trim(),
  }

  try {
    const response = await fetch(`${window.ADMIN_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Login failed')
    }

    localStorage.setItem('adminToken', result.data.token)
    localStorage.setItem('adminUser', JSON.stringify(result.data.admin))

    window.location.href = 'dashboard.html'
  } catch (error) {
    errorEl.textContent = 'Невірний email або пароль.'
  }
})