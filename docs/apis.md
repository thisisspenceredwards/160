Endpoints:

* api/organization
* api/user
* api/topic
* api/post

# Organizations

Endpoint: api/organization
Response format: JSON

## Methods
* POST Create a new organization [Frank]
* POST Edit an existing organization
* GET Search for one or more organizations [Frank]
* DELETE Retire an organization

## Parameters
* name: String
* location: String
* address: String
* description: String
* domainName: String, // org domain name, eg. "sjsu.edu"
* establishedDate: Date

## Examples
* POST Create a new organization
```
POST method
create a Organization
@input @Param name : the Organization name
@input @Param location: location
@input @Param address:  address
@input @Param description:  description
@input @Param domainName:  domain name, eg. "sjsu.edu"
@Output: "success: true/false"
example:
url: http://localhost:3001/api/org/
{
    "name": "San Jose State University",
    "location": "San Jose",
    "address": "1 frist street, San Jose",
    "description": "Nice college",
    "domainName": "sjsu.edu"
}
```

* GET Search for one or more organizations

    GET method
    get the org list
    @input @Param OrgId : the org ID
    Output: the org info or the list of all org info if OrgId is empty

example -- get all org info
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

example two -- get one org info given by orgId
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

# Users

Endpoint: api/user
Response format: JSON

## Methods
* PUT Create a new user
* POST Edit an existing user
* GET Search for one or more users
* DELETE Retire a user


## Parameters

* orgId: Number
* username: String
* password: String
* email: String


## Examples

GET: Get information for a given user by username. This will return the orgId and username. Example:

http://localhost:3000/api/user?username=asdf

    {
        "orgId": 1,
        "username": "asdf"
    }


# Topics

Endpoint: api/topic
Response format: JSON

## Methods
* PUT Create a new topic
* POST Edit an existing topic
* GET Search for one or more topics
* DELETE Retire a topic

## Parameters
* id: Number
* topicOrgId: Number
* topicName: String


## Examples



# Posts

Endpoint: api/post
Response format: JSON

## Methods
* PUT Create a new post
* POST Edit an existing post
* GET Search for one or more posts
* DELETE Retire a post

## Parameters
* id: Number
* topicId: Number
* userId: Number
* subject: String
* body: String



## Examples
