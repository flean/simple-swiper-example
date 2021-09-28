import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onLogout( () => {
	if (Meteor.isDevelopment) {
		console.log("onLogout")
	}
});

Accounts.onLogin( (data) => {
	if (Meteor.isDevelopment) {
		console.log('onLogin', Meteor.userId(), data);
		if (!Meteor.userId()) return
	}
});