// import uuid from "uuid";

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "c-participants",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      participantId: event.requestContext.identity.cognitoIdentityId,
      //conferenceId: uuid.v1(),
      parTitle: data.parTitle,
      parFirstName: data.parFIrstName,
      parMiddleName: data.parMiddleName,
      parLastName: data.parLastName,
      parSuffix: data.parSuffix,
      parGender: data.parGender,
      parWork: data.parWork,
      parWorkDepartment: data.parWorkDepartment,
      parWorkAddress: {
        workStreet: data.workStreet,
        workCity: data.workCity,
        workState: data.workState,
        workCountry: data.workCountry,
        workZIP: data.workZIP
      },
      workPhoneCode: data.workPhoneCode,
      workPhoneNumber: data.workPhoneNumber,
      parPersonalAddress: {
        personalStreet: data.personalStreet,
        personalCity: data.personalCity,
        personalState: data.personalState,
        personalCountry: data.personalCountry,
        personalZIP: data.personalZIP
      },
      mobilePhoneCode: data.mobilePhoneCode,
      mobilePhoneNumber: data.mobilePhoneNumber,
      parNotes: data.parNotes,
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
