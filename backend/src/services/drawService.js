const shuffle = (unshuffled) =>
    unshuffled
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)

const lots = (users) => {
    const usersIds = users.map((user) => user._id)

    while (true) {
        try {
            let shuffledUsers = shuffle(shuffle(usersIds))
            users.forEach((user, index) => {
                if (user._id === shuffledUsers[index]) {
                    throw "User is your self friend"
                }
                user.friend = shuffledUsers[index]
            })
            break
        } catch (error) {
            console.warn(error)
        }
    }
    return users
}

module.exports = { lots }
