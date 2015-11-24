(function () {
  'use strict';

  angular.module('app')
  .controller('HostCtrl', HostCtrl);

  HostCtrl.$inject = ['$http', '$q', '$log', '$window', 'hostFactory', 'UserFactory'];

  function HostCtrl ($http, $q, $log, $window, hostFactory, UserFactory) {
    // TODO: Please verify that this matches the refactored style
    var self = this;

    // below are settings for the md-autocomplete directive
    self.simulateQuery = false;
    self.isDisabled = false;
    self.maxAttendees = [1,2,3,4,5,6,7,8];
    self.user = UserFactory.getUser().username;
    self.meal = {
        username: self.user
    };
    self.maxSelected = false;
    self.isSelected = function (num) {
      return self.maxSelected === num;
    };
    //
    self.toggleMax = function (num) {
      self.maxSelected = num;
      self.meal.maxAttendees = num;
    };

    self.attendees = null;
    self.selectedItem = undefined;
    self.selectRestaurant = function (restaurant) {
        self.selectedItem = restaurant;
        self.popout = false;
    };
    self.search = function () {
      if (self.searchEntry.length > 0) {
        self.popout = true;
        self.querySearch(self.searchEntry);
      } else {
        self.popout = false;
      }
    };
    self.formatTime = function (date, time) {
      var result = date + ',' + time;
      self.meal.date = moment(result).toISOString();
    };
    self.querySearch = function (query) {
      var path = '/api/yelp';

      return $http({
        url: path + '?term=' + query,
        method: 'GET'
      }).
        then(function (response) {
          self.status = response.status;
          self.iteratee = response.data;
          self.data = [];
          _.each(self.iteratee, function (item) {
            if (!item.is_closed && item.rating && item.name && item.url && item.categories && item.phone && item.location) {
              self.data.push({
                'rating': item.rating,
                'name': item.name,
                'url': item.url,
                'imgUrl': item.image_url,
                'categories': item.categories[0][0],
                'phone': item.phone,
                'display_address': item.location.display_address,
                'city': item.location.city,
                'zipCode': item.location.postal_code,
                'coordinate': {
                  lat: item.location.coordinate.latitude,
                  lng: item.location.coordinate.longitude
                }
              });
            }
          });
        }, function (response) {
          self.data = response.data || "Request failed";
          self.status = response.status;
          console.log('Error during querySearch.');
        })
        .then(function (response) {
          return self.data;
        });

    };

    self.add = function () {
      self.meal.restaurant = self.selectedItem;
      self.meal.user = UserFactory.getUser();
      self.formatTime(self.meal.date, self.time);
      hostFactory.postMeal(self.meal)
      .then(function (response) {
        $window.location = '/#/home';
      });
    };
}
})();
