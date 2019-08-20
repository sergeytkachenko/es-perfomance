const { FakeDocCount, EsTypes, EsIndexName } = require('./config');
const esClient = require('./es-client');
const faker = require('faker');
faker.locale = "ru";
const {
	NAME,
	ADDRESS,
	EMAIL
} = require('./fake-types');

async function bulkToEs(table = []) {
	const stepTable = table;
	if (stepTable.length === 0) {
		console.log('end of data');
		return Promise.resolve(false);
	}
	const body = [];
	stepTable.forEach(doc => {
		body.push({
			index: {
				_index: doc._index,
				_type: doc._type
			}
		});
		const _doc = {};
		for (let [fieldName, fieldValue] of Object.entries(doc)) {
			if (fieldName.indexOf('_') === 0) {
				continue;
			}
			_doc[fieldName] = fieldValue;
		}
		body.push(_doc);
	});
	console.log('start bulk data: ' + stepTable.length);
	return esClient
		.bulk({ body: body })
		.then(() => {
			console.log('bulk success');
			return true;
		})
		.catch(err => console.error(err));
}
function fakeDoc(type) {
	const esType = EsTypes[type];
	const doc = {
		_type: type,
		_index: EsIndexName
	};
	for (let [field, fieldType] of Object.entries(esType)) {
		let fakeValue;
		switch(fieldType) {
			case NAME:
				fakeValue = faker.random.words();
				break;
			case ADDRESS:
				fakeValue = faker.random.words();
				break;
			case EMAIL:
				fakeValue = faker.internet.email();
				break;
		}
		doc[field] = fakeValue;
	}
	return doc;
}

async function run() {
	let count = 0;
	const types = Object.keys(EsTypes);
	for (let y = 0; y < types.length; y++) {
		let type = types[y];
		const bulkSize = 1200;
		let docs = [];
		while (count < FakeDocCount) {
			docs.push(fakeDoc(type));
			count++;
			//console.log("docs.length " + docs.length);
			if (docs.length === bulkSize) {
				await bulkToEs(docs);
				docs = [];
				//console.log("bulk success: " + (count / FakeDocCount * 100).toFixed(2) + "%");
			}
		}
		await bulkToEs(docs);
		console.log("bulk total documents: " + count);
	}
	return Promise.resolve(count);
}

module.exports = run;

//Promise.resolve(run());
