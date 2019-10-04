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
    // console.log("topicId: "+topicId);
    // console.log("subject: "+subject);
    // console.log("parentPostId: "+parentPostId);
    // console.log("body: "+body);
    post.topicId = topicId;
    post.subject = subject;
    post.parentPostId = parentPostId;
    post.body = body;
    post.save((err) => {
        if (err) {
            console.log(err)
            return res.status(400).json(constants.FAIL_JSON)
        }
        else return res.json(post)
    });
    // console.log(`post._id: ${post._id}`);
})

router.get('/post', (req, res) =>
{
    topicId = req.query['topicId'];
    subject = req.query['subject'];
    parentPostId = req.query['parentPostId'];
    body = req.query['body'];
    createdAt = req.query['createdAt'];
    updatedAt = req.query['updatedAt'];
    console.log(`updatedAt: ${updatedAt}`)

    var search = {};
    if (topicId)
        search['topicId'] = topicId;
    if (subject)
        search['subject'] = new RegExp(`${subject}`);
    if (parentPostId)
        search['parentPostId'] = parentPostId;
    if (body)
        search['body'] = new RegExp(`${body}`)
    if (createdAt)
        search['createdAt'] = createdAt;
    if (updatedAt)
        search['updatedAt'] = updatedAt;

    Post.find(search).exec(
        function(err, posts) {
            if (err) res.send(err)
            res.json(posts)
        }
    )

})

module.exports = router
