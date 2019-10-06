const express = require('express')
const { check, validationResult } = require('express-validator')
const models = require('./data')
const authenticationFile = require('./authenticationClass')
const constants = require('./constants')
const router = express.Router()
const Data = models.Data
const User = models.User
const Authentication = authenticationFile.Authentication





router.put('/putUser', [
    check('username').isLength({ min:3 }).withMessage('Name must have more than 3 characters'),
    check('email').isEmail().normalizeEmail().withMessage('Email is not valid'),
    check('password').isLength({min: 5}).withMessage('Password must be more than 5 characters long')
    ], async (req, res) =>
{
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(422).json(errors) // must work on this
    }
    let user = new User()
    let authentication = new Authentication() //This may be unnecessary im not sure
                                             // make multiple authentication objects
                                             // to handle concurrent authentications? 
    const { id, username, password, email } = req.body
    const checkUsername = await authentication.checkUsername(username)
    const checkEmail = await authentication.checkEmail(email)
    if(checkUsername || checkEmail === true)
        return res.json(constants.BAD_USERNAME_JSON +" or "+ constants.BAD_EMAIL_JSON)
    else
    {
        user.id = id
        user.username = username
        user.password = authentication.hashPassword(password)
        user.email = email
        user.token = ''
        user.save((err) =>
         {
            if (err) return res.json(constants.FAIL_JSON)
            else return res.json(constants.SUCCESS_JSON)
         })
     }
 })

router.get('/user', (req, res) => {
    User.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    })
})


// try this python code:
// keep visiting http://localhost:3001/api/session over and over
router.get('/session', async (req, res) =>
{
    if (req.session.visits) {
        req.session.visits++
        console.log("visits: "+req.session.visits)
        res.end("visits: "+req.session.visits)
        return
    }
    else {
        req.session.visits = 1;
        console.log("first visit!");
        res.end('first visit')
        return
    }
})

router.post('/logout', async (req, res) =>
{
    if(req.session == null)
    {
          return res.send(
           JSON.stringify(
           {
               success: false,
               email: email,
               name: user.username,
               id: user._id
            }))
    }
    var email = null
    const authentication = new Authentication()
    const search = {email: (req.session.email ? req.sesssion: email)}
    if(search === null) 
    {
        return res.send(
               JSON.stringify(
               {
                   success: false,
                   email: email,
                   name: user.username,
                   id: user._id
               }))
    }
    else
    {
        const user = await authentication.getUser(search)
        delete req.SessionID
        return res.send(
               JSON.stringify(
               {
                   success: false,
                   email: email,
                   name: user.username,
                   id: user._id
               }))
    }

})

router.post('/login', async (req, res) =>
{
    console.log("req.session.success: " + req.session.success)
    var email = null;
    var password = null;
    let authentication = new Authentication()
    let user = await authentication.getUser({email: req.session.email})
    console.log("req.session.token: " + req.session.token)
    if(!req.session.email || !req.session.token || req.session.success !== true)
    {
        email = req.body.email
        password = req.body.password
        const checkEmail = await authentication.checkEmail(email)
        const checkPassword = await authentication.checkPassword(email, password)
        if (checkEmail === false || checkPassword === false)
        {
            console.log("Unsuccessful login")
            return res.status(401).json(constants.FAIL_JSON)
        }
        else 
        {
            let token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            console.log("token: " + token)
            req.session.email = email
            req.session.token = token
            req.session.success = true
            user.token = token
            user.save()
            return res.send(JSON.stringify({
                    success: true,
                    email: email,
                    name: user.username,
                    id: user._id
                }))
            }
        }
    if(user.token === req.session.token)
    {
        console.log("HERE")
        return res.send(JSON.stringify({
                success: true,
                email: email,
                name: user.username,
                id: user._id
            }))
    }
    else 
    {
        console.log("uh oh!!!")
        await authentication.updateToken(email, '')
        req.session.success = false
        req.session.token = ''
        return res.send(JSON.stringify({
            success: false,
            email: email,
            name: user.username,
            id: user._id
        }))
    }
})




module.exports = router
 
