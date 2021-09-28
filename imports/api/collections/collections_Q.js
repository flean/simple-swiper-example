import { Collections } from "./collections"

export const getCollections = Collections.createQuery('getCollections',{
	$filter({ filters, options, params }) {
		if (params.filters) {
			Object.assign(filters, params.filters);
		};
		if (params.options) {
			Object.assign(options, params.options);
		};
		return { filters, options, params }
	},
	$paginate: true,
	user:{ profile:1 },
	dateCreatedAt:1,
	dateModifiedAt:1
},{});