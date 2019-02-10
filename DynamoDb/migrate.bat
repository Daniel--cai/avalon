
SET url=http://192.168.99.100:8000

aws dynamodb --endpoint-url %url% --region us-east-1 create-table  --cli-input-json file://DynamoDB/migration/event.json 

aws dynamodb --endpoint-url %url% --region us-east-1 create-table  --cli-input-json file://DynamoDB/migration/lobby.json 

aws dynamodb --endpoint-url %url% --region us-east-1 put-item --cli-input-json file://DynamoDB/migration/lobbydata.json 
