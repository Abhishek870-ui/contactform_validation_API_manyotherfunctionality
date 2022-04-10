//import express and mongodb modules
let express = require("express")
let multer = require("multer");
var async = require('async');
//import database connection
let conn = require("../config/db_connection")

//get connection object
let connection = conn.getConnection()

//connect to database
connection.connect()
//create router instance
let router = express.Router()

//create rest api
let storage = multer.diskStorage({
  destination: function (req, image, cb) {
    cb(null, '../contact/public/uploads')
  },
  filename: function (req, image, cb) {
    cb(null, image.fieldname + '-' + Date.now() + '.jpg')
  }
})
let upload = multer({ storage: storage })

router.post("/registerUser", upload.single('image'), (req, res) => {

  let obj = req.body;
  let fname = obj.fname;
  let lname = obj.lname;
  let email = obj.email;
  let phone = obj.phone;
  let gender = obj.gender;
  let hobbies = obj.hobbies;
  let message = obj.message;
  let formValues = JSON.parse(obj.formValues);
  let image = '../uploads' + '/' + req.file.filename;

  var query2 = ""
  var query1 = `insert into contacts(fname,lname,email,phone,gender,hobbies,message,image) values ('${fname}','${lname}', '${email}', '${phone}','${gender}','${hobbies}','${message}','${image}' )`
  
  console.log(query2, "query2")
  var return_data = {};

  async.parallel([
    function (parallel_done) {
      connection.query(query1, {}, function (err, results) {
        if (err) return parallel_done(err);
        return_data.table1 = results;
        parallel_done();
      });
    },
    function (parallel_done) {
      formValues.forEach(element => (
         connection.query(`insert into  educationdetails(contactid,degree,subjects,percentage) values ((select id from contacts order by id desc limit 1),'${element.degree}','${element.subjects}', '${element.percentage}' )`, {}, function (err, results) {
          if (err) return parallel_done(err);
          return_data.table2 = results;
          // parallel_done();
        })))

}
  ], function (err) {
    if (err) throw err;
    else {
      res.send(return_data);
      console.log(return_data)
    }
  });
  
})

// router.post("/registerUser",upload.single('image'),(req, res) => {
//   console.log("storage",storage)
//   console.log(req.body);
//     console.log(req.image)  
//   let obj = req.body;
//     let fname = obj.fname;
//     let lname = obj.lname;
//     let email = obj.email;
//     let phone = obj.phone;
//     let gender = obj.gender;
//     let hobbies = obj.hobbies;
//     let message = obj.message;


//     let id = req.body.id;
//     console.log("phone number is : " +phone+ "hobbies are " + hobbies)

//     let image = '../uploads' + '/' + req.file.filename;

//     console.log(image)  

//     connection.query(`insert into contacts(fname,lname,email,phone,gender,hobbies,message,image) values ('${fname}','${lname}', '${email}', '${phone}','${gender}','${hobbies}','${message}','${image}' )`, (err) => {
//         if (err) throw err;
//         else
//             res.json({"insert" : "success"})
//     })




// })

// router.post("/educationdetails",(req, res) => {
//   console.log(req.body);
//   let obj = req.body;

//     let degree = obj.degree;
//     let subjects = obj.subjects;
//     let percentage = obj.percentage;




//     connection.query(`insert into  educationdetails(contactid,degree,subjects,percentage) values ((select id from contacts order by id desc limit 1),'${degree}','${subjects}', '${percentage}' )`, (err) => {
//       if (err) throw err;
//       else
//           res.json({"insert" : "success"})
//   })


// })



//export router
module.exports = router