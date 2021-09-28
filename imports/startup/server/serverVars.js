import { Mongo } from 'meteor/mongo';

console.log("ServerVars Setup");
export const ServerVars = new Mongo.Collection('serverVars');
console.log("ServerVarsComplete");