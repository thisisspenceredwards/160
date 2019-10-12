const express = require('express')
const { check, validationResult } = require('express-validator')
const models = require('./data')
const authenticationFile = require('./authenticationClass')
const constants = require('./constants')
const router = express.Router()
const Organization = models.Organization

// POST method
// create a Organization 
// @input @Param name : the Organization name
// @input @Param location: location
// @input @Param address:  address
// @input @Param description:  description
// @input @Param domainName:  domain name, eg. "sjsu.edu"
// @Output: an Organization in JSON or "fail"
// example:
// url: http://localhost:3001/api/org/
//{
//    "name": "San Jose State University",
//    "location": "San Jose",
//    "address": "1 frist street, San Jose",
//    "description": "Nice college",
//    "domainName": "sjsu.edu"
//}
// output:
// { establishedDate: '2019-10-11T06:03:33.115Z',
 // _id: '5da01b36243462653dcba3c0',
  // name: 'San Jose State University',
 // location: 'San Jose',
 // address: '1 frist street, San Jose',
 //  description: 'Nice college',
 // domainName: 'sjsu.edu',
 // createdAt: '2019-10-11T06:03:34.971Z',
 // updatedAt: '2019-10-11T06:03:34.971Z',
 // __v: 0 }

router.post('/org', [
    check('name').isLength({ min:1 }).withMessage('The name has to be non-empty.'),
    check('location').isLength({ min:1 }).withMessage('The location has to be non-empty.'),
    check('address').isLength({ min:1 }).withMessage('The address has to be non-empty.'),
    check('description').isLength({ min:1 }).withMessage('The description has to be non-empty.'),
    check('domainName').isLength({ min:1 }).withMessage('The domainName has to be non-empty.'),
    ], async (req, res) =>
{
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(422).json(errors) // must work on this
    }

    let organization = new Organization()
    const {name, location, address, description, domainName } = req.body

    const query = {};
    query.domainName = domainName;    
    //check if a duplicated item based on the domain name
    Organization.findOne( query, '', (err, org) => {
        if (err) {
            return res.send(err);
        } else {
            if(org != null) {
                // find a duplicated domain name, don't save
                //console.log(org);
                return res.json(constants.DUPLICATED_ORG_JSDON);
            } else {
                organization.name = name
                organization.location = location
                organization.address = address
                organization.description = description
                organization.domainName = domainName
                // save it
                organization.save((err) =>
                {
                    if (err) {
                        console.log(err)
                        return res.json(constants.FAIL_JSON)
                    } else {
                        return res.status(200).json(organization)
                    }
                })
            }
        }
    });
 })

// GET method
// get the org list
// @input @Param OrgId : the org ID
// Output: the org info or the list of all org info if OrgId is empty
/*
example
url: http://localhost:3001/api/org
output JSON:
[
    {
        "establishedDate": "2019-09-27T21:37:32.862Z",
        "_id": "5d8e815b6854909ffb0f5755",
        "name": "San Jose State University",
        "location": "San Jose",
        "address": "1 first street, San Jose",
        "description": "Nice college",
        "domainName": "sjsu.edu",
        "createdAt": "2019-09-27T21:38:35.714Z",
        "updatedAt": "2019-09-27T21:38:35.714Z",
        "__v": 0
    },
    {
        "establishedDate": "2019-09-27T21:59:37.438Z",
        "_id": "5d8e86d5ac3936a0e34708af",
        "name": "Santa Clara University",
        "location": "Santa Clara",
        "address": "1 first street, Santa Clara",
        "description": "Nice college",
        "domainName": "scu.edu",
        "createdAt": "2019-09-27T22:01:57.499Z",
        "updatedAt": "2019-09-27T22:01:57.499Z",
        "__v": 0
    }
]
example two
url http://localhost:3001/api/org?orgId=5d8e86d5ac3936a0e34708af
[
    {
        "establishedDate": "2019-09-27T21:59:37.438Z",
        "_id": "5d8e86d5ac3936a0e34708af",
        "name": "Santa Clara University",
        "location": "Santa Clara",
        "address": "1 first street, Santa Clara",
        "description": "Nice college",
        "domainName": "scu.edu",
        "createdAt": "2019-09-27T22:01:57.499Z",
        "updatedAt": "2019-09-27T22:01:57.499Z",
        "__v": 0
    }
]
*/
 router.get('/org', [], async(req, res) =>
{
    const query = {};
    if (req.query.orgId) {
        query._id = req.query.orgId;
    }
    console.log(query._id);
    Organization.find(query, '', (err, org) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json(org);
        }
    });
});

router.delete('/org/:org_id', async(req, res) =>
{
    //console.log("---------step 1----------");
    //console.log(req.params.org_id);
    if (req.params.org_id != null) {
        //console.log("step 2");
        const query = {_id: req.params.org_id}

        Organization.deleteOne(query, (err) => {
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
        return res.send("org_id should not be empty.");
    }
}
);
module.exports = router