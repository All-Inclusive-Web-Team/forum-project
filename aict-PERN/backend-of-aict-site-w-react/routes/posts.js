import express from 'express'
import {getPosts, postPost, getPostComments, postComment, deleteComment, deletePost, postReply, getCommentReplies, getUserPosts, getUserComments} from '../db.js'
const router = express.Router()

router.route('/posts').get(async (req,res)=> {
    try {
        let posts = await getPosts()
        res.status(200).json({posts})
    } catch (error) {
        res.status(404).json({msg: 'FAILED'})
        console.log(error)
    }
}).post(async(req,res) => {
    const post = {
        author: req.user.name,
        content: req.body.post,
        userID: req.user.id
    }
    try {
        await postPost(post)
        res.redirect('back')
        return true
    } catch (error) {
        res.status(404).json({msg: 'FAILED'})
        console.log(error)
    }
})

router.route('/user-posts/:usersID').get(async (req,res) => {
    const usersID = req.params.usersID
    try {
        const results = await getUserPosts(usersID)
        res.json({results})
    } catch (error) {
        console.log(error)
    }
})

router.route('/user-comments/:usersID').get(async (req,res) => {
    const usersID = req.params.usersID
    try {
        const results = await getUserPosts(usersID)
        res.json({results})
    } catch (error) {
        console.log(error)
    }
})

router.route('/comments').get(async (req,res) => {
    try {
        const result = await getPostComments(req.query.fKeyID)
        res.json({result})
    } catch (error) {
        console.log(error)
    }
}).post(async (req,res) => {
    const comment  = {
        author: req.user.name,
        comment: req.body.comment,
        fKeyID: req.body.fKeyID,
        userID: req.user.id
    }
    try {
        await postComment(comment)
        res.status(200).json({ msg: 'Success'})
    } catch (error) {
        console.log(error)
    }
})

router.route('/delete-comment').post(async (req,res) => {
    try {
        await deleteComment(req.body.id)
        res.json({msg: 'Comment Deleted'})
    } catch (error) {
        console.log(error)
    }
})

router.route('/delete-post').post(async (req,res) => {
    try {
        await deletePost(req.body.id)
        res.json({msg: 'Post Deleted'})
    } catch (error) {
        console.log(error)
    }
})

router.route('/reply').get(async (req,res) => {
    try {
        const result = await getCommentReplies(req.query.parentID)
        res.json({result})
    } catch (error) {
        console.log(error)
    }
}).post(async (req,res) => {
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


export default router;