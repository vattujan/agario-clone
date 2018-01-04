
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser');

game.state.add('boot', bootState);
game.state.add('preload', preloadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);

game.state.start('boot');