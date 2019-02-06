package main

import (
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
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

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
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
		"message": "Hello Worlsdddsssd",
	})
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		conn.WriteMessage(t, msg)
	}
}

func main() {
	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})
	r.GET("/", homePage)
	r.GET("/articles", allArticles)
	r.Run(":8081")
}
