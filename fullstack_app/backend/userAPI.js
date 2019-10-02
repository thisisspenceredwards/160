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

router.post('/login', async (req, res) =>
{
    console.log('Cookies: ', req.cookies)
    let authentication = new Authentication()
    const { email, password } = req.body
    const checkEmail = await authentication.checkEmail(email)
    const checkPassword = await authentication.checkPassword(email, password)
    let message = "";
    if(checkEmail === false || checkPassword === false) 
    {
        console.log("Unsuccessful login")
        return res
            .status(401)
            .send(JSON.stringify({message: "Unsuccessful login"}))
    }
    else
    {
        const search = {email: email}
        const user = User.findOne(search)
        User.findOne(search, (err, user) => {
            if (err) return res.json({success: false, error: err});
            return res
                // .cookie("test", 1)
                .json({
                    success: true,
                    email: user.email,
                    name: user.username,
                    id: user._id,
            });
        })
    }
})

module.exports = router
