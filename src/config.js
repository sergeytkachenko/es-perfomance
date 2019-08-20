const {
	NAME,
	ADDRESS,
	EMAIL
} = require('./fake-types');

module.exports = {
	EsHost: process.env.ES_HOST || 'http://167.71.140.143:9200',
	EsIndexName: 'performance',
	EsLogin: 'user',
	EsPassword: 'password',
	FakeDocCount: process.env.FAKE_DOC_COUNT || 1400 * 1000,
	SearchSamples: process.env.SEARCH_SAMPLES || 1000,
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
