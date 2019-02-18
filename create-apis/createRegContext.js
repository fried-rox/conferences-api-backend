import uuid from "uuid";

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "reg_contexts",
    Item: {
      what : uuid.v1(),
      conferenceId: data.conferenceId,
      regTypeFullName: data.regTypeFullName,
      regTypeAbbrName: data.regTypeAbbrName,
      regTypeCurrency: data.regTypeCurrency,
      regTypeLanguage: data.regTypeLanguage,
      regTypeUsePackage: data.regTypeUsePackage,
      regTypeAddScience: data.regTypeAddScience,
      regTypeAddTours: data.regTypeAddTours,
      regTypeAddAccommodation: data.regTypeAddAccommodation,
      regTypeAddAP: data.regTypeAddAP,
      regTypePaymentMethod: data.regTypePaymentMethod,
      regTypeQuestions: data.regTypeQuestions,
      regTypeNotes: data.regTypeNotes,
      regTypeMailing: data.regTypeMailing,
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
