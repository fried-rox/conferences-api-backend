import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "reg_categories",
    Key: {
      regCategoryId: event.pathParameters.id
    },
    UpdateExpression: "SET parTitle = :parTitle, parFirstName = :parFirstName, parMiddleName = :parMiddleName, parLastName = :parLastName, parGender = :parGender, parWork = :parWork, parWorkDepartment = :parWorkDepartment, parWorkStreet = :parWorkStreet, parWorkCity = :parWorkCity, parWorkState = :parWorkState, parWorkCountry = :parWorkCountry, parWorkZIP = :parWorkZIP, workPhoneCode = :workPhoneCode, workPhoneNumber = :workPhoneNumber, parPersonalStreet = :parPersonalStreet, parPersonalCity = :parPersonalCity, parPersonalState = :parPersonalState, parPersonalCountry = :parPersonalCountry, parPersonalZIP = :parPersonalZIP, mobilePhoneNumber = :mobilePhoneNumber, parNotes = :parNotes",
    ExpressionAttributeValues: {
      ":regFullName": data.regFullName ? data.regFullName : null,
      ":regAbbrName": data.regAbbrName ? data.regAbbrName : null,
      ":regCurrency": data.regCurrency ? data.regCurrency : null,
      ":regLanguage": data.regLanguage ? data.regLanguage : null,
      ":addScience": data.addScience ? data.addScience : null,
      ":addTours": data.addTours ? data.addTours : null,
      ":addHotel": data.addHotel ? data.addHotel : null,
      ":addAP": data.addAP ? data.addAP : null,
      ":regFee": data.regFee ? data.regFee : null,
      ":payCash": data.payCash ? data.payCash : null,
      ":payCheque": data.payCheque ? data.payCheque : null,
      ":payCard": data.payCard ?  data.payCard : null,
      ":payGuard": data.payGuard ? data.payGuard : null,
      ":payEFT": data.payEFT ? data.payEFT : null,
      ":regNotes": data.regNotes ? data.regNotes : null,
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
