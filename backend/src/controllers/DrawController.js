const User = require("../models/User")
// const isValidFriend = require("../utils/isValidFriend")
const { draw } = require("../services")

const run = async (req, res) => {
    try {
        await User.updateMany({}, { friend: null })
        const users = await User.find()

        const shuffledUsers = draw.run(users)

        shuffledUsers.map(async (user) => {
            return await User.findByIdAndUpdate(user._id, user, {
                new: true,
            })
        })

        return res.json(shuffledUsers)
    } catch (error) {
        console.log(error)
        return res.send(error).end()
    }
}

module.exports = { run }
