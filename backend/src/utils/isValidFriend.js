module.exports = (friend, user, users, unavailableUsers) => {
    if (friend._id !== user._id && !unavailableUsers.includes(friend._id)) {
        return true
    }
    return false
}
