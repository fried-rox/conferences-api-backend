import uuid from "uuid";

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "reg_categories",
    Item: {
      regCategoryId: uuid.v1(),
      conferenceId: data.conferenceId, //might need to change this label
      regFullName: data.regFullName,
      regAbbrName: data.regAbbrName,
      regCurrency: data.regCurrency,
      regLanguage: data.regLanguage,
      addScience: data.addScience,
      addTours: data.addTours,
      addHotel: data.addHotel,
      addAP: data.addAP,
      regFee: data.regFee,
      payCash: data.payCash,
      payCheque: data.payCheque,
      payCard: data.payCard,
      payGuard: data.payGuard,
      payEFT: data.payEFT,
      regNotes: data.regNotes,
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
