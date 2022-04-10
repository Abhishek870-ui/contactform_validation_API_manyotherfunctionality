//import modules
let express = require("express")
let bodyparser = require("body-parser")
let cors = require("cors")
const path = require('path');
//create rest object
let app = express()

//create post
let port = process.env.PORT || 8080



//set JSON as MIME type
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))


//enable cors Cross Origine Resource Sharing
//to enable communication among various ports
app.use(cors())

//import fetch, insert, update, delete modules
let fetch = require("./fetch/fetch.js")
let insert = require("./insert/insert.js")
let delet = require("./delete/delete.js")
let update = require("./update/update")

//use modules
app.use("/fetch", fetch)
app.use("/insert", insert)
app.use("/delete", delet)
app.use("/update",update)
//assign port no
app.listen(port, () => {
    console.log("Server running on port no :- ", port)
})