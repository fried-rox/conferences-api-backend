import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "reg_contexts",
    Key: {
      regContextId: event.pathParameters.id
    },
    UpdateExpression: "SET regTypeFullName = :regTypeFullName, regTypeAbbrName = :regTypeAbbrName, regTypeCurrency = :regTypeCurrency, regTypeLanguage = :regTypeLanguage, regTypeUsePackage = :regTypeUsePackage, regTypeAddScience = :regTypeAddScience, regTypeAddTours = :regTypeAddTours, regTypeAddAccommodation = :regTypeAddAccommodation, regTypeAddAP = :regTypeAddAP, regTypePaymentMethod = :regTypePaymentMethod, regTypeQuestions = :regTypeQuestions, regTypeNotes = :regTypeNotes, regTypeMailing = :regTypeMailing",
    ExpressionAttributeValues: {
      ":regTypeFullName": data.regTypeFullName ? data.regTypeFullName : null,
      ":regTypeAbbrName": data.regTypeAbbrName ? data.regTypeAbbrName : null,
      ":regTypeCurrency": data.regTypeCurrency ? data.regTypeCurrency : null,
      ":regTypeLanguage": data.regTypeLanguage ? data.regTypeLanguage : null,
      ":regTypeUsePackage": data.regTypeUsePackage ? data.regTypeUsePackage : null,
      ":regTypeAddScience": data.regTypeAddScience ? data.regTypeAddScience : null,
      ":regTypeAddTours": data.regTypeAddTours ? data.regTypeAddTours : null,
      ":regTypeAddAccommodation": data.regTypeAddAccommodation ? data.regTypeAddAccommodation : null,
      ":regTypeAddAP": data.regTypeAddAP ? data.regTypeAddAP : null,
      ":regTypePaymentMethod": data.regTypePaymentMethod ? data.regTypePaymentMethod : null,
      ":regTypeQuestions": data.regTypeQuestions ? data.regTypeQuestions : null,
      ":regTypeNotes": data.regTypeNotes ?  data.regTypeNotes : null,
      ":regTypeMailing": data.regTypeMailing ? data.regTypeMailing : null,
      ":payEFT": data.payEFT ? data.payEFT : null
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
