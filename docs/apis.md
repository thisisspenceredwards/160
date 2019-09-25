Endpoints:

* api/organization
* api/user
* api/topic
* api/post

# Organizations

Endpoint: api/organization
Response format: JSON

## Methods
* PUT Create a new organization
* POST Edit an existing organization
* GET Search for one or more organizations
* DELETE Retire an organization

## Parameters

* name: String
* location: String
* address: String
* description: String
* establishedDate: Date

## Examples


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
