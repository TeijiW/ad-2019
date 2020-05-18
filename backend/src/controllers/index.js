const UserController = require("./UserController")
const DrawController = require("./DrawController")
const EmailController = require("./EmailController")

module.exports = {
    User: UserController,
    Draw: DrawController,
    Email: EmailController,
}
