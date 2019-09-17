const express = require('express')
const models = require('./data')
const constants = require('./constants')
const router = express.Router()
const Data = models.Data
const User = models.User

router.put('/putUser', (req, res) =>
{
    let user = new User()
    console.log(req.body)
    const { id, username, password, email } = req.body
    user.id = id
    user.username = username
    userpassword = password
    user.email = email
    user.save((err) => {
    if (err) return res.json(constants.FAIL_JSON)
    return res.json(constants.SUCCESS_JSON)
    })
})

router.get('/getUser', (req, res) =>
{
    Data.find((err, data) => {
    if(err) return res.json(constants.FAIL_JSON)
    else return res.json(constants.SUCCESS_JSON, { data: data })
    })
})

module.exports = router

/*

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

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

