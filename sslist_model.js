const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kmirzodfixqdah',
  host: 'ec2-44-196-174-238.compute-1.amazonaws.com',
  database: 'd3t5qtt2gja7eq',
  password: '5254ba95ec0fc777cd6cbb3f0fbce876548e4e0dec8a99fb1854f524287f3496',
  port: 5432,
  ssl: true
});

const getSsList = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * public.test_tbl ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve("asdasd");
    })
  }) 
}

const createSsList = (body) => {
  return new Promise(function(resolve, reject) {
    const { name } = body
    pool.query('INSERT INTO public.test_tbl (name) VALUES ($1) RETURNING *', [name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteSsList = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.test_tbl WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getSsList,
  createSsList,
  deleteSsList,
}