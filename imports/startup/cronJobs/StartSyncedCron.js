
import { SyncedCron } from 'meteor/flean:timezoned-synced-cron'

export default (log) => {
	SyncedCron.config({
		log:log
	})
	SyncedCron.start()
}


