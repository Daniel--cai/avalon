import * as AWS from "aws-sdk";

const sns = new AWS.SNS();

export const publishEvent = (params: { topicArn: string; message: any }) =>
  sns
    .publish({
      Message: JSON.stringify(params.message),
      TopicArn: params.topicArn
    })
    .promise();
