import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import _ from 'lodash';
import moment from 'moment-timezone'
import { Tracker } from "meteor/tracker";
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Collections = new Mongo.Collection('collection');

Collections.deny({
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



export const CollectionSchema = new SimpleSchema(
	{
		_id: {
			type: String,
			regEx: SimpleSchema.RegEx.Id,
			optional:true
		},
		userId: {
			type: String,
			regEx: SimpleSchema.RegEx.Id,
			optional:true
		},
		createdAt: {
			type: Number,
			optional:true,
			autoValue: function() {
				if (!this.isSet && (this.isInsert || this.isUpsert)) {
					return moment().valueOf()
				}
			},
		},
		modifiedAt: {
			type: Number,
			optional:true,
			autoValue: function() {
				if (this.isSet && (this.isUpdate || this.isUpsert)) {
					return moment().valueOf()
				}
			},
		}
	},
	{ tracker: Tracker ,
		keepRawDefinition:true ,
		clean: {
			autoConvert: true,
			extendAutoValueContext: {},
			filter: false,
			getAutoValues: true,
			removeEmptyStrings: true,
			removeNullsFromArrays: false,
			trimStrings: true,
		}
	}
);

Collections.attachSchema(CollectionSchema);

export const CollectionInsert = new ValidatedMethod({
	name: 'collection.insert',
	validate: CollectionSchema.validator({ clean: true, filter: false }),
	run(item) {
		// User Authentication Check
		if (!this.userId) {
			throw new Meteor.Error('collection.insert.notLoggedIn',
				'Must be logged in to make a collection.');
		}
		// Assign UserId
		item.userId = this.userId
		
		// Returns id on insert
		return Collections.insert(item);
	}
});


export const collectionUpsert = new ValidatedMethod({
	name: 'collection.upsert',
	validate: CollectionSchema.validator({ }),
	run(item) {
		// User Authentication Check
		if (!this.userId) {
			throw new Meteor.Error('collection.upsert.notLoggedIn',
				'Must be logged in to update/insert a collection.');
		}

		set = {}

		// Make sure to remove setOn Insert Items and map to set object
		// Removing Fields that shoud be immutable
		let filterFields = ["_id","createdAt"]
		if (!item._id)
			filterFields = ["_id"]
		_.forOwn(_.omit(item,filterFields), (value,key) => { set[key] = value })
		
		// Assign ItemId if Null it becomes Insert
		upsertId = { _id:item._id };

		// Set OnInsert and and Updatable fields
		upsertItem = {
			$setOnInsert:{
				createdAt:item.createdAt,
				userId:this.userId
			},
			$set:set
		}

		// Returns id on insert else on update it returns an object
		return Collections.upsert(upsertId,upsertItem);
	}
});