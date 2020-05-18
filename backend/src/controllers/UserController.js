const User = require("../models/User")

const index = async (req, res) => {
    let usersList = []
    try {
        const users = await User.find({}, "-__v")
        for (let i = 0; i < users.length; i++) {
            users[i].friend = await User.findById(users[i].friend, "-__v")
            usersList.push(users[i])
        }
        return res.send(usersList)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Error" })
    }
}

const indexById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
}

const create = async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).send(user)
    } catch (error) {
        console.log(error.code)
        if (error.code === 11000) {
            return res.status(400).json({ error: "User not created" })
        }
        return res.status(500).json({ error: "Internal Error" })
    }
}

const update = async (req, res) => {
    try {
        const userToUpdate = {
            _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            friend: req.body.friend,
        }
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            userToUpdate,
            {
                new: true,
            }
        )
        if (!user)
            return res
                .status(400)
                .json({ error: "User not updated, Bad Update Request" })
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Error" })
    }
}

const remove = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.userId })
        return res.json({ message: "Success!" })
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
}

const removeAll = async (req, res) => {
    try {
        await User.deleteMany({})
        return res.json({ message: "Success!" })
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
}

module.exports = {
    index,
    indexById,
    create,
    update,
    remove,
    removeAll,
}
