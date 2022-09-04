const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.use('/api/data', function(req, res) {
  res.json({ greeting: 'Hello World' });
});

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === "production") {
  // react static file
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// route
app.use('/api/sslist', require('./api/sslist.route'));
app.use('/api/ssdiary', require('./api/ssdiary.route'));

// check port
app.listen(port, () => {
  console.log(`started app listening on port ${port}`);
})