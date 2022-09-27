# Room-API
A Basic API for node.js Deployed on AWS lambda function using a Dynamodb for persistence. 
Supported Request 
POST 
    -If no request body is provided a list of all existing rooms will be returned 
    -if the body contains a key for id and occupant than the occupant value of the room with the given id is updated 
PUT 
    -The user must provide in the request body a value for the keys occupant, name, and number. This will create a room with the given values and return the id        
    of the room created. The id is a uuid. 
DELETE 
   -The user must provide in the request body a value for the id key. This will delete the room with the given key.

A test version of the API is available from the following endpoint: https://jgnbdjisrk.execute-api.us-west-2.amazonaws.com/Prod
