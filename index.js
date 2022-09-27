const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context) => 
    {
        let responseBody= null;
        let body = JSON.parse(event.body);
        if(event.httpMethod == "POST")
            {
                if(body.hasOwnProperty("id"))
                    {
                       
                        let params = 
                            {
                                TableName:'Room-Database',
                                UpdateExpression: "set occupant = :occupant",
                                ExpressionAttributeValues: 
                                    {
                                    ":occupant": body.occupant,
                                    
                                    },
                                Key:{
                                        'id': body.id
                                    }
                            };
                        
                        await dynamodb.update(params).promise();
                        responseBody = 
                            {
                                statusCode: 200,
                                id: event.id
                            };
                    }
                else
                    {
                       let params = 
                            {
                                TableName:'Room-Database'
                            };
                    
                        let scanResults = await dynamodb.scan(params).promise();
                        
                        responseBody = 
                            {
                                statusCode: 200,
                                rooms: JSON.stringify(scanResults)
                            };
                    }
                
            }
        else if(event.httpMethod == "PUT")
            {
                let id = AWS.util.uuid.v4();
                let params = 
                    {
                        TableName:'Room-Database',
                        Item: 
                            {
                                'id': id,
                                'name': body.name,
                                'number': body.number,
                                'occupant': body.occupant
                            }
                    };
                await dynamodb.put(params).promise();
                responseBody = 
                    {
                        statusCode: 200,
                        id
                    };
            }
        else if(body.id !== null && event.httpMethod == "DELETE")
            {
                let params =
                    {
                        TableName: "Room-Database",
                        Key:  {
                                    'id': body.id
                                }
                    };
                await dynamodb.delete(params).promise();
                responseBody = 
                            {
                                statusCode: 200
                            };
            }
        else 
            {
                responseBody = 
                            {
                                statusCode: 500,
                                erorr: "Invalid request"
                            };
            }
        
        const response = 
        {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify(responseBody),
            "isBase64Encoded": false
        };
        return response;
    };
