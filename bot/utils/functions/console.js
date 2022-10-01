const fetch = require("axios")

module.exports = async (message) => {
	let execReturn = {}
	fetch.post(`${process.env.DISCORD_DEBUG_WEBHOOK}`, {
			content: message,
			avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG0e6WXDTveQMhJ7CRce-JUkx8S_ZLTWsjrg&usqp=CAU", 
			username: "⚠️ Carlos Bot - Debug"
		})
		.then(response => {
			execReturn = {
				error: null, 
        response
			}
		}).catch(error => {
			execReturn = {
				error, 
        response: null
			}
			//console.error(error.response.data)
		});
	return execReturn;
}