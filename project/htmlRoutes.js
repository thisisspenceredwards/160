const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()

router.get('/', function(req, res)
{
    res.sendFile(__dirname + '/form.html')
})

router.post('/form', [  //trim escape nromalize Email are all sanitizers
    check('name').isLength({ min: 3}).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('age').isNumeric().trim().escape()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        console.log("Is empty")
        return res.status(422).json({ errors: errors.array() })
    }
    console.log("within form")
    const name  = req.sanitize(req.body.name)  //get rid js script i guess?
    const email = req.sanitize(req.body.email) //refine later
    const age   = req.sanitize(req.body.age)
    console.log("name" + name)
    console.log("email" + email)
    console.log("age" + age)
})

module.exports = router
