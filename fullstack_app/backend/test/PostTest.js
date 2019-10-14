var app = require('../server');
var request = require('supertest');
var expect = require('chai').expect;

describe('[Post]', function(){
    
    it('should get all posts within a topic', function(done) {
        this.timeout(5000); // need more time for this testing
        request(app)
        .get('/api/post')
        .send({
            topic: "5d893a60be54da38e9018308"
        })
        .expect(200)
        .end(function(err, resp) {
            expect(resp.body).to.an('array');
            console.log(resp.body)
            done();
        })
    });
    
    var createdPost_id;
    it('should create a new post', function(done) {
        request(app)
        .post('/api/post')
        .send( {
            topicId: "5d893a60be54da38e9018308",
            subject: "fake subject",
            parentPostId: "000000000000000000000000",
            body: "fake body"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type./json/')
        .expect(200)
        .end(function(err, resp) {
            console.log(resp.body)
            expect(resp.body).to.be.an('object');
            var post = resp.body;
            console.log(post._id);
            createdPost_id = post._id;  
            done();
        });
    });

    //var createdPost_id = "5da417e6b9af3246fa0410ee";
    it('should delete the new post', function(done) {
        console.log("createdPost_id="+createdPost_id);
        request(app)
        .delete('/api/post/' + createdPost_id)
            .end(function(err,resp) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(resp);
                    expect(resp.body._id).to.eql(createdPost_id);
                    done();
                }
            });
    })
    
});


