import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid';
dotenv.config()

import pkg from 'pg';
const {Pool} = pkg;
const pool = new Pool({
  user: process.env.PSQLUSER,
  host: process.env.PSQLHOST,
  database: process.env.PSQLDBNAME,
  password: null,
  port: 5432,
})

export const getPosts = async function() {
  let data = await pool.query("SELECT post.id, post.author, post.post, TO_CHAR(post.date, 'MM/DD/YYYY - HH:MIam') AS date, cardinality(post_reaction.likes) AS likes, cardinality(post_reaction.dislikes) AS dislikes, COUNT(comment.post_id) AS comment_amount FROM post LEFT JOIN comment ON (post.id = comment.post_id) RIGHT JOIN post_reaction ON (post.id = post_reaction.post_id) GROUP BY post.id, post_reaction.likes, post_reaction.dislikes")
  return data.rows.reverse()
}
export const getUserPosts = async function(id) {
  let data = await pool.query( `SELECT post.id, post.author, post.post, TO_CHAR(post.date, 'MM/DD/YYYY - HH:MIam') AS date, cardinality(post_reaction.likes) AS likes, cardinality(post_reaction.dislikes) AS dislikes, COUNT(comment.post_id) AS comment_amount FROM post LEFT JOIN comment ON (post.id = comment.post_id) RIGHT JOIN post_reaction ON (post.id = post_reaction.post_id) WHERE post.users_id='${id}' GROUP BY post.id, post_reaction.likes, post_reaction.dislikes`)
  return data.rows.reverse()
}
export async function postPost(post) {
  const id = uuidv4()
  const postTableText = `INSERT INTO post(id, users_id, author, post) VALUES($1, $2, $3, $4)`
  const postTableValues = [id, post.userID, post.author, post.content]
  const reactionTableText = `INSERT INTO post_reaction(post_id) VALUES($1)`
  const reactionTableValues = [id]
  await pool.query(postTableText, postTableValues)
  await pool.query(reactionTableText, reactionTableValues)
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
  const id = uuidv4()
  const commentTableText = `INSERT INTO comment(id, users_id, author, comment, post_id) VALUES($1, $2, $3, $4, $5)`
  const commentTableValues = [id, comment.userID, comment.author, comment.comment, comment.fKeyID]
  const reactionTableText = `INSERT INTO comment_reaction(comment_id) VALUES($1)`
  const reactionTableValues = [id]
  await pool.query(commentTableText, commentTableValues)
  await pool.query(reactionTableText, reactionTableValues)
}
export async function getPostComments (id) {
// let post = await pool.query(`SELECT id, author, TO_CHAR(date, 'MM/DD/YYYY - HH:MIam'), comment, comment_parent_id FROM comment WHERE post_id='${id}' AND comment_parent_id IS NULL`)
  let data = await pool.query( `SELECT comment.id, comment.author, comment.comment, TO_CHAR(comment.date, 'MM/DD/YYYY - HH:MIam') AS date, cardinality(comment_reaction.likes) AS likes, cardinality(comment_reaction.dislikes) AS dislikes FROM comment LEFT JOIN comment_reaction ON (comment.id = comment_reaction.comment_id) WHERE post_id='${id}' AND comment_parent_id IS NULL GROUP BY comment.id, comment_reaction.likes, comment_reaction.dislikes`)
  return data.rows
}
export async function deleteComment(id) {
  await pool.query(`DELETE FROM comment WHERE id='${id}'`)
}
export async function deletePost(id) {
  await pool.query(`DELETE FROM post WHERE id='${id}'`)
}
export async function postReply(reply) {
  const id = uuidv4()
  const text = 'INSERT INTO comment(id, users_id, author, comment, post_id, comment_parent_id) VALUES ($1, $2, $3, $4, $5, $6)'
  const values = [id, reply.userID, reply.author, reply.comment, reply.fKeyID, reply.parentID]
  await pool.query(text, values)
}
export async function getCommentReplies(id) {
  let post = await pool.query(`SELECT comment.id, author, TO_CHAR(date, 'MM/DD/YYYY - HH:MIam') AS date, comment, comment_parent_id, cardinality(comment_reaction.likes) AS likes, cardinality(comment_reaction.dislikes) AS dislikes FROM comment LEFT JOIN comment_reaction ON (comment.id = comment_reaction.comment_id) WHERE comment_parent_id='${id}'`)
  return post.rows
}
export async function getUserComments(id) {
  let data = await pool.query(`SELECT * FROM comment WHERE users_id='${id}'`)
  return data.rows.reverse()
}
// LIKES AND DISLIKES

// FOR POST REACTIONS
export async function likePost(id, userID) {
  const addUserIDToLikeArray = `
    UPDATE post_reaction
    SET likes = ${userID} || likes
    WHERE post_id = '${id}'
    RETURNING likes
  `
  const results = await pool.query(addUserIDToLikeArray)
  return results.rows[0].likes
}
export async function dislikePost(id, userID) {
  const addUserIDToDislikeArray = `
    UPDATE post_reaction
    SET dislikes = ${userID} || dislikes
    WHERE post_id = '${id}'
    RETURNING dislikes
  `
  const results = await pool.query(addUserIDToDislikeArray)
  return results.rows[0].dislikes
}
export async function getPostReactionsAmount(id) {
  const text = `SELECT cardinality(likes) AS likes, cardinality(dislikes) AS dislikes FROM post_reaction WHERE post_id='${id}'`
  const results = await pool.query(text)
  return results.rows[0]
}  
// FOR COMMENT REACTIONS
export async function likeComment(id, userID) {
  const addUserIDToLikeArray = `
    UPDATE comment_reaction
    SET likes = ${userID} || likes
    WHERE comment_id = '${id}'
    RETURNING likes
  `
  const results = await pool.query(addUserIDToLikeArray)
  return results.rows[0].likes
}
export async function dislikeComment(id, userID) {
  const addUserIDToDislikeArray = `
    UPDATE comment_reaction
    SET dislikes = ${userID} || dislikes
    WHERE comment_id = '${id}'
    RETURNING dislikes
  `
  const results = await pool.query(addUserIDToDislikeArray)
  return results.rows[0].dislikes
}
export async function getCommentReactionsAmount(id) {
  const text = `SELECT cardinality(likes) AS likes, cardinality(dislikes) AS dislikes FROM comment_reaction WHERE comment_id='${id}'`
  const results = await pool.query(text)
  return results.rows[0]
}  

export default pool