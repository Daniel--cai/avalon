// import * as AWS from "aws-sdk";
// import * as AWS from "serverless-offline";
const API = require("serverless-offline").AWS;
import axios from "axios";
export interface Notification {
  connectionId: string[];
  data: object;
}

export class NotifyService {
  private readonly endpoint: string;
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async publish(message: Notification) {
    for (let connectionId of message.connectionId) {
      console.log(connectionId);
      const url = `http://localhost:3001/@connections/${connectionId}`;
      console.log(message.connectionId);
      try {
        await axios.post(url, message.data);
        console.log("success!");
      } catch (ex) {
        console.log("failed!");
      }
    }

    // const apigwManagementApi = new API.ApiGatewayManagementApi({
    //   apiVersion: "2018-11-29",
    //   endpoint: this.endpoint
    // });
    // await apigwManagementApi
    //   .postToConnection({
    //     ConnectionId: message.connectionId,
    //     Data: JSON.stringify(message.data)
    //   })
    //   .promise();
  }
}
