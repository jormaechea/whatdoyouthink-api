'use strict';

module.exports = class Error400 extends Error {
	static get statusCode() {
		return 400;
	}
};
