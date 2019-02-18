import uuid from "uuid";

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "reg_categories",
    Item: {
      regCategoryId: uuid.v1(),
      conferenceId: data.conferenceId, 
      regCategoryContext: data.regCategoryContext,
      regCategoryName: data.regCategoryName,
      regCategoryPrice: data.regCategoryPrice,
      regCategoryNotes: data.regCategoryNotes,
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
