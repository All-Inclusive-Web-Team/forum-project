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
export async function postPost(post) {
  const text = `INSERT INTO posts(posted_by, post, date_of_post) VALUES($1, $2, $3)`
  const values = [post.author, post.content, post.createdAt]
  await pool.query(text, values)
}
export async function createUser(register) {
  const text = `INSERT INTO users(email, password, name) VALUES($1, $2, $3)`
  const values = [register.email, register.password, register.name]
  await pool.query(text, values)
}
export async function getOneUserByEmail (email) {
  let data = await pool.query(`SELECT * FROM users WHERE email='${email}'`)
  return data.rows
}
export async function getOneUserById (id) {
  let data = await pool.query(`SELECT * FROM users WHERE id='${id}'`)
  return data.rows  
}
export default pool