'use strict';

const ENDPOINT_PERSON = 'http://swapi.co/api/people/';

function get(url, callback) {
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.addEventListener('load', function() {
		if (req.status < 400) {
			callback(req.responseText);
		} else {
			callback(null, new Error('Request failed: ' + req.statusText));
		}
	});
	req.addEventListener('error', function() {
		callback(null, new Error('Network error'));
	});
	req.send(null);
}
