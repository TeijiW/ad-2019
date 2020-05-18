const User = require("../models/User")
const { draw } = require("../services")

const lots = async (req, res) => {
    try {
        await User.updateMany({}, { friend: null })
        const users = await User.find()

        if (users.length < 2) {
            res.status(400).json({
                error: "It's mandatory has at least two users",
            })
        }

        const shuffledUsers = draw.lots(users)

        shuffledUsers.map(async (user) => {
            return await User.findByIdAndUpdate(user._id, user, {
                new: true,
            })
        })

        return res.json(shuffledUsers)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { lots }
