// Setup do node:events
/*const EventEmitter = require('node:events');
class myEmmiter extends EventEmitter {}
const events = new myEmmiter();

events.on('event', (error) => {
		console.error(error)
		utils.sendConsole(error)
});*/

const config = process.env;
const fs = require("node:fs");
const Discord = require("discord.js");
const { AsciiTable3 } = require("ascii-table3")
const utils = require("./bot/utils");

utils.sendConsole("--------------------------------------------------\n> > **__Iniciando o processo...__**");

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.GuildBans,
		Discord.GatewayIntentBits.GuildEmojisAndStickers,
		Discord.GatewayIntentBits.GuildIntegrations,
		Discord.GatewayIntentBits.GuildWebhooks,
		Discord.GatewayIntentBits.GuildInvites,
		Discord.GatewayIntentBits.GuildVoiceStates,
		Discord.GatewayIntentBits.GuildPresences,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildMessageTyping,
		Discord.GatewayIntentBits.GuildMessageReactions,
		Discord.GatewayIntentBits.DirectMessages,
		Discord.GatewayIntentBits.DirectMessageReactions,
		Discord.GatewayIntentBits.DirectMessageTyping,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildScheduledEvents,

	],

	partials: [Discord.Partials],

});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.prefix = ".";

//nicialização

const eventsTable = new AsciiTable3("Events Loader");
eventsTable.setHeading("Name", "Status");

(fs.readdirSync("./bot/events")).forEach(eventFile => {
	const eventRequire = require("./bot/events/" + eventFile),
	eventName = eventFile.split(".")[0];
	client[`${eventRequire.once === true ? "once" : "on"}`](`${eventName}`, (args) => eventRequire.callback(client, args || null))
	eventsTable.addRow(`${eventName}`, `✅`)
})

eventsTable.setStyle("compact")
console.info(eventsTable.toString())

// server (web dashboard)
/*
const express = require("express");
const app = express();
const oauth2 = require("discord-oauth2");
const session = require("express-session");
const oauthSettings = {
	clientId: config.DISCORD_BOT_ID,
	clientSecret: config.DISCORD_BOT_SECRET,
	oauthUri: `https://discord.com/oauth2/authorize?client_id=${config.DISCORD_BOT_ID}&redirect_uri=${config.DOMAIN}/auth&response_type=code&scope=identify%20guilds%20guilds.join&prompt=none`,
	inviteUri: `https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_BOT_ID}&permissions=8&redirect_uri=${config.DOMAIN}/auth&response_type=code&scopes=bot%20applications.commands`,
	redirectUri: `${config.DOMAIN}/auth`,
	domain: config.DOMAIN
};
const oauth = new oauth2(oauthSettings);
// middlewares
app.set("view engine", "ejs");
app.set("views", "dashboard/views")
app.use(express.static("dashboard/src"));
app.use(
	session({
		secret: config.EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);
app.use(async (req, res, next) => {
	if (req.url.startsWith("/dashboard") || req.url.startsWith("/profile")) {
		if (!req.session.discordkey && !req.query.code)
			return res.redirect(oauthSettings.redirectUri);
	}
	let user = (await oauth.getUser(req.session['discordkey'])) || undefined
	user !== undefined ? user.avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : undefined
	req.user = user;
	next();
});
app.set("trust proxy", 1);
app.get("/", async (req, res) => {
	res.render("index.ejs", {
		// client: client,
		user: req.user
	})
});
app.get("/dashboard", async (req, res) => {
	try {
		let guilds = [];
		const allServers = await oauth.getUserGuilds(req.session["discordkey"]);
		for (const servidor of allServers) {
			let mutualServer = client.guilds.cache.get(servidor.id);
			if (mutualServer) {
				guilds.push(servidor);
			}
		}
		let user = await oauth.getUser(req.session['discordkey'])
		user.avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
		res.render("dashboard.ejs", {

			client: client,

			user,

			guilds,

			siteData: {

				domain: config.DOMAIN,

				bot: client.user,

				sessionSecret: config.EXPRESS_SESSION_SECRET

			}

		});

	} catch (err) {

		console.log(err);

		res.redirect(`${config.DOMAIN}/login`);

	}

});

app.get("/dashboard/:id", async (req, res) => {

	let guild = client.guilds.cache.get(req.params.id);

	if (!guild) {

		res.redirect(config.DOMAIN + "/dashboard");

	} else {

		res.render("guild.ejs", {

			client: client,

			user: await oauth.getUser(req.session["discordkey"]),

			guild: guild,

			siteData: {

				domain: config.DOMAIN,

				bot: client.user,

				sessionSecret: config.EXPRESS_SESSION_SECRET

			}

		});

	}

});

app.get("/profile", async (req, res) => {

	res.render("profile.ejs", {

		client: client,

		siteData: {

			domain: config.DOMAIN,

			bot: client.user,

			sessionSecret: config.EXPRESS_SESSION_SECRET

		},

		user: await oauth.getUser(req.session["discordkey"])

	});

});

app.get("/profile/logout", async (req, res) => {

	if (req.session.discordkey != undefined) {

		req.session.discordkey = undefined;

	}

	res.redirect(`${config.DOMAIN}`)

});

app.get("/addbot", async (req, res) => {

	res.render("addbot.ejs", {

		siteData: {

			oauthSettings,

			bot: client.user,

			sessionSecret: config.EXPRESS_SESSION_SECRET

		}

	});

});

app.get("/login", async (req, res) => res.redirect(oauthSettings.oauthUri));

app.get("/support", async (req, res) =>

	res.redirect("https://dsc.gg/"));

app.get("/invite", async (req, res) => res.redirect(oauthSettings.botOauthUri));

app.get("/commands", async (req, res) => {

	let sessao = await oauth

		.getUser(req.session["discordkey"])

		.then(() =>

			res.render("commands.ejs", {

				commands: client.commands,

				user: sessao

			})

		)

		.catch(err =>

			res.render("commands.ejs", {

				commands: client.commands,

				user: undefined

			})

		);

});

app.get("/auth", async (req, res) => {

	try {

		if (req.query.code) {

			const tokenReq = await oauth.tokenRequest({

				code: req.query.code,

				scope: "identify guilds guilds.join",

				grantType: "authorization_code"

			});

			if (!tokenReq) return res.redirect(oauthSettings.oauthUri);

			req.session.discordkey = tokenReq.access_token;

			const user = await oauth.getUser(tokenReq.access_token);

			res.redirect("/dashboard");

		} else {

			return res.redirect(oauthSettings.oauthUri);

		}

	} catch (error) {

		console.log(error)

		return res.redirect(oauthSettings.oauthUri);

	}

});

app.get("*", ({
	res
}) => res.status(404).send('Sorry cant find that!'))*/

client.login(config.DISCORD_BOT_TOKEN)