const controllers = require("./controllers")

module.exports = (app) => {
    app.route("/users")
        .get(controllers.User.index)
        .post(controllers.User.create)
        .delete(controllers.User.removeAll)
    app.route("/users/:userId")
        .get(controllers.User.indexById)
        .put(controllers.User.update)
        .delete(controllers.User.remove)
    app.route("/draw").get(controllers.Draw.lots)

    app.route("/email").get(controllers.Email.sendResult)
}
