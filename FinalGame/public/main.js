// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(800, 800, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.stage.backgroundColor = '#111111';
    game.load.image('asteroid', 'img/asteroid.png');
    game.load.image('earth', 'img/ball.png');
    game.load.image('star', 'img/star.png');
    game.load.image('sun', 'img/sun.gif');
}

var ball;
var group;
var asteroid;
var sun1, sun2, sun3;

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    gameScale();
    group = game.add.physicsGroup(); 
    spawnBall();    
    spawnAsteroids();
    spawnSun();
    //game.time.events.repeat(Phaser.Timer.SECOND, 100000, spawn2Asteroids, this);
}

function gameScale(){
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.world.setBounds(0, 0, 3000, 3000);
}

function spawnBall(){
    ball = game.add.sprite(game.world.randomX, game.world.randomY, 'earth');
    game.physics.arcade.enable(ball, asteroid, sun1, sun2, sun3);
    ball.anchor.set(0.5, 0.5);
    ball.scale.setTo(0.25, 0.25);
    ball.radius = 95;
    ball.body.setCircle(ball.radius);
    game.camera.follow(ball);
    ball.body.collideWorldBounds = true;
}

function spawnSun(){
        sun1 = game.add.sprite(game.world.randomX, game.world.randomY, 'sun');
        game.time.events.loop(Phaser.Timer.SECOND * 2, function(){ 
            game.add.tween(sun1).to({x: game.world.randomX, y: game.world.randomY}, 
                5000, Phaser.Easing.Quadratic.InOut, true);}, this);
        sun1.scale.setTo(0.2, 0.2);
        sun1.body.setCircle(95);
        sun1.body.collideWorldBounds = true;
        
        sun2 = game.add.sprite(game.world.randomX, game.world.randomY, 'sun');
        game.time.events.loop(Phaser.Timer.SECOND * 2, function(){ 
            game.add.tween(sun2).to({x: game.world.randomX, y: game.world.randomY}, 
                5000, Phaser.Easing.Quadratic.InOut, true);}, this);
        sun2.scale.setTo(0.2, 0.2);
        sun2.body.setCircle(95);
        sun2.body.collideWorldBounds = true;
        
        sun3 = game.add.sprite(game.world.randomX, game.world.randomY, 'sun');        
        game.time.events.loop(Phaser.Timer.SECOND * 2, function(){ 
            game.add.tween(sun3).to({x: game.world.randomX, y: game.world.randomY}, 
                5000, Phaser.Easing.Quadratic.InOut, true);}, this);
        sun3.scale.setTo(0.2, 0.2);
        sun3.body.setCircle(95);
        sun3.body.collideWorldBounds = true;   
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
        game.physics.arcade.moveToPointer(ball, 350);
    }
    else {
        ball.body.velocity.setTo(0);
    }
}

function processHandler(player, enemy) {
    return true;
}

function overlapHandler(player, enemy) {

    if (player.overlap(enemy) && player.width > enemy.width) {
        enemy.destroy();
        player.width += enemy.width/60;
        player.height += enemy.height/60;
        
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