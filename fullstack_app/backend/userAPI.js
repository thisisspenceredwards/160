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

router.post('/login', async (req, res) =>
{
    let authentication = new Authentication()
    const { username, password } = req.body
    const checkUsername = await authentication.checkUsername(username)
    const checkPassword = await authentication.checkPassword(username, password)
    if(checkUsername === false || checkPassword === false) 
    {
        console.log("Unsuccessful login")
        return res.send("Unsuccessful login")
    }
    else
    {
        console.log("SUCCESS!")
        return res.send("Successful login")
    }
})

module.exports = router






































/*
router.get('/emailInDB', (req, res) =>
{
    console.log("emailInDB")
    const email = req.query.email
    console.log(email)
    User.findOne({"email": email}, function(err, results)
    {
        if(err) return res.json(constants.FAIL_JSON)
        else
        {
            try
            {
                console.log((results.toObject()))
                const ob = results.toObject()
                if(ob.email === email) return res.json(constants.SUCCESS_JSON)
                else return res.json(constants.FAIL_JSON)
            }
            catch
            {
                return res.json(constants.FAIL_JSON)
            }
        }
    })
})

router.get('/userInDB', (req, res) =>
{
    console.log("doesUsernameExist")
    const username = req.query.username
    console.log("username is: " + username)
    User.findOne({"username": username}, function(err, results)
    {
        if(err) return res.json(constants.FAIL_JSON)
        else
        {
            try
            {
                console.log((results.toObject()))
                const ob = results.toObject()
                if(ob.username === username) return res.json(constants.SUCCESS_JSON)
                else return res.json(constants.FAIL_JSON)
            }
            catch
            {
                return res.json(constants.FAIL_JSON)
            }
        }
    })
})
*/

/*
// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  //console.log("backend")
  const { id } = req.body;
  Data.findByIdAndRemove( id, (err) => {
    if (err)
    {
       // console.log("data not here" + id);
        return res.send(err);
    }
    else
    {
       // console.log("data success: " + id);
        return res.json({ success: true });
    }
  });
});
*/


// this is our get method
// this method fetches all available data in our database
/*
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

*/


