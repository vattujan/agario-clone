
var preloadState = {
    preload: function () {
        var loadingLabel = game.add.text(400, 400, 'Loading...', { font: '30px Courier', fill: '#ffffff' });

        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.world.setBounds(0, 0, 3000, 3000);

        game.load.image('asteroid', 'assets/asteroid.png');
        game.load.image('earth', 'assets/ball.png');
        game.load.audio('hover', 'assets/hover.wav');
        game.load.audio('got', 'assets/got.mp3');
        game.load.spritesheet('explosion', 'assets/explode.png', 128, 128, 16);
        game.load.image('background', 'assets/background.png');
        game.load.image('sun', 'assets/sun.gif');
    },

    create: function () {
        game.state.start('menu');
    }

};