'use strict';

/* eslint-disable no-underscore-dangle */

const {
	mongoose,
	withConnection
} = require('./base');

const { Schema } = mongoose;

const pollKinds = [
	'thumbs',
	'emojis'
];

const voteValues = [
	'negative',
	'neutral',
	'positive'
];

const Vote = new Schema({
	type: {
		type: String,
		required: true,
		enum: voteValues,
		lowercase: true,
		trim: true
	},
	comment: { type: String, trim: true }
});

const Poll = new Schema({
	_id: { type: String },
	userId: { type: String, required: true, index: true },
	title: { type: String, required: true, maxlength: 100 },
	kind: {
		type: String,
		required: true,
		enum: pollKinds,
		lowercase: true,
		trim: true
	},
	votes: [Vote],
	createdAt: Date
}, {
	toJSON: {
		versionKey: false,
		transform: (doc, ret) => {
			ret.id = ret._id;
			delete ret._id;
			delete ret.userId;
		}
	}
});

const PollModel = mongoose.model('Poll', Poll);

module.exports = withConnection(PollModel);
