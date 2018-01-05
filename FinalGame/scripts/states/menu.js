
var btnLabel, logoLabel, actionOnClick;

var menuState = {
    create: function () {
        //background
        game.background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
        game.background.autoScroll(-50, -50);

        //logo
        logoLabel = game.add.text(800, 300, 'Agar.io Clone', {
            font: '90px Calibri', align: 'center', fill: '#ffffff'
        });
        logoLabel.anchor.set(0.5, 0.5);
        //button
        btnLabel = game.add.text(800, 400, 'Click to Start', {
            font: '30px Calibri', align: 'center', fill: '#ffffff'
        });
        btnLabel.anchor.set(0.5, 0.5);
        btnLabel.inputEnabled = true;

        //adding Input handlers
        btnLabel.events.onInputOver.add(this.overNewgame);
        btnLabel.events.onInputOut.add(this.outNewgame);
        btnLabel.events.onInputDown.add(this.onNewgame);

    },

    overNewgame: function () {
        game.add.tween(btnLabel.scale)
            .to({ x: 1.3, y: 1.3 }, 300, Phaser.Easing.Exponential.Out, true);
        //explosion animation
        explode = game.add.sprite(730, 320, 'explosion');
        explode.animations.add('explosion');
        explode.animations.play('explosion', 20, 1, true);
        //hover sound
        hover = game.add.audio('hover');
        hover.play();
    },

    outNewgame: function () {
        game.add.tween(btnLabel.scale)
            .to({ x: 1, y: 1 }, 300, Phaser.Easing.Exponential.Out, true);
    },

    onNewgame: function () {
        game.state.start('play');

    }

};