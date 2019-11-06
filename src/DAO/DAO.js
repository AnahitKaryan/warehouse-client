const config = require('./../configs/config');

let fetchCall = function (urlData, methodData, bodyData) {
    let url = 'http://' + config.DN_HOST + ':' + config.DN_PORT + '/' + urlData;
    const fetchObject = {
        method: methodData,
        credentials: 'same-origin',
        mode: 'cors',
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': document.cookie
        },
        cookie: document.cookie
    };

    if(arguments[2]) {
        fetchObject.body = JSON.stringify(arguments[2])
    }
    return fetch(url, fetchObject)
}

module.exports.fetchCall = fetchCall;