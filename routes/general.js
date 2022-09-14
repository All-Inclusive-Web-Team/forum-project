const express = require('express')
const router = express.Router()
const pool = require('../db')

router.route('/').get((req,res) => {
    res.render('home')
})
router.route('/forum').get(async (req,res)=> {
    let data = await pool.query('SELECT * FROM posts')
    const params = {
        rows: data.rows
    }
    res.render('forum', params)
}).post(async(req,res) => {
    const text = `INSERT INTO posts(posted_by, post, date_of_post) VALUES($1, $2, $3)`
    const values = [req.body.posted_by, req.body.post, new Date().toLocaleDateString('en-CA')]
    try {
        let response = await pool.query(text, values)
        res.redirect('/forum')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router