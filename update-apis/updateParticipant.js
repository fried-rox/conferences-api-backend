import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "c_participants",
    Key: {
      parProfileId: event.requestContext.identity.cognitoIdentityId,
      participantId: event.pathParameters.id
    },
    UpdateExpression: "SET parTitle = :parTitle, parFirstName = :parFirstName, parMiddleName = :parMiddleName, parLastName = :parLastName, parGender = :parGender, parWork = :parWork, parWorkDepartment = :parWorkDepartment, parWorkStreet = :parWorkStreet, parWorkCity = :parWorkCity, parWorkState = :parWorkState, parWorkCountry = :parWorkCountry, parWorkZIP = :parWorkZIP, workPhoneCode = :workPhoneCode, workPhoneNumber = :workPhoneNumber, parPersonalStreet = :parPersonalStreet, parPersonalCity = :parPersonalCity, parPersonalState = :parPersonalState, parPersonalCountry = :parPersonalCountry, parPersonalZIP = :parPersonalZIP, mobilePhoneNumber = :mobilePhoneNumber, parNotes = :parNotes",
    ExpressionAttributeValues: {
      ":parTitle": data.parTitle ? data.parTitle : null,
      ":parFirstName": data.parFirstName ? data.parFirstName : null,
      ":parMiddleName": data.parMiddleName ? data.parMiddleName : null,
      ":parLastName": data.parLastName ? data.parLastName : null,
      ":parGender": data.parGender ? data.parGender : null,
      ":parWork": data.parWork ? data.parWork : null,
      ":parWorkDepartment": data.parWorkDepartment ? data.parWorkDepartment : null,
      ":parWorkStreet": data.parWorkStreet ? data.parWorkStreet : null,
      ":parWorkCity": data.parWorkCity ? data.parWorkCity : null,
      ":parWorkState": data.parWorkState ? data.parWorkState : null,
      ":parWorkCountry": data.parWorkCountry ? data.parWorkCountry : null,
      ":parWorkZIP": data.parWorkZIP ?  data.parWorkZIP : null,
      ":workPhoneCode": data.workPhoneCode ? data.workPhoneCode : null,
      ":workPhoneNumber": data.workPhoneNumber ? data.workPhoneNumber : null,
      ":parPersonalStreet": data.parPersonalStreet ? data.parPersonalStreet : null,
      ":parPersonalCity": data.parPersonalCity ? data.parPersonalCity : null,
      ":parPersonalState": data.parPersonalState ? data.parPersonalState : null,
      ":parPersonalCountry": data.parPersonalCountry ? data.parPersonalCountry : null,
      ":parPersonalZIP": data.parPersonalZIP ?  data.parPersonalZIP : null,
      ":mobilePhoneNumber": data.mobilePhoneNumber ? data.mobilePhoneNumber : null,
      ":parNotes": data.parNotes ? data.parNotes : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
