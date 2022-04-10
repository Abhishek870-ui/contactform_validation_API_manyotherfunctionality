//import express module
let express = require('express')

//import database connection
let conn = require("../config/db_connection")

//get connection object
let connection = conn.getConnection()

//connect to database
connection.connect()

//create router instance
let router = express.Router()


// router.get("/contactDetails", (req, res) => {
//     // limit as 20
//     const limit = 5
//     // page number
//     const page = req.query.page
//     // const page = req.body.page
// // console.log(page)
//     // calculate offset
//     const offset = (page - 1) * limit
//     // query for fetching data with page number and offset
//     const prodsQuery = `select id,concat(fname," ",lname) as " full_name",email,phone,gender,hobbies,message,image,created_at,modified_at from contacts order by id DESC limit ${limit} OFFSET ${offset}`
//     if (offset) {
//         connection.query(prodsQuery, function (error, results, fields) {
//             // When done with the connection, release it.
//             if (error) throw error;

//             else
//                 res.json(results)
//             // create payload
//             //    var jsonResult = {
//             //      'contact_page_count':results.length,
//             //      'page_number':page,
//             //      'contact':results
//             //    }
//             //    // create response
//             //    var myJsonString = JSON.parse(JSON.stringify(jsonResult));
//             //    res.statusMessage = "contact for page "+page;
//             //    res.statusCode = 200;
//             //    res.json(myJsonString);
//             //    res.end();
//         })
//     }

//     else {
//         connection.query(`select id,concat(fname," ",lname) as " full_name",email,phone,gender,hobbies,message,image,created_at,modified_at from contacts order by id DESC `, (err, recordsArray, fields) => {
//             if (err) {
//                 throw err;
//             }
//             else
//                 res.json(recordsArray)
//         })
//     }

// })


router.post("/contactDetailsbypagination", (req, res) => {
    let offset = req.body.offset
    let limit = req.body.limit
    console.log(req.body)
    const totalrecords = `select id,concat(fname," ",lname) as " full_name",email,phone,gender,hobbies,message,image,created_at,modified_at from contacts order by id DESC`
    connection.query(totalrecords + ` limit ${limit} OFFSET ${offset} `, (err, recordsArray, fields) => {
        if (err) {
            throw err;
        }
        else
            res.json(recordsArray)
        console.log(recordsArray)
    })

})

// router.post("/contactDetailsbypagination", (req, res) => {
//     let offset = req.body.offset
//     let limit = req.body.limit
//     console.log(req.body)
//     const totalrecords = `select id,concat(fname," ",lname) as " full_name",email,phone,gender,hobbies,message,image,created_at,modified_at from contacts order by id DESC`
//     connection.query( `select id,concat(fname," ",lname) as " full_name",email,phone,gender,hobbies,message,image,created_at,modified_at,(select count(*) from contacts) as totalrecords  from contacts order by id DESC limit ${limit} OFFSET ${offset} `, (err, recordsArray, fields) => {
//         if (err) {
//             throw err;
//         }
//         else
//             res.json(recordsArray)
//         console.log(recordsArray)
//     })

// })

router.get("/totalrecords", (req, res) => {
    
    connection.query(`select id,concat(fname," ",lname) as " full_name",email,phone,gender,hobbies,message,image,created_at,modified_at from contacts`, (err, recordsArray, fields) => {
        if (err) {
            throw err;
        }
        else
            res.json(recordsArray)
    })

})



router.get("/contactDetailsbyid/:id", (req, res) => {
    let id = req.params.id
    console.log(id)
    connection.query(`select c.fname,c.lname,c.email,c.phone,c.gender,c.hobbies,c.message,c.image,e.degree,e.subjects,e.percentage from educationdetails e inner join contacts c on e.contactid = c.id where c.id = ${id}`, (err, recordsArray, fields) => {
        if (err) {
            throw err;
        }
        else
            res.json(recordsArray)
        console.log(recordsArray)
    })

})

//export router
module.exports = router