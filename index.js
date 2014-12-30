var request = require('request');
var Q = require("q");

var utils = require("soa-example-core-utils");

var config = require("soa-example-service-config").config();

var redisUtil = require('soa-example-redis-util');

var getPermissions = function(accessToken){
	var deferred = Q.defer();

	redisUtil.get("permissions").then(function(permissions){
		if ( permissions ){
			console.log("Permissions found in Redis");
			deferred.resolve(permissions);
			return;
		}
		
		var url = utils.createBaseUrl(config.authorizationServiceIp, config.authorizationServicePort);

		utils.getWithAccessToken(accessToken, url + "/permissions").then(function(response){
			
			redisUtil.put("permissions", response);

			deferred.resolve(response);
		});
	});

	return deferred.promise;
};

module.exports = {
	getPermissions : getPermissions
}