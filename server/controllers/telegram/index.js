const axios = require("axios");
const { MessageQueue } = require("../../models");

async function sendPaymentNotification(transID, message) {
  const token = process.env.PAYMENTS_BOT_KEY;
  const chatId = -4677658523;

  try {
    axios
      .post(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          chat_id: chatId,
          text: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000, // ✅ Correct placement
        }
      )
      .then(async (res) => {
        const msg = await MessageQueue.findOne({ transID });
        if (msg) {
          await MessageQueue.deleteOne({ transID });
        }
      })
      .catch(async (err) => {
        const msg = await MessageQueue.findOne({ transID });
        if (!msg) {
          await MessageQueue.create({
            transID,
            message,
          });
        } else {
          await MessageQueue.updateOne(
            { transID },
            { lastUpdateTime: new Date().toLocaleString() }
          ).exec();
        }
        console.log("❌ Error sending message:", err);
      });
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
  }
}

module.exports = {
  sendPaymentNotification,
};
