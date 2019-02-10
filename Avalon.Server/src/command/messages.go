package command

import "time"

const (
	//KindLobbyCreated Id
	KindLobbyCreated = iota + 1
)

// LobbyCreatedMessage struct
type LobbyCreatedMessage struct {
	Kind      uint32    `json:"kind"`
	ID        string    `json:"id"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
}

func newLobbyCreatedMessage(id string, body string) *LobbyCreatedMessage {
	return &LobbyCreatedMessage{
		Kind:      KindLobbyCreated,
		ID:        id,
		Body:      body,
		CreatedAt: time.Now(),
	}
}
