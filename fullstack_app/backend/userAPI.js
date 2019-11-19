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
    if (req.session.success === true) {
        User.findOne({email: req.session.email}).exec((outer_err, this_user) => {
            console.log("this_user: "+JSON.stringify(this_user))
            User.find().select(
                '_id id username'
                // '-password -email'
            ).exec((err, data) => {
                if (err) return res.json({success: false, error: err});
                return res.json({
                    success: true,
                    data: data,
                    id: this_user.id,
                    _id: this_user._id,
                    username: this_user.username
                });
            })
        });
    }
    else {
        User.find().select('_id id username').exec((err, data) => {
            if (err) return res.json({success: false, error: err});
            return res.json({
                success: true,
                data: data,
            });
        });
    }
    // console.log("req.session: "+JSON.stringify(req.session))
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
    const authentication = new Authentication()
    if(req.session.email)
    {
        const checkEmail = await authentication.checkEmail(req.session.email)
        if (checkEmail === true)
        {
            const user = await authentication.getUser({email: req.session.email})
            req.session.email = ''
            req.session.token = ''
            req.session.success = ''
            req.session.destroy(function(err){ return res.status(404).json({error: "user not found"})})
            user.token = ''
            user.save()
            return res.json(constants.SUCCESS_JSON)
        }
    }
    else return res.json(constants.FAILURE_JSON)

})



router.post('/login', async (req, res) =>
{
    console.log("email body: " + req.body.email)
    var email = undefined;
    var password = undefined;
    let authentication = new Authentication()
    console.log("this is req.session.email" + req.session.email)
    if(!req.session.email || req.session.success !== true)
    {
        email = req.body.email
        password = req.body.password
        const checkEmail = await authentication.checkEmail(email)
        const checkPassword = await authentication.checkPassword(email, password)
        if (checkEmail === false || checkPassword === false)
        {
            console.log("Unsuccessful login")
            return res.status(500).send("Invalid Login, Username or password is incorrect")
            /*
            return res.status(500).send(JSON.stringify
            ({
                success: false,
                email: email,
                name: "invalid",
                id: "invalid"
            })) 
            */
        }
        else 
        {
            console.log("Successful login, heres a token")
            let token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            console.log("token: " + token)
            req.session.email = email
            req.session.token = token
            req.session.success = true
            let user = await authentication.getUser({email: req.session.email})
            req.session._id = user._id
            user.token = token
            user.save()
            return res.send(JSON.stringify({
                    success: true,
                    email: email,
                    name: user.username,
                    id: user._id,
                    token: user.token
                }))
            }
        }
    else
    {
        let user = await authentication.getUser({email: req.session.email})
        if(user.token === req.session.token)
        {
            console.log("Successful login")
            return res.send(JSON.stringify
            ({
                success: true,
                email: email,
                name: user.username,
                id: user._id,
                token: user.token
            }))
        }
        else 
        {
            console.log("Token invalid, Unsuccessful login")
            user.token = ''
            user.save()
            req.session.destroy(function(err){})
            return res.status(500).send("Invalid Login, Username or password is incorrect")

          //  return res.send(JSON.stringify
           // ({
            //    success: false,
             //   email: email,
              //  name: user.username,
               // id: user._id
           // })) 
        }
    }
})




module.exports = router
 
