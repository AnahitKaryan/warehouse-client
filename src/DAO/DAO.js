const config = require('./../configs/config');

let fetchCall = function (urlData, methodData, bodyData) {
    const url = config.options.protocol + '://' + config.options.host + ':' + config.options.port + '/' + urlData;
    const fetchObject = {
        method: methodData,
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        redirect: 'follow',
    };

    if(arguments[2]) {
        fetchObject.body = JSON.stringify(arguments[2])
    }
    return fetch(url, fetchObject)
}

module.exports.fetchCall = fetchCall;