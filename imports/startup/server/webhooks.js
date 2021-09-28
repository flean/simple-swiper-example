import { Mongo } from 'meteor/mongo';

console.log("WebHooks Setup")
export const WebHooks = new (Mongo.Collection)('webhooks')
console.log("WebHooks")