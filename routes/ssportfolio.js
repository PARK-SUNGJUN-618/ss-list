const express = require("express");

// ssportfolioRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const ssportfolioRoutes = express.Router();

// This will help us connect to the database
const dbConn = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
ssportfolioRoutes.route("/getPortfolioData").get(function (req, res) {
  let db_connect = dbConn.getDb("sslist");
  db_connect
    .collection("ssportfolio")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you update Intro
ssportfolioRoutes.route("/updateIntro").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { category: "intro" };
  let newvalues = {
    $set: {
      welcomeText: req.body.welcomeText,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      caption: req.body.caption,
      description: req.body.description,
    },
  };
  db_connect
    .collection("ssportfolio")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you update About
ssportfolioRoutes.route("/updateAbout").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { category: "about" };
  let newvalues = {
    $set: {
      lottieURL: req.body.lottieURL,
      description1: req.body.description1,
      description2: req.body.description2,
      skills: req.body.skills,
    },
  };
  db_connect
    .collection("ssportfolio")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you create new Experience.
ssportfolioRoutes.route("/addExperience").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myobj = {
    category: "experience",
    company: req.body.company,
    title: req.body.title,
    period: req.body.period,
    description: req.body.description,
  };
  db_connect.collection("ssportfolio").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update Experience
ssportfolioRoutes.route("/updateExperience/:id").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      company: req.body.company,
      title: req.body.title,
      period: req.body.period,
      description: req.body.description,
    },
  };
  db_connect
    .collection("ssportfolio")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete Experience
ssportfolioRoutes.route("/deleteExperience/:id").delete((req, response) => {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("ssportfolio").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    //  console.log("1 document deleted");
    response.json(obj);
  });
});

// This section will help you create new Project.
ssportfolioRoutes.route("/addProject").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myobj = {
    category: "project",
    image: req.body.image,
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
    technologies: req.body.technologies,
  };
  db_connect.collection("ssportfolio").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update Project
ssportfolioRoutes.route("/updateProject/:id").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      image: req.body.image,
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      technologies: req.body.technologies,
    },
  };
  db_connect
    .collection("ssportfolio")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete Project
ssportfolioRoutes.route("/deleteProject/:id").delete((req, response) => {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("ssportfolio").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    //  console.log("1 document deleted");
    response.json(obj);
  });
});

// This section will help you create new Course.
ssportfolioRoutes.route("/addCourse").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myobj = {
    category: "course",
    image: req.body.image,
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
  };
  db_connect.collection("ssportfolio").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update Course
ssportfolioRoutes.route("/updateCourse/:id").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      image: req.body.image,
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
    },
  };
  db_connect
    .collection("ssportfolio")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete Course
ssportfolioRoutes.route("/deleteCourse/:id").delete((req, response) => {
  let db_connect = dbConn.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("ssportfolio").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    //  console.log("1 document deleted");
    response.json(obj);
  });
});

// This section will help you update Contact
ssportfolioRoutes.route("/updateContact").post(function (req, response) {
  let db_connect = dbConn.getDb();
  let myquery = { category: "contact" };
  let newvalues = {
    $set: {
      name: req.body.name,
      birth: req.body.birth,
      gender: req.body.gender,
      email: req.body.email,
      mobile: req.body.mobile,
      country: req.body.country,
    },
  };
  db_connect
    .collection("ssportfolio")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = ssportfolioRoutes;
