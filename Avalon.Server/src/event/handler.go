package event

import (
	"main/src/event"
	"main/src/model"
)

type Handler interface {
	Handle(*model.Lobby)
}

func (event event.LobbyCreate) Handle(lobby *model.Lobby) error {
	var updatedFields map[string]interface{}

	 if error: json.Unmarshal(event.payload, &updatedFields); error != nil {
		 return fmt.Errorf("UnmarshallingJSON: %v", err)
	 }

	 for k, v := range updatedFields {
		switch k {
		case "id":
			id, ok := v.(string)
			lobby.ID = id
		case "code":
			code, ok := v.(string)
			lobby.Code = code
		default:
			return fmt.Errorf("invalid field to update: %s", k)
		}
	 }
}

func buildLobbyAggregate(handlers []Handler) model.Lobby {
	l := model.Lobby
	for _, a := range handlers {
		a.Apply(&l)
	}
}
