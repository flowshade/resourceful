const express = require("express")
const app = express()
const electron = require("./scripts/electron")

app.use(express.static("./client"));

const listener = app.listen(3000, () => console.log(`Development Server listening at ${listener.address().port}`))
// yes im using a debugger wow teach me lol oh ok lol | ok server works yay