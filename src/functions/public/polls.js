'use strict';

const apiHandler = require('../api-handler');
const { Error400 } = require('../../errors');

const pollsConnector = require('../../models/polls');

const ensurePollId = event => {
	const id = event.pathParameters && event.pathParameters.id;

	if(!id)
		throw new Error400('Missing ID in path');

	return id;
};

const parseVoteBody = event => {

	const { body } = event;

	if(!body)
		throw new Error400('Missing request body');

	return JSON.parse(body);
};

module.exports.getOne = apiHandler(async event => {
	const pollId = ensurePollId(event);

	const PollsModel = await pollsConnector();
	return PollsModel.findById(pollId);
});

module.exports.vote = apiHandler(async event => {
	const pollId = ensurePollId(event);
	const { type, comment } = parseVoteBody(event);

	const PollsModel = await pollsConnector();
	await PollsModel.findOneAndUpdate({
		_id: pollId
	}, {
		$push: {
			votes: {
				type,
				comment
			}
		}
	}, {
		runValidators: true
	});
});
