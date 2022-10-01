const utils = require("../utils")
module.exports = {
  once: false,
  callback: async (client, data) => {
  if (/(Sending a heartbeat|Latency of)/i.test(data)) return null;
  await utils.sendConsole(data)
  }
}