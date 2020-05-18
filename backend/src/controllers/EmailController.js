const { email } = require("../services")
const User = require("../models/User")

const sendResult = async (req, res) => {
    const users = await User.find()
    const usersList = []
    for (let i = 0; i < users.length; i++) {
        users[i].friend = await User.findById(users[i].friend)
        usersList.push(users[i])
    }

    try {
        email.send(usersList)
        return res.status(204).end()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { sendResult }
