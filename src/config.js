const {
	NAME,
	ADDRESS,
	EMAIL
} = require('./fake-types');

module.exports = {
	EsHost: 'http://ru1-es-bpm.bpmonline.com:9201',
	EsIndexName: 'stkachenko',
	EsLogin: 'user',
	EsPassword: 'password',
	FakeDocCount: 1 * 1000,
	SearchSamples: 100,
	EsTypes: {
		Contact: {
			"contact_name_globalsearch_primary": NAME,
			"contact_owner_globalsearch_primary": NAME,
			"contact_language_globalsearch_primary": NAME,
			"contact_addresstype_globalsearch_primary": NAME,
			"contact_address": ADDRESS,
			"contact_skype": ADDRESS,
			"contact_email": EMAIL
		}
	}
};
