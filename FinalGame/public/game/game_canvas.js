
angular.module('app.game')
.directive('gameCanvas', function($injector) {
  var linkFn = function(scope, ele, attrs) {
    // link Function
    createGame(scope, scope.players, scope.mapId, $injector);
  };
 
  return {
    scope: {
      players: '=',
      mapId: '='
    },
    template: '<div id="gameCanvas"></div>',
    link: linkFn
  }
});