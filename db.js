require('dotenv').config()
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: process.env.PSQLUSER,
  host: process.env.PSQLHOST,
  database: 'aictforum',
  password: null,
  port: 5432,
})


module.exports = pool





// const client = new Client({
//   user: 'Dayvo',
//   host: 'localhost',
//   database: 'aictforum',
//   password: null,
//   port: 5432,
// })
// client.connect()
// client.query('SELECT * FROM posts', (err, res) => {
//   console.log(err, res)
//   client.end()
// })