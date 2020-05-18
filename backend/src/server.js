const express = require("express")
const middlewares = require("./config/middlewares")
const routes = require("./routes")
require("dotenv/config")

const app = express()

middlewares(app)
routes(app)
app.use(express.json())

app.listen(process.env.PORT || 8080)
