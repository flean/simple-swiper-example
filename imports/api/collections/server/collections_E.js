import { MemoryResultCacher } from 'meteor/cultofcoders:grapher';
import { getCollections } from '../collections_Q';

getCollections.expose({
	firewall(userId, params){}
});

getCollections.cacheResults(
	new MemoryResultCacher({
		ttl: 600 * 1000, // 600 seconds
	})
);