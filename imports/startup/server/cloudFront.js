import { Meteor } from 'meteor/meteor';

if (Meteor.isProduction && Meteor.settings.private.CDN) {
	console.log('cloudFront Setup Complete');
	WebAppInternals.setBundledJsCssUrlRewriteHook((url) => {
		return `https://${Meteor.settings.private.CDN}${url}&_g_app_v_=${process.env.GALAXY_APP_VERSION_ID}`;
	});
	console.log('cloudFront Setup Complete');
};
