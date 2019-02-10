package handler

import (
	"main/src/event"
	"main/src/model"
)

type Handler interface {
	Handle(*model.Lobby)
}

func (event event.LobbyCreatedMessage) Handle(lobby *model.Lobby) error {
	var updatedFields map[string]interface{}

	// if error: json.Unmarshal
}

func buildLobbyAggregate(Handler []handlers) model.Lobby {
	l := model.Lobby
	for _,a :range handlers {
		a.Apply(&l)
	}
}
