'use strict';

require('dotenv').config();

const responseHeaders = process.env.CORS_ALLOWED_ORIGIN ? {
	'Access-Control-Allow-Headers': 'Content-Type,Authorization',
	'Access-Control-Allow-Origin': process.env.CORS_ALLOWED_ORIGIN,
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,POST,DELETE'
} : {};

module.exports = api => async event => {
	try {

		const result = await api(event);
		return {
			headers: responseHeaders,
			body: JSON.stringify(result)
		};

	} catch(e) {

		const statusCode = e.constructor.statusCode || (e.constructor.name === 'ValidationError' ? 400 : 500);

		return {
			statusCode,
			headers: responseHeaders,
			body: JSON.stringify({
				message: e.message
			})
		};

	}
};
