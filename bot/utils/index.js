module.exports = {
  formatDate: require("./functions/formatdate"),
  filterByCategory: require("./functions/filterCmdsByCategory"),
  sendConsole: require("./functions/console"),
	database: {
		schemas: {
			UserSchema: require("./functions/database/schemas/User"),
			GuildSchema: require("./functions/database/schemas/Guild")
		},
		getUserData: require("./functions/database/getUserData"),
		getGuildData: require("./functions/database/grtGuildData")
	}
}