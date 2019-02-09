package interfaces

// Repository DAL
type Repository interface {
	GetLobby(lobbyID string)
}
