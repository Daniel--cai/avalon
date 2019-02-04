package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/gin-gonic/gin"
)

type Article struct {
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

type Articles []Article

type Lobby struct {
	LobbyID   string `json:"lobbyid"`
	LobbyName string `json:"lobbyname"`
}

type Request struct {
	ID string `json:"id"`
}

type Response struct {
	Data string `json:"body"`
}

func getClient() string {
	sess, err := session.NewSession(&aws.Config{
		Region:   aws.String("us-west-2"),
		Endpoint: aws.String("http://localhost:8080"),
	})

	// Create DynamoDB client
	svc := dynamodb.New(sess)
	if err != nil && svc != nil {
		return "123"
	}
	return "144"
}

func allArticles(context *gin.Context) {
	articles := Articles{
		Article{Title: "Test Title", Desc: "Test desc", Content: "Hellow word"},
	}

	// sess, err := session.NewSession(&aws.Config{
	// 	Region:   aws.String("us-west-2"),
	// 	Endpoint: aws.String("http://localhost:8080"),
	// })

	// svc := dynamodb.New(sess)

	// getParams := &dynamodb.GetItemInput{
	// 	TableName: aws.String("Lobby"),
	// 	Key: map[string]*dynamodb.AttributeValue{
	// 		"LobbyID": {
	// 			S: aws.String("1"),
	// 		},
	// 	},
	// }

	// getItem, getErr := svc.GetItem(getParams)
	// if getErr != nil {
	// 	panic(getErr)
	// }

	context.JSON(200, articles)
}

func homePage(context *gin.Context) {
	context.JSON(200, gin.H{
		"message": "Hello Worlssd",
	})
}

func main() {
	r := gin.Default()
	r.GET("/", homePage)
	r.GET("/articles", allArticles)
	r.Run(":8081")
}
