const mailer = require("../services/emailService")
const User = require("../models/User")

const sendResult = async (req, res) => {
    const users = await User.find()
    const usersList = []
    for (let i = 0; i < users.length; i++) {
        users[i].friend = await User.findById(users[i].friend)
        usersList.push(users[i])
    }

    usersList.forEach(async (user) => {
        try {
            await mailer.send(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Something went wrong :c" })
        }
    })
    return res.json({ message: "All Email sent!" })
}

module.exports = { sendResult }
