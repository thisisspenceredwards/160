const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')
const constants = require('./constants')

const models = require('./data')
const Post = models.Post

router.put('/post', (req, res) =>
{
    let post = new Post()
    const {
        topicId,
        subject,
        parentPostId,
        body
    } = req.body
    console.log("topicId: "+topicId);
    console.log("subject: "+subject);
    console.log("parentPostId: "+parentPostId);
    console.log("body: "+body);
    post.topicId = topicId;
    post.subject = subject;
    post.parentPostId = parentPostId;
    post.body = body;
    post.save((err) => {
        if (err) {
            console.log(err)
            return res.status(400).json(constants.FAIL_JSON)
        }
        else return res.json(constants.SUCCESS_JSON)
    })
})

module.exports = router
