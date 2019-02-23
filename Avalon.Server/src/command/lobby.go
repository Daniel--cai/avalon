package command

import (
	"fmt"
	"main/src/model"
)

func CreateLobbyCommand(aggregateID string) error {
	handlers, err := events.FetchByAggregateID(aggregateID)

	var lobby model.Lobby
	for _, a := range handlers {
		if err := a.Handle(&lobby); err != nil {
			return fmt.Errorf("building the aggregate: %v", err)
		}
	}

	ev := event.LobbyCreatedMessage()
	if err := ev.Apply(&u); err != nil {
		return fmt.Errorf("applying the new event: %v", err)
	}

	// Emit the new event to be persisted in the Event Store.
	if err := events.Source(ev); err != nil {
		return fmt.Errorf("sourcing the new event: %v", err)
	}

}
