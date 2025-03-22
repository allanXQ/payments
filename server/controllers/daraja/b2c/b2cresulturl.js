const { Transactions } = require("../../../models");
const { logger } = require("../../../utils");

const B2CResultURL = async (req, res) => {
  try {
    const { Result } = req.body;
    const receiverEntry = Result.ResultParameters.ResultParameter.find(
      (item) => item.Key === "ReceiverPartyPublicName"
    );
    const dateEntry = Result.ResultParameters.ResultParameter.find(
      (item) => item.Key === "TransactionCompletedDateTime"
    );

    const receiverName = receiverEntry
      ? receiverEntry.Value.split(" - ")[1]
      : null;
    const completionDate = dateEntry ? dateEntry.Value : null;

    await Transactions.updateOne(
      { ConversationID: Result.ConversationID },
      {
        ReceiverPartyPublicName: receiverName,
        TransactionCompletedDateTime: completionDate,
        Status: "funded",
      }
    );
    return null;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = B2CResultURL;
