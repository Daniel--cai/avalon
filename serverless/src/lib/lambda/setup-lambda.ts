import { Handler } from "aws-lambda";
import { SetupCommand } from "../../command";
import * as middy from "middy";
import { httpErrorHandler } from "middy/middlewares";

const setupHandlerFunction: Handler = async (event, context) => {
  try {
    const command = new SetupCommand();
    const { code, player, players } = JSON.parse(event.body);

    await command.submitTeam({
      type: "SubmitTeamCommand",
      code,
      player,
      players
    });

    const ok = {
      statusCode: 200,
      body: JSON.stringify(event.body)
    };
    return ok;
  } catch (ex) {
    console.log("err");
    console.log(ex);
    const error = {
      statusCode: 500,
      body: JSON.stringify(ex)
    };
    return error;
  }
};

export const setupHandler = middy(setupHandlerFunction).use(httpErrorHandler());
