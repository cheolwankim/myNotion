const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashed })
    res.status(201).json({ message: 'User created', user })
  } catch (err) {
    res.status(500).json({ error: 'Register failed' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Wrong password' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.json({ token, user: { id: user._id, email: user.email } })
  } catch (err) {
    res.status(500).json({ error: 'Login failed' })
  }
}

exports.getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
