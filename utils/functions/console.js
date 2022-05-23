const fetch = require("superagent")

module.exports = async (message) => {
	fetch.post("https://discord.com/api/webhooks/976591672131608576/vAHtaJaCZ_OZFd7cNcQTptiuL5QloAO_89jLlY_YNZEn8w6CvUbeSYW1GHhzHiopk-BI")
	.send({
			content: message,
			avatar: "",
			username: "🪰 Carlos Bot - Debug"
		})
		.end((err, res) => {
			return {
				error: err,
				response: res,
			}
		  });
}