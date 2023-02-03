import express from 'express'
import {getPosts, postPost, deletePost, getUserPosts, likePost, dislikePost, getPostReactionsAmount, getPostByID} from '../db.js'
import path from 'path'
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploaded-images')
    }, 
    filename: function(req,file,cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})
const router = express.Router()

router.route('/').get(async (req,res)=> {
    try {
        const results = await getPosts()
        res.status(200).json({results})
    } catch (error) {
        res.status(404).json({msg: 'FAILED'})
        console.log(error)
    }
}).post(upload.single('imgName'), async(req,res) => {
    const filename = req.file !== null ? req.file.filename : null
    const post = {
        author: req.user.name,
        content: req.body.post,
        userID: req.user.id,
        filename
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

router.route('/:id').get(async (req,res) => {
    const ID = req.params.id
    try {
        const results = await getPostByID(ID)
        res.status(200).json(results)
    } catch (error) {
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

router.route('/delete').post(async (req,res) => {
    try {
        await deletePost(req.body.id)
        res.json({msg: 'Post Deleted'})
    } catch (error) {
        console.log(error)
    }
})

router.route('/like/:id').get(async (req,res) => {
    const postID = req.params.id
    const userID = req.user.id
    try {
        const results = await likePost(postID, userID)
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
        const results = await dislikePost(postID, userID)
        res.status(200).json({results})
        return true
    } catch (error) {
        console.log(error)
    }
})

router.route('/reactions-amount/:id').get(async (req,res) => {
    const postID = req.params.id
    try {
        const results = await getPostReactionsAmount(postID)
        res.status(200).json({results})
        return true
    } catch (error) {
        console.log(error)
    }
})

export default router;