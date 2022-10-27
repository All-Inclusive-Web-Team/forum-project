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



export async function getPosts() {
  let data = await pool.query('SELECT * FROM posts')
  return data.rows.reverse()
}
export async function postPost(post) {
  const text = `INSERT INTO posts(posted_by, post, date_of_post) VALUES($1, $2, $3)`
  const values = [post.author, post.content, post.createdAt]
  await pool.query(text, values)
}
export default pool