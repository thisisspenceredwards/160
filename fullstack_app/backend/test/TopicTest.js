var app = require('../server');
var request = require('supertest');
var expect = require('chai').expect;

describe('[Topic]', function(){
    it('should get all topic in an organization', function(done) {
        this.timeout(5000); // need more time for this testing
        request(app)
        .get('/api/topic?topicOrgId=5d893a60be54da38e9018308')
        .expect(200)
        .end(function(err, resp) {
            expect(resp.body).to.an('array');
            //console.log(resp.body)
            done();
        })
    });
    
    var createdTopic_id;
    it('should create a new topic', function(done) {
        request(app)
        .post('/api/topic')
        .send( {
            topicOrgId: "5d893a60be54da38e9018308",
            topicName: "fake Topic",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type./json/')
        .expect(200)
        .end(function(err, resp) {
            //console.log(resp.body)
            expect(resp.body).to.be.an('object');
            var topic = resp.body;
            //console.log(topic._id);
            createdTopic_id = topic._id;  
            done();
        })
    });

    it('should delete the new topic', function(done) {
        console.log("createdTopic_id="+createdTopic_id);
        request(app)
        .delete('/api/topic/' + createdTopic_id)
            .end(function(err,resp) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(resp);
                    expect(resp.body._id).to.eql(createdTopic_id);
                    done();
                }
            });
    })
});


