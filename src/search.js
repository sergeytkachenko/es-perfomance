const { EsIndexName } = require('./config');
const esClient = require('./es-client');
const searchQuery = require('./search-query-es5');
const faker = require('faker');
faker.locale = "ru";

async function search() {
	return esClient.search({
		body: searchQuery,
		index: EsIndexName
	}).then(res => res.took);
}

async function searches() {
	let totalMs = 0;
	const steps = 3000;
	for(let i = 0; i < steps; i++) {
		try {
			const q = faker.random.words();
			searchQuery.query.function_score.query.bool.should[0].multi_match.query = q;
			const response = await esClient.search({
				body: searchQuery,
				index: EsIndexName
			});
			totalMs += response.took;
			console.log(i / steps * 100 + "%, totalMs: " + totalMs / i);
		} catch (e) {
			console.error(e);
		}
	}
	return totalMs / steps;
}

Promise
	.resolve(searches())
	.then((totalMs) => {
		console.log(`totalMs: ${totalMs} ms`);
	});

