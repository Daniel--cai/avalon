import { createContext } from "react";
import { Message } from "../../../shared/contract";

export class EventStore {
  events: any[] = [];
}

export default createContext(new EventStore());
