const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()

router.get('/', function(req, res)
{
    res.sendFile(__dirname + '/form.html')
})

router.post('/form', [
    check('name').isLength({ min: 3}),
    check('email').isEmail(),
    check('age').isNumeric()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        console.log("Is empty")
        return res.status(422).json({ errors: errors.array() })
    }
    console.log("within form")
    const name  = req.body.name
    const email = req.body.email
    const age   = req.body.age
})

module.exports = router
