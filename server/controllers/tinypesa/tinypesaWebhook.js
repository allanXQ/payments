const { Users } = require("../../models");
const Messages = require("../../utils");
const Services = require("../../services");
const axios = require("axios");

const tinypesaWebhook = async (req, res) => {
  try {
    console.log(req.body);
    const stkCallback = req.body.Body.stkCallback;
    const { CallbackMetadata } = req.body.Body.stkCallback;

    const { ExternalReference, ResultCode, ResultDesc, Amount, Msisdn } =
      stkCallback;
    let MpesaReceiptNumber;

    if (ResultCode === 0) {
      CallbackMetadata.Item.forEach(function (item) {
        if (item.Name === "MpesaReceiptNumber") {
          MpesaReceiptNumber = item.Value;
        }
      });
    }

    const currentApp = await Services.findOne(Users, {
      name: ExternalReference,
      active: true,
    });

    if (currentApp) {
      await axios
        .post(currentApp.webhookUrl, {
          Msisdn,
          Amount,
          MpesaReceiptNumber,
          ResultCode,
          ResultDesc,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return 0;
  } catch (error) {
    throw error;
  }
};

module.exports = { tinypesaWebhook };
