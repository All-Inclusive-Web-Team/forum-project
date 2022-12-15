import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcryptjs'
import {getOneUserByEmail, getOneUserById} from './db.js'
// const LocalStrategy = require('passport-local').Strategy

export const getUser = async (email, byID) => {
    try {
        if (byID === true) {
            const result = await getOneUserById(email)
            return result[0]
        } else {
            const result = await getOneUserByEmail(email)
            return result[0]
        }
    } catch (error) {
        console.log(error)
    }
}

// const users = async (email) => {
//     try {
//         const user = await User.findOne({email})
//         console.log(user)
//         return user
//     } catch (error) {
//         console.log(error)
//     }
// }


function initialize(passport) {
    const authenticateUser = async (email,password,done) => {
        const user = await getUser(email)
        try {
            if (user == null) {
                return done(null, false, {message: 'No user with that email'})
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                done(null, false, {message: 'Password incorrect'})
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email'},
    authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id,done) => {
        const user = await getUser(id, true)
        done(null, user)
    })
}


export default initialize
