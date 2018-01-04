var ball;
var group;
var asteroid;
var stage, thumbnail, thumbContainer;

var playState = {
    create:function() {
        group = game.add.physicsGroup();
        this.pauseMenu();       
        this.spawnBall();
        this.spawnAsteroids();
        this.createMiniMap();
    },

    pauseMenu:function(){
        //Pause Label
        pauseLabel = game.add.text(5, 5, 'Pause', {
            font: '24px Calibri', align: 'center', fill: '#ffffff'});
        pauseLabel.inputEnabled = true;
        pauseLabel.fixedToCamera = true;
        
        pauseLabel.events.onInputDown.add(function(){
        game.paused = true;
        menuLabel = game.add.text(pauseLabel.x + game.width/2 - 150, pauseLabel.y + game.height/2 - 50, 'Game Paused', {
            font: '50px Calibri', align: 'center', fill: '#ffffff'});
        });
        
        //input listener to unpause
        game.input.onDown.add(this.unpause, self);

    },

    unpause:function(event){
        if(game.paused){
            menuLabel.destroy();
            game.paused = false;
        }
    },

    spawnBall:function() {
        ball = game.add.sprite(game.world.randomX, game.world.randomY, 'earth');
        game.physics.arcade.enable(ball, asteroid);
        ball.anchor.set(0.5, 0.5);
        ball.scale.setTo(0.25, 0.25);
        ball.radius = 95;
        ball.body.setCircle(ball.radius);
        game.camera.follow(ball);
        ball.body.collideWorldBounds = true;
    },
    
    spawnAsteroids:function() {
        for (var i = 0; i < 500; i++) {
            asteroid = group.create(game.world.randomX, game.world.randomY, 'asteroid');
            asteroid.scale.setTo(0.15, 0.15);
            asteroid.body.setCircle(50);
        }
    },
    
    createMiniMap:function() {
        stage = game.make.bitmapData(game.world.width, game.world.height);
        thumbnail = game.add.bitmapData(200, 200);
        thumbContainer = game.add.sprite(5, 60, thumbnail);
        game.stage.addChild(thumbContainer);    
    },

    update:function() {
        if (game.physics.arcade.overlap(ball, group, this.overlapHandler, this.processHandler, this)) {
            console.log('boom');
        }
    
        if (game.physics.arcade.distanceToPointer(ball) > ball.width/4) {
            game.physics.arcade.moveToPointer(ball, 450);
        }
        else {
            ball.body.velocity.setTo(0);
        }
    
        if (game.time.time < this.nextUpdate){
            return;
        }
        {
            stage.clear();
            stage.drawFull(game.world);
            
            //  Draw our black border rect
            thumbnail.rect(0, 0, thumbnail.width, thumbnail.width, '#000');        
        
            //  And copy the stage capture to our Thumbnail (offset by 2px for the black border)    
            thumbnail.copy(stage, 0, 0, stage.width, stage.height, 0, 0, thumbnail.width, thumbnail.width);
            thumbnail.update();
    
            this.nextUpdate = game.time.time + this.updateRate;
        }
    },

    processHandler:function(player, enemy) {
        return true;
    },
    
    overlapHandler:function(player, enemy) {
    
        if (player.overlap(enemy) && player.width > enemy.width) {
            enemy.destroy();
            player.width += enemy.width/55;
            player.height += enemy.height/55;
            
            asteroid = group.create(game.world.randomX, game.world.randomY, 'asteroid');
            asteroid.scale.setTo(0.15, 0.15);
            asteroid.body.setCircle(50);
        }
        else if(player.overlap(enemy) && player.width < enemy.width){
            player.destroy();
            enemy.width += player.width/60;
            enemy.height += player.height/60;
        }
        
    },
    
    render:function(){
        //game.debug.spriteInfo(ball, 32, 32);
        game.debug.text("Size: ", 5, 50);
        game.debug.text(ball.width, 60, 50);
        //game.debug.geom(ball, 111111, true, 2);  
        //game.debug.body(ball);

    }

};