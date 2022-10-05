const express = require('express')
const app = express()
const generalRouter = require('./routes/general')

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use('/', generalRouter)

app.get('/', (req, res) => {
    res.send("Hello, world!")
})

const port = process.env.PORT || 3000

const start = async () => {
    try {
        app.listen(port, console.log(`App listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()