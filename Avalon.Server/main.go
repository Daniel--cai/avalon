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

type Lobby struct {
	LobbyID   string `json:"lobbyid"`
	LobbyName string `json:"lobbyname"`
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func homePage(context *gin.Context) {
	context.JSON(200, gin.H{
		"message": "Hello Worlsdddsssd",
	})
}

func allArticles(context *gin.Context) {
	articles := Articles{
		Article{Title: "Test Title", Desc: "Test desc", Content: "Hellow word"},
	}

	context.JSON(200, articles)
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

	var db = dynamodb.New(session.New(),
		aws.NewConfig().WithRegion("us-east-1").WithEndpoint("http://localhost:8000"))


	_repository.NewDynamd

	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})
	r.GET("/", homePage)
	r.GET("/articles", allArticles)
	r.Run(":8081")
}
