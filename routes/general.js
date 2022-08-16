const express = require('express')
const router = express.Router()

router.route('/').get((req,res) => {
    res.render('home')
})
router.route('/forum').get((req,res)=> {
    res.render('forum')
})

module.exports = router