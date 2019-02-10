package interfaces

import (
	"main/src/model"
)

// Repository DAL
type Repository interface {
	GetLobby(lobbyID string) (*model.Lobby, error)
}
