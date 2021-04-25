const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../../config')

const generateAccessToken = (id, roles) => {
    const payload = { id, roles }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async createUser(req, res) {
        try {
            // Валидация данных и отправка ошибки при наличии
            // Настройки валидации описаны в файле "/app/routes/auth.js"
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Creating user error.', errors })
            }

            const { first_name, last_name, email, password, roles } = req.body
            const candidate = await User.findOne({ email }) // если юзер с таким email уже зарегистрирован - посылаем ошибку
            if (candidate) {
                return res.status(400).json({ message: 'User with the given email already exist.' })
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRoles = ['USER'] // роль по умолчанию
            for (const role of roles) {
                const r = await Role.findOne({ value: role })
                if (r) {
                    userRoles.push(r.value)
                } else {
                    return res.status(400).json({ message: 'Incorrect passed roles.' })
                }
            }
            const user = new User({ first_name, last_name, email, password: hashPassword, roles: userRoles })
            await user.save()
            return res.json({ message: 'User has been successfully created.' })
        } catch(e) {
            const { first_name, last_name, email, password } = req.body
            console.log(first_name, last_name, email, password)
            console.log(e)
            res.status(400).json({ message: 'Creating user error.' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'User with given email not found.' })
            }

            // Сравниваем пароль от юзера с паролем в БД
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Given password is invalid.` })
            }

            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })
        } catch(e) {
            console.log(e)
            res.status(400).json({ message: 'Login error.' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.json(users)
        } catch(e) {
            console.log(e)
            res.status(400).json({ message: 'Login error.' })
        }
    }
}

module.exports = new authController()