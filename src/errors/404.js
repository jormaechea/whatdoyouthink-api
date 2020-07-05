'use strict';

module.exports = class Error404 extends Error {
	static get statusCode() {
		return 404;
	}
};
