const fetch = require("superagent")

module.exports = async (message) => {
	fetch.post("https://discord.com/api/webhooks/979935079604289606/egilrYEa9rdgN4YyrQRmXcLaqYM_t9D42Nx0TxFpcZteOC1mQ9BXEItAn9Ji-BHLRvTE")
	.send({
			content: message,
			avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG0e6WXDTveQMhJ7CRce-JUkx8S_ZLTWsjrg&usqp=CAU", 
			username: "⚠️ Carlos Bot - Debug"
		})
		.end((error, response) => {
			return {
				error, response
			}
		  });
}