package repository

import (
	"log"
	"main/src/model"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type DynamoDBRespository struct {
	conn *dynamodb.DynamoDB
}

// LobbyRespository create a new object of interfaces.Repository
func LobbyRespository() (*DynamoDBRespository, error) {
	conn := dynamodb.New(session.New(),
		aws.NewConfig().WithRegion("us-east-1").WithEndpoint("http://192.168.99.100:8000"))

	return &DynamoDBRespository{conn}, nil
}

func (r *DynamoDBRespository) GetLobby(lobbyID string) (*model.Lobby, error) {

	queryParams := &dynamodb.QueryInput{
		TableName: aws.String("Lobby"),
		IndexName: aws.String("code"),
		KeyConditions: map[string]*dynamodb.Condition{
			"code": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(lobbyID),
					},
				},
			},
		},
	}

	result, err := r.conn.Query(queryParams)

	if err != nil {
		return nil, err
	}

	lobby := &model.Lobby{}
	if len(result.Items) == 0 {
		return nil, nil
	}
	err = dynamodbattribute.UnmarshalMap(result.Items[0], lobby)

	if err != nil {
		return nil, err
	}

	return lobby, nil
}

func (r *DynamoDBRespository) CreateLobby(lobby *model.Lobby) error {
	log.Println(lobby)
	av, err := dynamodbattribute.MarshalMap(lobby)

	if err != nil {
		return err
	}

	log.Println(av)
	// av.players = []model.Player{}
	putItemInput := &dynamodb.PutItemInput{
		TableName: aws.String("Lobby"),
		Item:      av,
	}

	_, err = r.conn.PutItem(putItemInput)

	if err != nil {
		return err
	}

	return nil
}

// func (r *DynamoDBRespository) ListLobby() (*[]model.Lobby, error) {

// 	scanInput := &dynamodb.ScanInput{
// 		TableName: aws.String("Lobby"),
// 	}

// 	result, err := r.conn.Scan(scanInput)

// 	if err != nil {
// 		return nil, err
// 	}

// 	list := &[]model.Lobby{}
// 	err = dynamodbattribute.UnmarshalMap(result.Items, list)

// 	if err != nil {
// 		return nil, err
// 	}
// 	return list, nil
// }
