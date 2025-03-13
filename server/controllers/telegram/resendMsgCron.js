const cron = require("node-cron");
const { MessageQueue } = require("../../models");
const { sendPaymentNotification } = require(".");

cron.schedule("*/1 * * * *", async () => {
  console.log("🔄 Running cron job to retry failed messages...");

  const failedMessages = await MessageQueue.find();
  for (const message of failedMessages) {
    await sendPaymentNotification(message.transID, message.message);
  }
});
