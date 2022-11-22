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
  let data = await pool.query('SELECT * FROM post')
  
  return data.rows.reverse()
}
export async function postPost(post) {
  const text = `INSERT INTO post(post_author, post) VALUES($1, $2)`
  const values = [post.author, post.content]
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
export async function postComment (comment) {
  const text = 'INSERT INTO comment(comment_author, comment, comment_id) VALUES ($1, $2, $3)'
  const values = [comment.author, comment.comment, comment.fKeyID]
  await pool.query(text, values)
}
export async function getPostComments (id) {
  let post = await pool.query(`SELECT id, comment_author, TO_CHAR(comment_date, 'MM/DD/YYYY - HH:MIam'), comment, comment_parent_id FROM comment WHERE comment_id='${id}'`)
  return post.rows
}

export async function deleteComment(id) {
  await pool.query(`DELETE FROM comment WHERE id=${id}`)
}
export async function deletePost(id) {
  await pool.query(`DELETE FROM post WHERE id=${id}`)
}
export async function postReply(reply) {
  const text = 'INSERT INTO comment(comment_author, comment, comment_id, comment_parent_id) VALUES ($1, $2, $3, $4)'
  const values = [reply.author, reply.comment, reply.fKeyID, reply.parentID]
  await pool.query(text, values)
}
export async function getCommentReplies(id) {
  // let post = await pool.query(`SELECT id, comment_author, TO_CHAR(comment_date, 'MM/DD/YYYY - HH:MIam'), comment, comment_parent_id FROM comment WHERE comment_id='${id}'`)
  let post = await pool.query(`SELECT * FROM comment WHERE comment_parent_id=${id}`)
  // console.log(post.rows)
  return post.rows
}
export default pool