
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';
import moment from 'moment';

// Collections
const SEED_USERNAME = 'test'
const SEED_PASSWORD = 'asdfasdf'
const SEED_EMAIL = 'test@email.com'
const SEED_FIRSTNAME = 'test'
const SEED_LASTNAME = 'test'
const SEED_PHONE = '+11234567890'

Meteor.startup(() => {
	console.log("Fixtures Setup");

	if (Roles.getAllRoles().count() === 0) {
		Roles.createRole("admin")
		Roles.createRole("customer")
		Roles.createRole("partner")
	}

	// Add Seed user
	if (!Accounts.findUserByEmail(SEED_EMAIL)) {
		userId = Accounts.createUser({
			username:SEED_USERNAME,
			password:SEED_PASSWORD,
			email: SEED_EMAIL,
			profile:{
				firstName: SEED_FIRSTNAME,
				lastName: SEED_LASTNAME,
				phone: SEED_PHONE
			}
		})
		Roles.addUsersToRoles(userId, "admin")
	};
	fixtureUser = Accounts.findUserByEmail(SEED_EMAIL)
	console.log("Fixtures Complete");
});