const { Transactions } = require("../../../models");

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
    throw error;
  }
};

module.exports = B2CResultURL;
