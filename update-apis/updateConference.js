import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "t_conferences",
    Key: {
      conferenceId: event.pathParameters.id
    },
    UpdateExpression: "SET confTitle = :confTitle, confAbbr = :confAbbr, projectManager = :projectManager, accountClient = :accountClient, confVenue = :confVenue, confGraphic = :confGraphic, confStartDate = :confStartDate, confEndDate = :confEndDate, regAccess = :regAccess, regEarlyStart = :regEarlyStart, regNormalStart = :regNormalStart, regNormalEnd = :regNormalEnd, confLanguage = :confLanguage, confCurrency = :confCurrency, confExRate = :confExRate, notes = :notes",
    ExpressionAttributeValues: {
      ":confTitle": data.confTitle ? data.confTitle : null,
      ":confAbbr": data.confAbbr ? data.confAbbr : null,
      ":projectManager": data.projectManager ? data.projectManager : null,
      ":accountClient": data.accountClient ? data.accountClient : null,
      ":confVenue": data.confVenue ? data.confVenue : null,
      ":confGraphic": data.confGraphic ? data.confGraphic : null,
      ":confStartDate": data.confStartDate ? data.confStartDate : null,
      ":confEndDate": data.confEndDate ? data.confEndDate : null,
      ":regAccess": data.regAccess ? data.regAccess : null,
      ":regEarlyStart": data.regEarlyStart ? data.regEarlyStart : null,
      ":regNormalStart": data.regNormalStart ? data.regNormalStart : null,
      ":regNormalEnd": data.regNormalEnd ? data.regNormalEnd : null,
      ":confLanguage": data.confLanguage ? data.confLanguage : null,
      ":confCurrency": data.confCurrency ? data.confCurrency : null,
      ":confExRate": data.confExRate ? data.confExRate : null,
      ":notes": data.notes ? data.notes : null
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
