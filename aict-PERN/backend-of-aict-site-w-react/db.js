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
  let data = await pool.query("SELECT post.id, post.author, post.post, TO_CHAR(post.date, 'MM/DD/YYYY - HH:MIam'), post.likes, post.dislikes, COUNT(comment.post_id) AS comment_amount FROM post LEFT JOIN comment ON (post.id = comment.post_id) GROUP BY post.id")
  return data.rows.reverse()
}
export const getUserPosts = async function(id) {
  let data = await pool.query(`SELECT post.id, post.author, post.post, TO_CHAR(post.date, 'MM/DD/YYYY - HH:MIam'), post.likes, post.dislikes, COUNT(comment.post_id) AS comment_amount FROM post LEFT JOIN comment ON (post.id = comment.post_id) WHERE post.users_id=${id} GROUP BY post.id`)
  return data.rows.reverse()
}
export async function postPost(post) {
  const text = `INSERT INTO post(users_id, author, post) VALUES($1, $2, $3)`
  const values = [post.userID, post.author, post.content]
  await pool.query(text, values)
}
export async function createUser(register) {
  const text = `INSERT INTO users (email, password, name) VALUES ($1, $2, $3)`
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
  const text = 'INSERT INTO comment(users_id, author, comment, post_id) VALUES ($1, $2, $3, $4)'
  const values = [comment.userID, comment.author, comment.comment, comment.fKeyID]
  await pool.query(text, values)
}
export async function getPostComments (id) {
  let post = await pool.query(`SELECT id, author, TO_CHAR(date, 'MM/DD/YYYY - HH:MIam'), comment, comment_parent_id FROM comment WHERE post_id='${id}' AND comment_parent_id IS NULL`)
  return post.rows
}
export async function deleteComment(id) {
  await pool.query(`DELETE FROM comment WHERE id=${id}`)
}
export async function deletePost(id) {
  await pool.query(`DELETE FROM post WHERE id=${id}`)
}
export async function postReply(reply) {
  const text = 'INSERT INTO comment(users_id, author, comment, post_id, comment_parent_id) VALUES ($1, $2, $3, $4, $5)'
  const values = [reply.userID, reply.author, reply.comment, reply.fKeyID, reply.parentID]
  await pool.query(text, values)
}
export async function getCommentReplies(id) {
  let post = await pool.query(`SELECT id, author, TO_CHAR(date, 'MM/DD/YYYY - HH:MIam'), comment, comment_parent_id FROM comment WHERE comment_parent_id=${id}`)
  return post.rows
}
export async function getUserComments(id) {
  let data = await pool.query(`SELECT * FROM comment WHERE users_id=${id}`)
  return data.rows.reverse()
}
export default pool