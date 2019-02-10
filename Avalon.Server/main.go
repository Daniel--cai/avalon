package main

import (
	"fmt"
	"log"
	"net/http"

	"main/src/model"
	"main/src/repository"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

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
	articles := model.Articles{
		model.Article{Title: "Test Title", Desc: "Test desc", Content: "Hellow word"},
	}

	context.JSON(200, articles)
}

func getLobbies(context *gin.Context) {
	repo, err := repository.LobbyRespository()
	if err != nil {
		panic(err)
	}
	code := context.Param("id")
	if code == "" {
		panic("Id is Null")
	}
	log.Println(code)
	lobby, err := repo.GetLobby(code)
	if err != nil {
		panic(err)
	}
	if lobby == nil {
		context.JSON(404, nil)
	} else {
		context.JSON(200, lobby)
	}

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

func newLobby(context *gin.Context) {
	repo, err := repository.LobbyRespository()
	if err != nil {
		panic(err)
	}

	lobby := model.Lobby{
		ID:      uuid.New().String(),
		Code:    uuid.New().String()[0:4],
		Players: []model.Player{},
	}

	err = repo.CreateLobby(&lobby)
	if err != nil {
		panic(err)
	}

	context.JSON(200, lobby.Code)
}

// func allLobbies(context *gin.Context) {
// 	repo, _ := repository.LobbyRespository()
// 	lobbies := repo.ListLobbies()
// }

func main() {

	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})
	r.GET("/", homePage)
	r.GET("/articles", allArticles)
	r.GET("/lobby/:id", getLobbies)
	r.POST("/lobby", newLobby)
	r.Run(":8081")
}
