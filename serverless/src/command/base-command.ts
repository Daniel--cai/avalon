import { LobbyRepository } from "../shared/client";
import {
  Notification,
  NotifyService
} from "../lib/notification/notify-service";
import { AWS } from "serverless-offline";

export abstract class Command {
  protected client: LobbyRepository;
  protected notifier: NotifyService;

  constructor() {
    this.client = new LobbyRepository();
    this.notifier = new NotifyService(process.env.LAMBDA_ENDPOINT);
  }
}
