const { email } = require("../services")
const User = require("../models/User")

const sendResult = async (req, res) => {
    const users = await User.find()

    if (users.length < 2) {
        res.status(400).json({ error: "It's mandatory has at least two users" })
    }
    const usersList = []
    for (let i = 0; i < users.length; i++) {
        users[i].friend = await User.findById(users[i].friend)
        if (!users[i].friend)
            res.status(400).json({
                error: "It's mandatory all users have a friend",
            })
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
