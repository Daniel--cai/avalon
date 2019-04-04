package model

// Lobby : response body
// type Lobby struct {
// 	Data string `json:"body"`
// }

// Lobby : response body
type Lobby struct {
	ID      string   `json:"id"`
	Code    string   `json:"code"`
	Players []Player `json:"players"`
}
