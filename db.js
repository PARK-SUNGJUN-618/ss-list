const Pool = require("pg").Pool;

// localDB
const pool = new Pool({
  user: "postgres",
  password: "dbuser",
  host: "localhost",
  port: 5432,
  database: "postgres"
})

//// myHeroku
// const pool = new Pool({
//   user: "kmirzodfixqdah",
//   password: "5254ba95ec0fc777cd6cbb3f0fbce876548e4e0dec8a99fb1854f524287f3496",
//   host: "ec2-44-196-174-238.compute-1.amazonaws.com",
//   port: 5432,
//   database: "d3t5qtt2gja7eq"
// })

module.exports = pool;