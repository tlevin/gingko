// Placeholder for any sort of search factory
(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$http', '$window'];

  function homeFactory($http, $window) {
    var services = {

      activate : activate,
      postMeal : postMeal

    };

    return services;

    function activate () {
      postMeal();
    }

    function postMeal (data) {
      console.log(data);
      // return $http({
      //   method: 'POST',
      //   url: '/api/in/meals',
      //   data: data
      // })
      // .then(function (response) {
      //   console.log('response returned!!');
      //   return response.data;
      // });
    }
  }


})();