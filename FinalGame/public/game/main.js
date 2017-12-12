
window.createGame = function(scope, players, mapId, injector) {
    // Build the game object
  var height  = parseInt(ele.css('height'), 10),
      width   = parseInt(ele.css('width'), 10);
  var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameCanvas');
 
    // Load our custom Game object
  var Game      = require('./states'),
      states    = Game.States;
 
  // Add our game states
  game.state.add('Boot', states.Boot);
  game.state.add('Preloader', states.Preloader);
  game.state.add('MainMenu', states.MainMenu);
  game.state.add('Play', states.Play);
 
  // Start the game
  game.state.start('Boot');
};