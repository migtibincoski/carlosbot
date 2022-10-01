const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(`${process.env.MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
module.exports = (id) => {
	let user = {}
	client.connect(async err => {
		const collection = client.db(`${process.env.IS_BETA === "true" ? "beta" : "ok"}`).collection("users");
	  const userObject = await collection.find({ id: `${id}`}).toArray()
		console.log(userObject)
    user = userObject;
  });
	client.close()
	return user;
}
