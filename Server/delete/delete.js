//import express module
let express = require('express')
const fs = require('fs')
//import database connection
let conn = require("../config/db_connection")
//get connection object
let connection = conn.getConnection()
//connect to database
connection.connect()
//create router instance
let router = express.Router()
//create rest api
router.post("/deletecontact/:id", (req, res) => {

    let id = req.params.id
    console.log(id)
    // console.log(recordsArray)
    connection.query(`select * from contacts where id = ${id}`, (err, recordsArray, fields) => {
        if (err) {
            throw err;
        }
        else
        console.log(recordsArray[0].image)
        let str = (recordsArray[0].image).replace('.','')
        console.log(str)
            fs.unlinkSync(`../contact/public/${str}`);

    })
    connection.query(`delete from contacts where id = ${id}`, (err, recordsArray, fields) => {
        if (err) {
            throw err;
        }
        else
            res.json(recordsArray)
            // fs.unlinkSync(recordsArray.image);

        console.log(recordsArray)
    })

})


module.exports = router