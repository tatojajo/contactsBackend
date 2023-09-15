const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../modals/userModal')

//@desc Register user
//@route GET /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ error: 'All fields are required' })
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400).json({ error: 'User already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username, email, password: hashedPassword
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error('User data is not valid')
    }
    res.json({ message: 'Register the user' })
})
//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login user' })
})
//@desc Current user
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user information' })
})

module.exports = { registerUser, loginUser, currentUser }