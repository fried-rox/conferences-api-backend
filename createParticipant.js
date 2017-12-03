import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "c_participants",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      parProfileId: event.requestContext.identity.cognitoIdentityId,
      // participantId: uuid.v1(),
      participantId: data.participantId,
      parTitle: data.parTitle,
      parFirstName: data.parFirstName,
      parMiddleName: data.parMiddleName,
      parLastName: data.parLastName,
      parGender: data.parGender,
      parWork: data.parWork,
      parWorkDepartment: data.parWorkDepartment,
      parWorkStreet: data.parWorkStreet,
      parWorkCity: data.parWorkCity,
      parWorkState: data.parWorkState,
      parWorkCountry: data.parWorkCountry,
      parWorkZIP: data.parWorkZIP,
      workPhoneCode: data.workPhoneCode,
      workPhoneNumber: data.workPhoneNumber,
      parPersonalStreet: data.parPersonalStreet,
      parPersonalCity: data.parPersonalCity,
      parPersonalState: data.parPersonalState,
      parPersonalCountry: data.parPersonalCountry,
      parPersonalZIP: data.parPersonalZIP,
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
