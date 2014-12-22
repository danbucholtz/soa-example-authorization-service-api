var request = require('request');
var Q = require("q");

var utils = require("soa-example-core-utils");

var config = require("soa-example-service-config").config();

var getPermissions = function(accessToken){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.authorizationServiceIp, config.authorizationServicePort);

	utils.getWithAccessToken(url + "/permissions", accessToken).then(function(response){
		deferred.resolve(response);
	});

	return deferred.promise;
};

module.exports = {
	getPermissions : getPermissions
}