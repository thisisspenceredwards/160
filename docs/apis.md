Endpoints:

* api/organization
** PUT Create a new organization
** POST Edit an existing organization
** GET Search for one or more organizations
** DELETE Retire an organization
* api/user
** PUT Create a new user
** POST Edit an existing user
** GET Search for one or more users
** DELETE Retire a user
* api/topic
** PUT Create a new topic
** POST Edit an existing topic
** GET Search for one or more topics
** DELETE Retire a topic

# Organizations

Response format: JSON

## Parameters

name: String  
location: String  
address: String  
description: String  
establishedDate: Date  

## Examples


# Users

Response format: JSON

## Parameters

orgId: Number
username: String
password: String
email: String

## Examples

# Topics

Response format: JSON

## Parameters


## Examples



# Posts

Response format: JSON

## Parameters



## Examples
