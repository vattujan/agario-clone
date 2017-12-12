angular.module('app.menu', [])
.config(function($stateProvider) {
  // Our first state called `menu`
  $stateProvider
    .state('menu', {
      url: '',
      templateUrl: '/public/menu/main.html',
      controller: 'MenuController as ctrl'
    });
});