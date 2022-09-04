const Pool = require("pg").Pool;

// myHeroku
const proConfig = {
  connectionString : process.env.DATABASE_URL,
  ssl: {    /* <----- Add SSL option */
    rejectUnauthorized: false,
  },
}

// localDB
const devConfig = {
  connectionString : "postgresql://postgres:dbuser@localhost:5432/postgres"
}
  
const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig ,
)  
    
module.exports = pool;