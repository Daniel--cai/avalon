import { Handler } from "aws-lambda";
import { MissionCommand } from "../../command";
import * as middy from "middy";
import { httpErrorHandler } from "middy/middlewares";

const missionHandlerFunction: Handler = async (event, context) => {
  try {
    const command = new MissionCommand();
    const { code, player, success } = JSON.parse(event.body);

    await command.submitMission({
      type: "SubmitMissionCommand",
      code,
      player,
      success
    });

    const ok = {
      statusCode: 200,
      body: JSON.stringify(event.body)
    };
    return ok;
  } catch (ex) {
    console.log(ex);
    const error = {
      statusCode: 500,
      body: JSON.stringify(ex)
    };
    return error;
  }
};

export const missionHandler = middy(missionHandlerFunction).use(
  httpErrorHandler()
);
