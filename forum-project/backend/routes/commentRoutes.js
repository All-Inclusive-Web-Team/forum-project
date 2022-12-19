import express from 'express'
import {getPostComments, postComment, deleteComment, postReply, getCommentReplies, getUserComments, likeComment, dislikeComment, getCommentReactionsAmount} from '../db.js'
const router = express.Router()

router.route('/get-comment/:id').get(async (req,res) => {
    try {
        const results = await getPostComments(req.params.id)
        res.json({results})
    } catch (error) {
        console.log(error)
    }
})

router.route('/post-comment/:id').post(async (req,res) => {
    const comment  = {
        author: req.user.name,
        comment: req.body.comment,
        fKeyID: req.params.id,
        userID: req.user.id
    }
    try {
        await postComment(comment)
        res.status(200).json({ msg: 'Success'})
    } catch (error) {
        console.log(error)
    }
})

router.route('/user-comments/:usersID').get(async (req,res) => {
    const usersID = req.params.usersID
    try {
        const results = await getUserComments(usersID)
        res.json({results})
    } catch (error) {
        console.log(error)
    }
})

router.route('/delete').post(async (req,res) => {
    try {
        await deleteComment(req.body.id)
        res.json({msg: 'Comment Deleted'})
    } catch (error) {
        console.log(error)
    }
})

router.route('/get-reply/:id').get(async (req,res) => {
    const parentID = req.params.id
    try {
        const results = await getCommentReplies(parentID)
        res.json({results})
    } catch (error) {
        console.log(error)
    }
})

router.route('/reply').post(async (req,res) => {
    const reply = {
        author: req.user.name,
        comment: req.body.comment,
        fKeyID: req.body.fKeyID,
        parentID: req.body.parentID,
        userID: req.user.id
    }
    try {
        await postReply(reply)
        res.json({msg: 'Successfully Replied'})
    } catch (error) {
        console.log(error)
    }
})

router.route('/like/:id').get(async (req,res) => {
    const postID = req.params.id
    const userID = req.user.id
    try {
        const results = await likeComment(postID, userID)
        res.status(200).json({results})
        return true
    } catch (error) {
        console.log(error)
    }
})

router.route('/dislike/:id').get(async (req,res) => {
    const postID = req.params.id
    const userID = req.user.id
    try {
        const results = await dislikeComment(postID, userID)
        res.status(200).json({results})
        return true
    } catch (error) {
        console.log(error)
    }
})

router.route('/reactions-amount/:id').get(async (req,res) => {
    const postID = req.params.id
    try {
        const results = await getCommentReactionsAmount(postID)
        res.status(200).json({results})
        return true
    } catch (error) {
        console.log(error)
    }
})

export default router