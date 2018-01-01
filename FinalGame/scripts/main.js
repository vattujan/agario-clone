// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.image('asteroid', 'img/asteroid.png');
    game.load.image('earth', 'img/ball.png');
}

var ball;
var group;
var asteroid;
var stage, thumbnail, thumbContainer;

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    gameScale();
    group = game.add.physicsGroup(); 
    spawnBall();    
    spawnAsteroids();
    createMiniMap();
    //game.time.events.repeat(Phaser.Timer.SECOND, 100000, spawn2Asteroids, this);
}

function createMiniMap(){
    stage = game.make.bitmapData(game.world.width, game.world.height);
    thumbnail = game.add.bitmapData(200, 200);
    thumbContainer = game.add.sprite(5, 45, thumbnail);
    game.stage.addChild(thumbContainer);    
}

function gameScale(){
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.world.setBounds(0, 0, 3000, 3000);
}

function spawnBall(){
    ball = game.add.sprite(game.world.randomX, game.world.randomY, 'earth');
    game.physics.arcade.enable(ball, asteroid);
    ball.anchor.set(0.5, 0.5);
    ball.scale.setTo(0.25, 0.25);
    ball.radius = 95;
    ball.body.setCircle(ball.radius);
    game.camera.follow(ball);
    ball.body.collideWorldBounds = true;
}    
        

function spawnAsteroids(){
    for (var i = 0; i < 500; i++) {
        asteroid = group.create(game.world.randomX, game.world.randomY, 'asteroid');
        asteroid.scale.setTo(0.15, 0.15);
        asteroid.body.setCircle(50);
    }
}

function update(){
    if (game.physics.arcade.overlap(ball, group, overlapHandler, processHandler, this)) {
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
}

function processHandler(player, enemy) {
    return true;
}

function overlapHandler(player, enemy) {

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
    
}

function render(){
    //game.debug.spriteInfo(ball, 32, 32);
    game.debug.text("Size: ", 32, 32);
    game.debug.text(ball.width, 85, 32);
    //game.debug.geom(ball, 111111, true, 2);  
    //game.debug.body(ball);
}