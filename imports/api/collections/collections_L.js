import moment from 'moment-timezone'
import { Collections } from "./collections"

Collections.addLinks({
	user:{
		type:'one',
		collection:Meteor.users,
		field:'userId',
		index: true
	},
});

Collections.addReducers({
	dateCreatedAt: {
		body: { // Object, dependency graph
			createdAt:1
		} , 
		reduce(object) { // return the value
			return moment(object.createdAt).format("LLL");
		},
	},
	dateModifiedAt: {
		body: { // Object, dependency graph
			modifiedAt:1
		} , 
		reduce(object) { // return the value
			return moment(object.modifiedAt).format("LLL");
		},
	},
});