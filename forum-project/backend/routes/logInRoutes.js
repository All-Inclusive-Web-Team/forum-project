import express from 'express'
import { createUser } from '../db.js'
import bcrypt from 'bcryptjs'
import initialize from '../passport-config.js'
import passport from 'passport'
const router = express.Router()

initialize(passport)

router.route('/logout').delete(function (req, res, next) {
    req.logout(err => {
        if (err) return next(err)
    })
    res.clearCookie('connect.sid')
    res.json()

});

router.route('/log-in').post(async (req,res,next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) console.log(err)
            if (!user) res.json({success: false, msg: 'No user with those creditentials'})
            else {
                req.logIn(user, err => {
                    if (err) console.log(err)
                    res.json({success: true, msg: 'Successfully logged in'})
                })
            }
        })(req,res,next);
    } catch (error) {
        console.log(error)
    }
})

router.route('/register').post(async (req,res) => {
    const register = {
        email: req.body.userEmail,
        password: null,
        name: req.body.name 
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
        register.password = hashedPassword
        await createUser(register)
        res.status(200).json()
        return true
    } catch (error) {
        res.status(400)
        console.log(error)
    }
})

router.route('/user').get((req,res) => {
    if (req.user) {
        res.send({
            id: req.user.id,
            email: req.user.email,
            name: req.user.name
        })
    } else {
        res.send(false)
    }
})

export default router