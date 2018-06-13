(function () {
    "use strict";

    angular
        .module('test.app.Core')
        .factory('CoreService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var service = {
            getTestData: getTestData,
			sendForm: sendForm
        };

        return service;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		function getTestData() {
			var deferred = $q.defer();
			$http.get('https://formula-test-api.herokuapp.com/menu').then(function (response) {
				if(!response.data) {
					deferred.reject();
				} else {
					deferred.resolve(response.data);
				}
			}, function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

		function sendForm(form) {
			var deferred = $q.defer();
			$http.post('https://formula-test-api.herokuapp.com/contact', form).then(function (response) {
                if(!response.data) {
                    deferred.reject();
                } else {
                    deferred.resolve(response.data);
                }
            }).catch(function (error) {
                deferred.reject(error);
            });
			return deferred.promise;
        }

    }

})();