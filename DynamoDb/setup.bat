
SET url=http://192.168.99.116:31963

# Create a table.
aws dynamodb --endpoint-url %url% --region us-east-1 create-table --table-name Lobby --attribute-definitions AttributeName=name,AttributeType=S --key-schema AttributeName=name,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1

# Add a record.
aws dynamodb --endpoint-url %url% --region us-east-1 put-item --table-name Lobby --item '{"name": {"S": "The Monarch"} }'


echo "Created data files at '$DATADIR'..."