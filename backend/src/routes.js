const UserController = require("./controllers/UserController")
const DrawController = require("./controllers/DrawController")
const EmailController = require("./controllers/EmailController")

module.exports = (app) => {
    app.route("/users")
        .get(UserController.index)
        .post(UserController.create)
        .delete(UserController.removeAll)
    app.route("/users/:userId")
        .get(UserController.indexById)
        .put(UserController.update)
        .delete(UserController.remove)
    app.route("/draw").get(DrawController.draw)

    app.route("/email").get(EmailController.sendResult)
}
