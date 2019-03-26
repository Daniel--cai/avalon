import { observable, decorate } from "mobx";
import { createContext } from "react";

export class EventStore {
  events: any[] = [];
}

decorate(EventStore, { events: observable });

export default createContext(new EventStore());
