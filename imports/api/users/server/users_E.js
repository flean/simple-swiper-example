import { MemoryResultCacher } from 'meteor/cultofcoders:grapher';
import { getMyInfo } from '../users_Q';

getMyInfo.expose({
	firewall(userId, params) {
		if (!userId) {
			throw new Meteor.Error('not-allowed');
		}
	}
});

getMyInfo.cacheResults(
	new MemoryResultCacher({
		ttl: 600 * 1000, // 600 seconds
	})
);