'use strict';

const mongoose = require('mongoose');

let dbConnection;

const dbConnect = () => {

	if(!dbConnection) {
		dbConnection = mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	}

	return dbConnection;
};

module.exports.mongoose = mongoose;

module.exports.withConnection = model => async () => {
	await dbConnect();
	return model;
};
