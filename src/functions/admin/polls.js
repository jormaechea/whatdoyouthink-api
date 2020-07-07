'use strict';

const { nanoid } = require('nanoid');

const apiHandler = require('../api-handler');
const { Error400 } = require('../../errors');

const pollsConnector = require('../../models/polls');

const getUserId = event => event && event.requestContext && event.requestContext.authorizer && event.requestContext.authorizer.userId;

const ensureUserId = event => {
	const userId = getUserId(event);

	if(!userId)
		throw new Error400('Missing user id');

	return userId;
};

const ensurePollId = event => {
	const id = event.pathParameters && event.pathParameters.id;

	if(!id)
		throw new Error400('Missing ID in path');

	return id;
};

const parsePollBody = event => {

	const { body } = event;

	if(!body)
		throw new Error400('Missing request body');

	return JSON.parse(body);
};

module.exports.getMany = apiHandler(async event => {
	const userId = ensureUserId(event);

	const PollsModel = await pollsConnector();
	return PollsModel.find({ userId });
});

module.exports.getOne = apiHandler(async event => {
	const userId = ensureUserId(event);
	const pollId = ensurePollId(event);

	const PollsModel = await pollsConnector();
	return PollsModel.findOne({
		_id: pollId,
		userId
	});
});

const maxInsertAttempts = 5;
module.exports.createOne = apiHandler(async event => {
	const userId = ensureUserId(event);
	const { title, kind } = parsePollBody(event);

	const PollsModel = await pollsConnector();

	let currentAttempt = 1;

	while(currentAttempt <= maxInsertAttempts) {
		try {

			const id = await PollsModel.create({
				_id: nanoid(6),
				userId,
				title,
				kind
			});

			return id;
		} catch(e) {
			if(e.code !== 11000 || currentAttempt >= maxInsertAttempts)
				throw e;

			currentAttempt++;
		}
	}
});

module.exports.updateOne = apiHandler(async event => {
	const userId = ensureUserId(event);
	const pollId = ensurePollId(event);
	const { title, kind } = parsePollBody(event);

	const PollsModel = await pollsConnector();
	return PollsModel.findOneAndUpdate({
		_id: pollId,
		userId
	}, {
		title,
		kind
	});
});
