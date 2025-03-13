const axios = require("axios");
const { MessageQueue } = require("../../models");

async function sendPaymentNotification(message) {
  const token = process.env.PAYMENTS_BOT_KEY;
  const chatId = -4677658523;

  try {
    await axios
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
        }
      )
      .then((res) => {})
      .catch(async (err) => {
        await MessageQueue.create({
          message,
        });
        console.log("❌ Error sending message:", err);
      });
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
  }
}

module.exports = {
  sendPaymentNotification,
};
