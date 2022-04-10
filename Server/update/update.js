//import express module
let express = require('express')
let multer = require("multer");
const fs = require('fs')
var async = require('async');
//import database connection
let conn = require("../config/db_connection");
//get connection object
let connection = conn.getConnection()
//connect to database
connection.connect()
//create router instance
let router = express.Router()
let moment = require('moment')
var storage = multer.diskStorage({
    destination: function (req, image, cb) {
        cb(null, '../contact/public/uploads')
    },
    filename: function (req, image, cb) {
        cb(null, image.fieldname+'-'+Date.now()+'.jpg')
    }
})
var upload = multer({ storage: storage })
//create rest api
router.post("/updateContact", upload.single('image'), async (req, res) => {
    // await upload(req.file.path)
    let id = req.body.id;
    //await unlinkAsync(req.file.path)

    // res.end("UPLOAD COMPLETED!")
    // console.log( res.end);

    // console.log("file name  ;- ", req.file);
    console.log("id is jbjhub  ;- ", req.body);
    let obj = req.body
    console.log(req.body)

    let fname = obj.fname
    let lname = obj.lname
    let email = obj.email
    let phone = obj.phone
    let gender = obj.gender
    let hobbies = obj.hobbies
    let message = obj.message
    let formValues = JSON.parse(obj.formValues);
    // console.log("id is jbjhub  ;- ", req.body);
    let sql='';
    if (req.file) {
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
       
        let image = '../uploads' + '/' + req.file.filename;
   
        sql=`update contacts set fname = '${fname}', 
                                lname = "${lname}", 
                                email = '${email}',
                                 phone = '${phone}' ,
                                 gender = '${gender}',
                                 hobbies = '${hobbies}',
                                 message = '${message}',
                                 image = '${image}',
                                 modified_at = '${moment().format("YYYY-MM-DD h:mm:ss")}'
                                 where id = ${id} `;
    }
    else{
        sql=`update contacts set fname = '${fname}', 
        lname = "${lname}", 
        email = '${email}',
         phone = '${phone}' ,
         gender = '${gender}',
         hobbies = '${hobbies}',
         message = '${message}',
         modified_at = '${moment().format("YYYY-MM-DD h:mm:ss")}'
         where id = ${id} `;
    }
    var return_data = {};

    
        
    async.parallel([
        function (parallel_done) {
            console.log("parallel_done1")
            if(sql){
          connection.query(sql, {}, function (err, results) {
            if (err) return parallel_done(err);
            return_data.table1 = results;
            parallel_done();
          });
        }
        },
        function (parallel_done) {
            console.log("parallel_done2")

          formValues.forEach(element => (

             connection.query(`update educationdetails set degree = '${element.degree}',
             subjects='${element.subjects}',
             percentage='${element.percentage}',
             modified_at = '${moment().format("YYYY-MM-DD h:mm:ss")}'
           where contactid = ${id}  `), {}, function (err, results) {
              if (err) return parallel_done(err);
              return_data.table2 = results;
              // parallel_done();
            console.log("parallel_done3")

              console.log(results,"results")
            }))
    
    }
      ], function (err) {
        if (err) throw err;
        else {
          res.send(return_data);
          console.log(return_data,"return_data")
        }
      });
      
    
    

})



//export router
module.exports = router