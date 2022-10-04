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
module.exports.getPosts = async function() {
  let data = await pool.query('SELECT * FROM posts')
  return data.rows.reverse()
}
module.exports.postPost = async function(values) {
  const text = `INSERT INTO posts(posted_by, post, date_of_post) VALUES($1, $2, $3)`
  await pool.query(text, values)
}



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