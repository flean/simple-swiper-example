import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'

console.log('Accounts Setup');

Accounts.config({
	loginExpirationInDays: 9000,
	sendVerificationEmail: false,
	forbidClientAccountCreation: true
});

Meteor.methods({
	'account.create'(data) {
		userId = Accounts.createUser(data)
		Roles.addUsersToRoles(userId, "customer")
		return userId
	}
});

//  AutoPublish Roles to Client
Meteor.publish( null , function() {
	if (this.userId) {
		return Meteor.roleAssignment.find({ 'user._id': this.userId })
	} else {
		return this.ready()
	}
})

Meteor.publish( "userRoles" , function(userId) {
	if (this.userId) {
		return Meteor.roleAssignment.find({ 'user._id': userId })
	} else {
		return this.ready()
	}
})

console.log('Accounts Setup Complete')