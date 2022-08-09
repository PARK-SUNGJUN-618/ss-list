const Pool = require("pg").Pool;

// myHeroku
const proConfig = process.env.DATABASE_URL

// localDB
const devConfig = `postgres://postgres:dbuser@localhost:5432/postgres`
  
const pool = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig
})  
    
module.exports = pool;