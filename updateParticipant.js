import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "c-participants",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      participantId: event.requestContext.identity.cognitoIdentityId,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET parTitle = :parTitle, parFirstName = :parFirstName, parMiddleName = :parMiddleName, parLastName = :parLastName, parSuffix = :parSuffix, parGender = :parGender, parWork = :parWork, parWorkDepartment = :parWorkDepartment, workStreet  = :workStreet, workCity  = :workCity, workState  = :workState, workCountry  = :workCountry, workZIP  = :workZIP, workPhoneCode = :workPhoneCode, workPhoneNumber = :workPhoneNumber, personalStreet  = :personalStreet, personalCity  = :personalCity, personalState  = :personalState, personalCountry  = :personalCountry, personalZIP  = :personalZIP, mobilePhoneCode= :mobilePhoneCode, mobilePhoneNumber= :mobilePhoneNumber, parNotes= :parNotes",
    ExpressionAttributeValues: {
      ":parTitle": data.parTitle ? data.parTitle : null,
      ":parFirstName": data.parFirstName ? data.parFirstName : null,
      ":parMiddleName": data.parMiddleName ? data.parMiddleName : null,
      ":parLastName": data.parLastName ? data.parLastName : null,
      ":parSuffix": data.parSuffix ? data.parSuffix : null,
      ":parGender": data.parGender ? data.parGender : null,
      ":parWork": data.parWork ? data.parWork : null,
      ":parWorkDepartment": data.parWorkDepartment ? data.parWorkDepartment : null,
      ":parWorkAddress": {
        ":workStreet": data.workStreet ? data.workStreet : null,
        ":workCity": data.workCity ? data.workCity : null,
        ":workState": data.workState ? data.workState : null,
        ":workCountry": data.workCountry ? data.workCountry : null,
        ":workZIP": data.workZIP ?  data.workZIP : null
      },
      ":workPhoneCode": data.workPhoneCode ? data.workPhoneCode : null,
      ":workPhoneNumber": data.workPhoneNumber ? data.workPhoneNumber : null,
      ":parPersonalAddress": {
        ":personalStreet": data.personalStreet ? data.personalStreet : null,
        ":personalCity": data.personalCity ? data.personalCity : null,
        ":personalState": data.personalState ? data.personalState : null,
        ":personalCountry": data.personalCountry ? data.personalCountry : null,
        ":personalZIP": data.personalZIP ?  data.personalZIP : null
      },
      ":mobilePhoneCode": data.mobilePhoneCode ? data.mobilePhoneCode : null,
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
