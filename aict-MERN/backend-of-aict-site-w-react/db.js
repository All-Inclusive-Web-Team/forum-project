// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()

import pkg from 'pg';
const {Pool} = pkg;
const pool = new Pool({
  user: process.env.PSQLUSER,
  host: process.env.PSQLHOST,
  database: 'aictforum',
  password: null,
  port: 5432,
})



export const getPosts = async function() {
  let data = await pool.query('SELECT * FROM posts')
  return data.rows.reverse()
}
export const postPost = async function(values) {
  const text = `INSERT INTO posts(posted_by, post, date_of_post) VALUES($1, $2, $3)`
  await pool.query(text, values)
}
export default pool