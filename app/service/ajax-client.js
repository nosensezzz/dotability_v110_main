var _ = require("lodash");

var //baseUrl = "http://localhost:3000/",
	baseUrl = "http://67.247.12.214:10000/",
	api = "api/"

class ajaxClient{
	constructor(options){
		this.baseUrl = baseUrl + api;
	}

	get(path , options, cb){
		var self = this,
			_o = {
				method: "get"
			};
		options = _.assign(_o, options?options:{});
		//console.log(self.baseUrl + path);
		fetch(self.baseUrl + path , options)
		.then(statusHandler)
		.then(formatHandler)
		.then(cb)
		.catch((err)=>{console.log(err);});
	}

	post(path, options, cb){
		var self = this, _options;
		_options = {
			method: "POST",
			body: null
		};

		fetch(self.baseUrl + path, _.assign(_options, options))
	    .then(statusHandler)
		.then(formatHandler)
		.then(cb)
		.catch((err)=>{console.log(err);});
	}

	put(path, options, cb){
		var self = this, _options;
		_options = {
			method: "put",
			body: null
		};
		_options = _.assign(_options, options);
		fetch(self.baseUrl + path, _options)
	    .then(statusHandler)
		.then(formatHandler)
		.then(cb)
		.catch((err)=>{console.log(err);});
	}

	post_api(path, dto, cb){
		var self = this, options;
		options = {
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			method: "POST",
			body: JSON.stringify(dto)
		};
		//console.log(options);
		fetch(self.baseUrl + path, options)
	    .then(statusHandler)
		.then(formatHandler)
		.then(cb)
		.catch((err)=>{console.log(err);});
	}

	put_api(path, dto, cb){
		var self = this, options;
		options = {
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			method: "PUT",
			body: JSON.stringify(dto)
		};
		//console.log(options);
		fetch(self.baseUrl + path, options)
	    .then(statusHandler)
		.then(formatHandler)
		.then(cb)
		.catch((err)=>{console.log(err);});
	}
}

function statusHandler (response) {
	//console.log(response);
	return response;
}

function formatHandler (res) {
	return res.json();
}

module.exports = new ajaxClient();

// headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Origin': '',
//     'Host': 'api.producthunt.com'
//  },