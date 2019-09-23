const express = require('express')
const { check, validationResult } = require('express-validator')
const models = require('./data')
const authenticationFile = require('./authenticationClass')
const constants = require('./constants')
const router = express.Router()
const Topic = models.Topic


// POST method
// create a topic 
// @Param topicOrgID : the org ID that the topic belongs
// @Param topicName:  the topic name
// @Output: "success: true/false"
router.post('/topic', [
    check('topicOrgId').isNumeric().withMessage('The topicOrgId has to be number.'),
    check('topicName').isLength({ min:1 }).withMessage('The topicName has to be non-empty.'),
    ], async (req, res) =>
{
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(422).json(errors) // must work on this
    }

    let topic = new Topic()
    const {topicOrgId, topicName} = req.body
    const isDuplicatedTopic = false//TODO: await authentication.checkUsername(username)
    if(isDuplicatedTopic)
        return res.json(DUPLICATED_TOPIC_NAME_JSDON)
    else
    {
        topic.topicOrgId = topicOrgId
        topic.topicName = topicName
        //console.log(topic.topicOrgId)
        //console.log(topic.topicName)
        topic.save((err) =>
         {
            if (err) return res.json(constants.FAIL_JSON)
            else return res.json(constants.SUCCESS_JSON)
         })
     }
 })

// GET method
// get the topic list from the org
// @Param orgID : the org ID that the topic belongs
// Output: the list of topic name
router.post('/topic', async (req, res) =>
{
    // TODO:
})

module.exports = router