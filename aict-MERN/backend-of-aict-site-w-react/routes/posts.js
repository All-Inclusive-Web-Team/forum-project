import express from 'express'
import {getPosts, postPost} from '../db.js'
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
    const values = [req.body.posted_by, req.body.post, new Date().toLocaleDateString('en-CA')]
    try {
        await postPost(values)
        // res.status(200).json({msg: 'success'})
        res.redirect('back')
    } catch (error) {
        res.status(404).json({msg: 'FAILED'})
        console.log(error)
    }
})

export default router;