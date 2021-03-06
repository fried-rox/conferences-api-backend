import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "c_participants",
    Item: {
      parProfileId: event.requestContext.identity.cognitoIdentityId,
      conferenceId: data.conferenceId,
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
