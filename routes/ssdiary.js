const express = require("express");
 
// ssdiaryRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const ssdiaryRoutes = express.Router();
 
// This will help us connect to the database
const dbConn = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
ssdiaryRoutes.route("/getSsDiary/:params").get(function (req, res) {
  const params = req.params.params;
  // console.log("params:",params)
  const limit = parseInt(params.split('&')[1]);
  const offset = parseInt((params.split('&')[0]-1)*limit);
 
  let db_connect = dbConn.getDb("sslist");
  db_connect
    .collection("ssdiary")
    .find({}).sort( { "_id": -1 } ).skip(offset).limit(limit)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      // console.log("result:",result)
    });
});

// This section will help you get a list of all the records.
ssdiaryRoutes.route("/getSsDiariesCount").get(async function (req, res) {
  try {
    let db_connect = dbConn.getDb("sslist");
    const ssDiariesCount = await db_connect
      .collection("ssdiary")
      .count();
      // .toArray(function (err, result) {
        // if (err) throw err;
        res.json({ "totalCount": ssDiariesCount });
      // })
  } catch (err) {
    console.error(err.message);
  }
});

// This section will help you update a ssOrigContent by id.
ssdiaryRoutes.route("/changeOrigContent/:id").put(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      ssOrigContent: req.body.ssOrigContent,
      ssModiContent:req.body.ssModiContent,
      ssUpdateDate: req.body.ssUpdateDate,
    },
  };
  db_connect
    .collection("ssdiary")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you update a ssModiContent by id.
ssdiaryRoutes.route("/changeModiContent/:id").put(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      ssModiContent:req.body.ssModiContent,
      ssUpdateDate: req.body.ssUpdateDate,
    },
  };
  db_connect
    .collection("ssdiary")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});

// router.get('/getSsDiariesCount', async (req, res) => {
//   try {
//     const allDiaries = await pool.query(
//       `SELECT count(*) "totalCount" FROM tbl_ssdiary`
//     );
     
//     // console.log(allDiaries.rows[0])
//     // console.log("here!!:",allDiaries)
//     res.json(allDiaries.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });




// This section will help you get a single record by id
ssdiaryRoutes.route("/record/:id").get(function (req, res) {
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
ssdiaryRoutes.route("/addDiary").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myobj = {
    ssOrigContent: req.body.ssOrigContent,
    ssModiContent: req.body.ssOrigContent,
    ssCreateDate: req.body.ssCreateDate,
    ssUpdateDate: req.body.ssUpdateDate,
    ssIsDeleted: req.body.ssIsDeleted,
  };
  db_connect.collection("ssdiary").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
 
// This section will help you update a record by id.
ssdiaryRoutes.route("/changeDiary/:id").put(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      ssModiContent: req.body.ssModiContent,
      ssUpdateDate: req.body.ssUpdateDate,
    },
  };
  db_connect
    .collection("ssdiary")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you check a record by id.
ssdiaryRoutes.route("/checkList/:id").put(function (req, response) {
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
ssdiaryRoutes.route("/deleteDiary/:id").delete((req, response) => {
 let db_connect = dbConn.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("ssdiary").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
  //  console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = ssdiaryRoutes;