const axios = require("axios");

async function sendPaymentNotification(message) {
  const token = process.env.PAYMENTS_BOT_KEY;
  const chatId = -4677658523;

  try {
    const response = await axios.post(
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
    );

    console.log("✅ Message sent successfully:", response.data);
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
  }
}

module.exports = {
  sendPaymentNotification,
};
