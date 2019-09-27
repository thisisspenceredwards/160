const express = require('express')
const { check, validationResult } = require('express-validator')
const models = require('./data')
const authenticationFile = require('./authenticationClass')
const constants = require('./constants')
const router = express.Router()
const Topic = models.Topic

// POST method
// create a topic 
// @input @Param topicOrgID : the org ID that the topic belongs
// @input @Param topicName:  the topic name
// @Output: "success: true/false"
// example:
// url: http://localhost:3001/api/topic/
//{
//    "topicOrgId": "5d893a60be54da38e9018308",
//    "topicName": "Environment"
//}

router.post('/topic', [
    check('topicOrgId').isLength({ min:1 }).withMessage('The topicOrgId has to be non-empty.'),
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
        return res.json(constants.DUPLICATED_TOPIC_NAME_JSDON)
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
// @input @Param topicOrgId : the org ID that the topic belongs
// Output: the list of topic name
/*
example
url: http://localhost:3001/api/topic?topicOrgId=5d893a60be54da38e9018308
output JSON:
[
    {
        "_id": "5d8c4a31a89f325b2309c75c",
        "topicOrgId": "5d893a60be54da38e9018308",
        "topicName": "Environment"
    },
    {
        "_id": "5d8c4a4fa89f325b2309c75e",
        "topicOrgId": "5d893a60be54da38e9018308",
        "topicName": "Tuition Issues"
    }
]
*/
router.get('/topic', [], async(req, res) =>
{
    const { query } = req;
    console.log(query);
    
    if (query.topicOrgId != null) {
        console.log(query.topicOrgId)
        Topic.find( query, '_id topicOrgId topicName', (err, topics) => {
            if (err) {
                return res.send(err);
            } else {
                return res.json(topics)
            }
            });
    } else {
        return res.json(constants.FAIL_JSON)
    }
});
module.exports = router