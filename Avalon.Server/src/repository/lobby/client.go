package client

import (
	"/src/repository/repository/interfaces"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

// Lobby : response body
type Lobby struct {
	Data string `json:"body"`
}

type dynamoDBRespository struct {
	Conn *dynamodb.DynamoDB
}

// DynamoDBRespository create a new object of interfaces.Repository
func DynamoDBRespository(Conn *dynamodb.DynamoDB) interfaces.Repository {
	return &dynamoDBRespository{Conn}
}

func (r *dynamoDBRespository) getItem(lobbyID string) (*Lobby, error) {

	getParams := &dynamodb.GetItemInput{
		TableName: aws.String("Lobby"),
		Key: map[string]*dynamodb.AttributeValue{
			"LobbyID": {
				S: aws.String(lobbyID),
			},
		},
	}

	result, err := r.Conn.GetItem(getParams)

	if err != nil {
		return nil, err
	}
	if result.Item == nil {
		return nil, nil
	}

	lobby := new(Lobby)
	err = dynamodbattribute.UnmarshalMap(result.Item, lobby)

	if err != nil {
		return nil, err
	}

	return lobby, nil
}
