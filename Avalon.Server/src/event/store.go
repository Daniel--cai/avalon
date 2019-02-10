package event

type EventStore interface {
	OnLobbyClose()
	OnLobbyCreated(f func(LobbyCreatedMessage)) error
}

var imp EventStore

func SetEventStore(es EventStore) {
	impl = es
}

func OnLobbyClose() {
	impl.OnLobbyClose()
}

func OnLobbyCreated(f func(LobbyCreatedMessage)) error {
	return impl.OnLobbyCreated(f)
}
