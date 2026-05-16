const authService = require('../services/authService')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const result = await authService.loginAdmin({
      email,
      password,
    })

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Login error:', error)

    res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    })
  }
}

module.exports = {
  login,
}