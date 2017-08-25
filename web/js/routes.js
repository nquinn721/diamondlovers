app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home',
        controller: 'home',
        controllerAs: 'home'
      })
      .when('/users', {
        templateUrl: 'views/users',
        controller: 'users',
        controllerAs: 'users'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}])