import uuid from "uuid";

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "t_conferences",
    Item: {
      conferenceId: uuid.v1(),
      confTitle: data.confTitle,
      confAbbr: data.confAbbr,
      projectManager: data.projectManager,
      accountClient: data.accountClient,
      confVenue: data.confVenue,
      confGraphic: data.confGraphic,
      confStartDate: data.confStartDate,
      confEndDate: data.confEndDate,
      regAccess: data.regAccess,
      regEarlyStart: data.regEarlyStart,
      regNormalStart: data.regNormalStart,
      regNormalEnd: data.regNormalEnd,
      confLanguage: data.confLanguage,
      confCurrency: data.confCurrency,
      confExRate: data.confExRate,
      notes: data.notes,
      creatorId: event.requestContext.identity.cognitoIdentityId,
      createdAt: new Date().getTime()
    }
  };

    try {
      await dynamoDbLib.call("put", params);
      callback(null, success(params.Item));
    } catch (e) {
      console.log(e);
      callback(null, failure({ status: false }));
    }
  }
