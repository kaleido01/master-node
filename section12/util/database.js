const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
	MongoClient.connect(
		"mongodb+srv://kaleido:9urbxqEnVtx6ZTQE@cluster0-y0a8x.mongodb.net/test?retryWrites=true"
	)
		.then(result => {
			callback(result);
			console.log("connected");
		})
		.catch(err => {
			console.log(err);
		});
};

module.exports = mongoConnect;
