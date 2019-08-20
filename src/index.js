const fs = require("fs");
const bulk = require("./bulk");
const search = require("./search");
const { EsIndexName } = require('./config');
const esClient = require('./es-client');

function readFiles(dirname) {
	return new Promise((resolve, reject) => {
		const files = [];
		fs.readdir(dirname, function(err, filenames) {
			if (err) {
				reject(err);
				return;
			}
			filenames.forEach(function(filename) {
				const content = fs.readFileSync(dirname + filename, 'utf-8');
				files.push({ filename, content });
			});
			resolve(files);
		});
	});
}

function deleteIndex() {
	return esClient.indices.delete({
		index: EsIndexName
	}).then(() => console.log('delete index ' + EsIndexName)).catch(e => console.error(e));
}

function createIndex(templateMapping) {
	return esClient.indices.create({
		index: EsIndexName,
		body: templateMapping
	}).then(() => console.log('create index ' + EsIndexName));
}

async function run() {
	const files = await readFiles('src/templates/');
	for (let i = 0; i < files.length; i++) {
		const { filename, content } = files[i];
		await deleteIndex();
		await createIndex(content);
		const start = new Date();
		const totalBulk = await bulk();
		const end = new Date();
		const totalSearchMs = await search();
		console.log(`RESULT: filename: ${filename}, totalBulk: ${totalBulk}, totalSearchMs: ${totalSearchMs}, indexationMs: ${end - start}`);
	}
}

Promise.resolve(run());
