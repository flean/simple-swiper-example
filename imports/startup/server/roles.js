import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

Meteor.methods({
	"addUserToRole" (userId,role) {
		if (!Roles.userIsInRole(this.userId, ['admin'])) { return }
		Roles.addUsersToRoles(userId, role)
	},
	"removeUserFromRole" (userId,role) {
		if (!Roles.userIsInRole(this.userId, ['admin'])) { return }
		Roles.removeUsersFromRoles(userId, role)
	},
})