'use strict';

require('dotenv').config();

const { promisify } = require('util');

const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const jwksClient = jwksRsa({
	cache: true,
	rateLimit: true,
	jwksRequestsPerMinute: 10,
	jwksUri: `https://${process.env.OAUTH_ENDPOINT}/.well-known/jwks.json`
});

const jwtOptions = {
	audience: process.env.AUDIENCE,
	issuer: `https://${process.env.OAUTH_ENDPOINT}/`
};

const getToken = params => {

	if(!params.type || params.type !== 'TOKEN')
		throw new Error('Expected "event.type" parameter to have value "TOKEN"');

	const tokenString = params.authorizationToken;
	if(!tokenString)
		throw new Error('Expected "event.authorizationToken" parameter to be set');

	const match = tokenString.match(/^Bearer (.*)$/i);
	if(!match || match.length < 2)
		throw new Error(`Invalid Authorization token - ${tokenString} does not match "Bearer .*"`);

	return match[1];
};

const getPolicyDocument = (effect, resource) => ({
	Version: '2012-10-17',
	Statement: [{
		Action: 'execute-api:Invoke',
		Effect: effect,
		Resource: resource.replace(/\/.+\/.+\/.+$/, '/*')
	}]
});

const tryToAuthorize = async event => {

	const token = getToken(event);

	const decodedToken = jwt.decode(token, { complete: true });
	if(!decodedToken || !decodedToken.header || !decodedToken.header.kid)
		throw new Error('Invalid token');

	const getSigningKey = promisify(jwksClient.getSigningKey);

	const key = await getSigningKey(decodedToken.header.kid);

	const signingKey = key.publicKey || key.rsaPublicKey;

	const verifiedToken = jwt.verify(token, signingKey, jwtOptions);

	return {
		principalId: verifiedToken.sub,
		policyDocument: getPolicyDocument('Allow', event.methodArn),
		context: {
			scope: verifiedToken.scope,
			userId: verifiedToken.sub
		}
	};

};

module.exports.handler = async event => {
	try {
		const policy = await tryToAuthorize(event);
		return policy;
	} catch(e) {
		console.log(e.message);
		throw new Error('Unauthorized');
	}
};
