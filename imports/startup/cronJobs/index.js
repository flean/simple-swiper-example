import { Meteor } from 'meteor/meteor'
import StartSyncedCron from './StartSyncedCron'
import runTest from './runTest'

console.log("Synced Cron Start")
StartSyncedCron(!Meteor.isProduction)
runTest(1)
console.log("Synced Cron End")