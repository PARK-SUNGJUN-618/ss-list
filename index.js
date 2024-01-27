const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const port = process.env.PORT || 5000;

// config.env
require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json());

// get driver connection
const dbConn = require("./db/conn");

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === "production") {
  // react static file
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// route
app.use('/api/sslist', require("./routes/sslist"));
app.use('/api/ssdiary', require("./routes/ssdiary"));
app.use('/api/ssportfolio', require("./routes/ssportfolio"));

app.listen(port, () => {
  // perform a database connection when server starts
  dbConn.connectToServer(function (err) {
    if (err) {
      console.error(err);
    }

  });
  console.log(`Server is running on port: ${port}`);
});