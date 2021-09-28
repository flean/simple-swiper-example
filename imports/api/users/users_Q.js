export const getMyInfo = Meteor.users.createQuery('getMyInfo', {
	$filter({ filters, options, params }) {
		if (params.filters) {
			Object.assign(filters, params.filters);
		};
		if (params.options) {
			Object.assign(options, params.options);
		};
		return { filters, options, params }
	},
	emails: 1,
	dateCreatedAt: 1,
	profile: {
		image_url: 1,
		image_public_id: 1,
		firstName: 1,
		lastName: 1,
		phone: 1
	},
	roles: 1
}, {scoped:true});