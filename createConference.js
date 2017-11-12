import uuid from "uuid";

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "t-conferences",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      confListId: event.requestContext.identity.cognitoIdentityId,
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
