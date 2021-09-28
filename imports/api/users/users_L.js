import { Meteor } from 'meteor/meteor';
import moment from 'moment-timezone';
import { Collections } from '../collections/collections';

Meteor.users.addLinks({
	collections:{
		collection:Collections,
		inversedBy:'user'
	}
});

Meteor.users.addReducers({
	dateCreatedAt: {
		body: { // Object, dependency graph
			createdAt:1
		} , 
		reduce(object) { // return the value
			return moment(object.createdAt).format('LL')
		},
	},

	userEmails: {
		body: {
			emails: {
				address:1
			}
		},
		reduce(object) {
			emails = object.emails
			if (emails.length == 0) {
				return ""
			}
			newArray = []
			emails.map(email => {
				newArray.push(email?.address)
			})
			return newArray.join(", ")
		}
	},

	profileName: {
		body: {
			profile: {
				firstName:1,
				lastName:1
			}
		},
		reduce(object) {
			return `${object.profile.firstName} ${object.profile.lastName}`
		}
	},

	profilePhone: {
		body: {
			profile: {
				phone:1
			}
		},
		reduce(object) {
			return `${object.profile.phone}`
		}
	},
	label: {
		body:{
			profile:1
		} ,
		reduce(object) {
			if(object?.profile?.firstName && object?.profile?.lastName) {
				return `${object?.profile?.firstName} ${object?.profile?.lastName}`
			}else {
				"N/A"
			}
		}
	},
	value: {
		body:{
			_id:1
		} ,
		reduce(object) {
			return object?._id
		}
	},
	email: {
		body: {
			emails:1
		},
		reduce(object) {
			value = object.emails[0].address
			return value
		}
	},
});