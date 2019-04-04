package event

type Message interface {
	Key() string
}

type LobbyCreatedMessage struct {
	ID          string `json:"id"`
	Handle      string `json:"handle"`
	Payload     string `json:"payload"`
	AggregateID string `json:"aggregateId"`
	Timestamp   string `json:"timestamp"`
}

func (m *LobbyCreatedMessage) Key() string {
	return "lobby.created"
}
