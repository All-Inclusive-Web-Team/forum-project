const express = require('express')
const app = express()
const generalRouter = require('./routes/general')

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.use('/', generalRouter)

const port = process.env.PORT || 3000

app.listen(port, console.log(`app listening on port ${port}`))