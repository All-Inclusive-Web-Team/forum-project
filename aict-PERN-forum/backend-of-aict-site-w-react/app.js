import express from 'express'
const app = express()
import router from './routes/posts.js'
import logInRouter from './routes/logInRoutes.js'
import cors from 'cors';
import passport from 'passport'
import session from 'express-session'
import flash from 'express-flash'

app.use(flash())
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.session())
app.use(passport.initialize())

const corsOptions = {
  // origin: (origin, callback) => {
  //   callback(null, true);
  // },
  origin: "http://localhost:3000",
  // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  // allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
};

// app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)
app.use('/', logInRouter)

const port = process.env.PORT || 3001
app.listen(port,() => console.log(`App listening on port ${port}`))