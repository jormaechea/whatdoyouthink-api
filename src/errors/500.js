'use strict';

module.exports = class Error500 extends Error {
	static get statusCode() {
		return 500;
	}
};
