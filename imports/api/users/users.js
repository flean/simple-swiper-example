import SimpleSchema from "simpl-schema";
import _ from 'lodash';
import moment from 'moment-timezone'
import { Tracker } from "meteor/tracker";
import { ValidatedMethod } from 'meteor/mdg:validated-method';



Meteor.users.deny({
	insert: function() {
		return false;
	},
	update: function() {
		return false;
	},
	remove: function() {
		return false;
	}
});

export const UserSchema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true,
		uniforms: {	component:()=> null },
	},
	roles: {
		type: Object,
		optional: true,
		blackbox: true,
		uniforms: {	component:()=> null },
	},

	emails: {
		type: Array,
		uniforms: {
			variant:"outlined",
		},
	},
	"emails.$": {
		type: Object,
		optional: true,
		uniforms: {
			style: { backgroundColor: 'transparent' },
			disableRipple:true
		}
	},
	"emails.$.verified": {
		type: Boolean,
		optional: true,
		uniforms: {
			component: () => null
		}
	},
	"emails.$.address": {
		type: String,
		optional: true,
		label:"Email Address",
		uniforms: {
			variant:"outlined",
		}
	},

	playerIds: {
		type: Array,
		optional:true
	},
	"playerIds.$": {
		type: String,
		optional: true,
	},
	twoFactorCode:{
		type: String,
		optional: true,
	},
	createdAt: {
		type: Number,
		optional:true,
		uniforms: {
			variant:"outlined",
			readOnly:true
		},
		autoValue: function() {
			if (!this.isSet && (this.isInsert)) {
				return moment().valueOf()
			}
		},
	},
	profile: {
		type: Object,
	},
	'profile.image_url': {
		type: String,
		optional: true,
		uniforms: {	
			variant:"outlined"
		}
	},
	'profile.image_public_id': {
		type: String,
		optional: true,
		uniforms: {	
			variant:"outlined"
		}
	},
	'profile.firstName': {
		type: String,
		optional: true,
		uniforms: {	
			variant:"outlined"
		}
	},
	'profile.lastName': {
		type: String,
		optional: true,
		uniforms: {	
			variant:"outlined"
		}
	},
	'profile.phone': {
		type: String,
		optional: true,
		uniforms: {	
			variant:"outlined"
		}
	},
}, {
	tracker: Tracker
});

Meteor.users.attachSchema(UserSchema);

export const UserSchemaForm = UserSchema.pick(
	"createdAt",
	"profile",
	"stripe",
	"emails"
)

export const userUpsert = new ValidatedMethod({
	name:"user.update",
	validate: UserSchema.validator({ }),
	run(item) {
		if(!this.userId) {
			throw new Meteor.Error('user.upsert.notLoggedIn',
			'Must be logged in to update user info.');
		}
		set = {}
		let filterFields = ["_id","createdAt"]
		_.forOwn(_.omit(item,filterFields), (value,key) => { set[key] = value })
		userId = { _id:item._id }

		Meteor.users.update( userId, { $set:set } )
	}
})