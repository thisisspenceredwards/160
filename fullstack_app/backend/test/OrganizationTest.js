var app = require('../server');
var request = require('supertest');
var expect = require('chai').expect;

describe('[Organization]', function(){
    
    it('should get all organizations', function(done) {
        this.timeout(5000); // need more time for this testing
        request(app)
        .get('/api/org')
        .expect(200)
        .end(function(err, resp) {
            expect(resp.body).to.an('array');
            //console.log(resp.body)
            done();
        })
    });

    var createdOrg_id;
    it('should create a organization', function(done) {
        request(app)
        .post('/api/org')
        .send( {
            name: "Santa Clara University4",
            location: "Santa Clara",
            address: "1 first street, Santa Clara",
            description: "Nice college",
            domainName: "scu-fake2.edu"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type./json/')
        .expect(200)
        .end(function(err, resp) {
            expect(resp.body).to.be.an('object');
            var org = resp.body;
            expect(org.name).to.be.contain('Santa Clara University4');
            createdOrg_id = org._id;  
            done();
        })
    });

    it('should delete the organization', function(done) {
        console.log("createdOrg_id="+createdOrg_id);
        request(app)
        .delete('/api/org/' + createdOrg_id)
            .end(function(err,resp) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(resp);
                    expect(resp.body._id).to.eql(createdOrg_id);
                    done();
                }
            });
    })
});


