import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'


// Get list of all method names on Lists
// const LISTS_METHODS = _.pluck([
// 	insert,
// 	makePublic,
// 	makePrivate,
// 	updateName,
// 	remove,
// ], 'name');
const LISTS_METHODS = [];
// Only allow 5 list operations per connection per second

if (Meteor.isServer) {
	console.log("Security Setup");
	DDPRateLimiter.addRule({
		name(name) {
			return _.contains(LISTS_METHODS, name);
		},

		// Rate limit per connection ID
		connectionId() { return true; }
	}, 5, 1000);
	console.log("Security Setup Complete");
}