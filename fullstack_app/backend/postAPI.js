const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')
const constants = require('./constants')

const models = require('./data')
const Post = models.Post

router.put('/post', (req, res) =>
{
    console.log(`req.session: ${JSON.stringify(req.session)}`)
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
    post.userID = req.session._id;
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
    if (!req.session.success) {
        res.status(401).send({error: "not logged in"})
        return;
    }
    topicId = req.query['topicId'];
    subject = req.query['subject'];
    parentPostId = req.query['parentPostId'];
    body = req.query['body'];
    createdAt = req.query['createdAt'];
    updatedAt = req.query['updatedAt'];
    userID = req.query['userID'];
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
    if (userID)
        search['userID'] = userID;

    Post.find(search).exec(
        function(err, posts) {
            if (err) res.send(err)
            res.json(posts)
        }
    )
})

router.delete('/post/:post_id', async(req, res) =>
{
    //console.log("---------step 1----------");
    //console.log(req.params.post_id);
    if (req.params.post_id != null) {
        //console.log("step 2");
        const query = {_id: req.params.post_id}

        Post.deleteOne(query, (err) => {
            if (err) {
                //console.log("step 3");
                return res.send(err);
            } else {
                //console.log("step 4");
                return res.status(200).json(query);
            }
        });
    } else {
        //console.log("step 5");
        return res.send("post_id should not be empty.");
    }
});
module.exports = router
