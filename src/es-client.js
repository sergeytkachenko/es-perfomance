const { EsLogin, EsPassword, EsHost } = require('./config');
const EsClient = require('elasticsearch');

const esClient = new EsClient.Client({
	host: EsHost,
	log: 'info',
	httpAuth: `${EsLogin}:${EsPassword}`
});

module.exports = esClient;
