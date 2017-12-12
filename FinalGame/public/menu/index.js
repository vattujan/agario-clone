angular.module('app.menu', [])
.config(function($stateProvider) {
  // Our first state called `menu`
  $stateProvider
    .state('menu', {
      url: '',
      template: 'public/menu/main.html',
      controller: 'MenuController as ctrl'
    });
});