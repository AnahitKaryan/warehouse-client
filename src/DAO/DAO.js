const config = require('./../configs/config');

const fetchCall = function (urlData, methodData, bodyData) {
	const url = `${config.options.protocol}://${config.options.host}:${config.options.port}/${urlData}`;
	const fetchObject = {
		method: methodData,
		mode: 'cors',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	};

	if (bodyData) {
		fetchObject.body = JSON.stringify(bodyData);
	}
	return fetch(url, fetchObject);
};

module.exports.fetchCall = fetchCall;
