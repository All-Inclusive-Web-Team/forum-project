const express = require('express')
const router = express.Router()
const db = require('../db')

router.route('/').get((req,res) => {
    res.render('home')
})
router.route('/posts').get(async (req,res)=> {
    try {
        let posts = await db.getPosts()
        res.render('forum', {posts})
    } catch (error) {
        console.log(error)
    }
}).post(async(req,res) => {
    const values = [req.body.posted_by, req.body.post, new Date().toLocaleDateString('en-CA')]
    try {
        await db.postPost(values)
        res.redirect('/posts')
    } catch (error) {
        console.log(error)
        res.redirect('/posts')
    }
})

module.exports = router