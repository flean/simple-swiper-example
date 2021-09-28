
import { SyncedCron } from 'meteor/flean:timezoned-synced-cron'
import moment from 'moment-timezone'

export default (min) => {
	SyncedCron.add(
		{
			name:"test",
			timezone:"utc",
			schedule:(parser) =>{
				return parser.recur().every(min).minute()
			},
			job: () => {
				console.log(moment().format("LLL"))
				return "Completed"
			},
		}
	)
}