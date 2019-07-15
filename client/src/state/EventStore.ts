import { observable, decorate } from "mobx";
import { createContext } from "react";
import { Message } from "../../../shared/contract";

export class EventStore {
  events: any[] = [];
}

decorate(EventStore, { events: observable });

export default createContext(new EventStore());
