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
		return { body: JSON.stringify(result), headers: responseHeaders };
	} catch(e) {
		throw new Error(`An error ocurred: ${e.message}`);
	}
};
