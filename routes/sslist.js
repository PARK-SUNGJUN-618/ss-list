const express = require("express");
 
// sslistRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const sslistRoutes = express.Router();
 
// This will help us connect to the database
const dbConn = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
sslistRoutes.route("/getLists").get(function (req, res) {
 let db_connect = dbConn.getDb("sslist");
 db_connect
   .collection("sslist")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
sslistRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbConn.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
sslistRoutes.route("/createList").post(function (req, response) {
 let db_connect = dbConn.getDb();
 let myobj = {
  ssTitle: req.body.ssTitle,
  ssContent: req.body.ssContent,
  ssCreateDate: req.body.ssCreateDate,
  ssUpdateDate: req.body.ssUpdateDate,
  ssIsChecked: req.body.ssIsChecked,
  ssIsDeleted: req.body.ssIsDeleted,
  ssPriority: 1
 };
 db_connect.collection("sslist").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
sslistRoutes.route("/updateList/:id").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      ssTitle: req.body.ssTitle,
      ssContent: req.body.ssContent,
      ssPriority: req.body.ssPriority,
      ssUpdateDate: req.body.ssUpdateDate,
    },
  };
  db_connect
    .collection("sslist")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you check a record by id.
sslistRoutes.route("/checkList/:id").put(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      ssIsChecked: req.body.ssIsChecked,
      ssUpdateDate: req.body.ssUpdateDate,
    },
  };
  db_connect
    .collection("sslist")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});


// This section will help you delete a record
sslistRoutes.route("/deleteList/:id").delete((req, response) => {
 let db_connect = dbConn.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("sslist").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
  //  console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = sslistRoutes;