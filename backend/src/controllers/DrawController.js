const User = require("../models/User")
const isValidFriend = require("../utils/isValidFriend")

const draw = async (req, res) => {
    try {
        await User.updateMany({}, { friend: null })
        const users = await User.find()
        const unavailableUsers = []

        users.forEach((user) => {
            let friend = null
            do {
                friend = users[Math.floor(Math.random() * users.length)]
            } while (!isValidFriend(friend, user, users, unavailableUsers))

            unavailableUsers.push(friend._id)
            user.friend = friend._id
        })

        users.map(async (user) => {
            return await User.findByIdAndUpdate(user._id, user, {
                new: true,
            })
        })

        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.send(error).end()
    }
}

module.exports = { draw }
