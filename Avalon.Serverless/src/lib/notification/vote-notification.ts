import { Handler } from "aws-lambda";

export const voteNotification: Handler = async (event, context) => {
  const ok = {
    statusCode: 200,
    body: JSON.stringify("Ok")
  };
  return ok;
};
