const shuffle = (unshuffled) =>
    unshuffled
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)

const run = (users) => {
    const usersIds = users.map((user) => user._id)
    let shuffledUsers = shuffle(shuffle(usersIds))
    users.forEach((user, index) => {
        user.friend = shuffledUsers[index]
    })
    return users
}

module.exports = { run }
