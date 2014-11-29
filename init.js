var context;
var queue;
var WIDTH = 1024;
var HEIGHT = 724;
var mouseXPosition;
var mouseYPosition;
var stage;
var animation;
var deathAnimation;
var animationStart;
var spriteSheetLeft;
var spriteSheetRight;
var duckDeathSpriteSheet;
var enemyXPos = 100;
var enemyYPos = 100;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.75;
var score = 0;
var scoreText;
var gameTimer;
var gameTime = 0;
var needsRandomMove = 0;
var timerText;
var menuBG;
var logo;
var start;
var backgroundImage;


window.onload = function () {
    /*
     *      Set up the Canvas with Size and height
     *
     */
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;


    //

    /*
     *      Set up the Asset Queue and load sounds
     *
     */
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];

    /*
     *      Create a load manifest for all assets
     *
     */
    queue.loadManifest([
        //sounds
        { id: 'menuMusic', src: 'assets/introMusic.mp3' },
        { id: 'quackSound', src: 'assets/quack.mp3' },
        { id: 'shot', src: 'assets/shot.mp3' },
        { id: 'background', src: 'assets/countryside.mp3' },
        { id: 'gameOverSound', src: 'assets/gameOver.mp3' },
        { id: 'tick', src: 'assets/tick.mp3' },
        { id: 'deathSound', src: 'assets/die.mp3' },

        //Graphics
        { id: 'backgroundImage1', src: 'assets/bg1.png' },
        { id: 'menuBG', src: 'assets/menuBG.png' },
        { id: 'logo', src: 'assets/logo.png' },
        { id: 'start', src: 'assets/start.png' },
        { id: 'go', src: 'assets/go.png' },
        { id: 'backgroundImage2', src: 'assets/bg2.png' },
        { id: 'backgroundImage3', src: 'assets/bg3.png' },
        { id: 'crossHair', src: 'assets/crosshair.png' },
        { id: 'duckSpritesheetLeft', src: 'assets/duckSpritesheetLeft.png' },
        { id: 'duckSpritesheetRight', src: 'assets/duckSpritesheetRight.png' },
        { id: 'duckDeath', src: 'assets/duckDeath.png' },
    ]);
    queue.load();

    /*
     *      Create a timer that updates once per second
     *
     */


}

function doneLoading()
{
    document.getElementById("loading").style.display="none";
    
}

function queueLoaded(event) {

    doneLoading();

    stage = new createjs.Stage("myCanvas");
    

    menuBG = new createjs.Bitmap(queue.getResult("menuBG"))
    stage.addChild(menuBG);

    logo = new createjs.Bitmap(queue.getResult("logo"))
    stage.addChild(logo);
    logo.x = 250;
    logo.y = 200;

    var startSpriteData = {
        "images": [queue.getResult('start')],
        "frames": { "width": 137, "height": 42 },
        "animations": { "normal": [0] }
    };

    var startSpriteSheet = new createjs.SpriteSheet(startSpriteData);
    start = new createjs.Sprite(startSpriteSheet);
    start.x = 450;
    start.y = 300;

    stage.addChild(start);

    var helper = new createjs.ButtonHelper(start, "normal");
    start.addEventListener("click", showLevelSelect);

    // Create game spritesheets
    spriteSheetLeft = new createjs.SpriteSheet({
        "images": [queue.getResult('duckSpritesheetLeft')],
        "frames": { "width": 1502, "height": 1602 },
        "animations": { "flap": [0, 7] }
    });

    spriteSheetRight = new createjs.SpriteSheet({
        "images": [queue.getResult('duckSpritesheetRight')],
        "frames": { "width": 1502, "height": 1602 },
        "animations": { "flap": [0, 7] }
    });

    // Create duck death spritesheet
    duckDeathSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('duckDeath')],
        "frames": { "width": 198, "height": 148 },
        "animations": { "die": [0, 2, false, 1] }
    });


    animationStart = new createjs.Sprite(spriteSheetLeft, "flap");
    animationStart.regX = 750;
    animationStart.regY = 800;
    animationStart.scaleX = 0.22;
    animationStart.scaleY = 0.22;
    animationStart.x = 550;
    animationStart.y = 500;
    animationStart.gotoAndPlay("flap");
    stage.addChildAt(animationStart, 1);



    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener('tick', stage);
    
    createjs.Sound.play("menuMusic", { loop: -1 });
}

function showLevelSelect(event) {

    stage.removeChild(start);
    stage.removeChild(animationStart);

    logo.x = 250;
    logo.y = 100;

    var backgroundImage1 = new createjs.Bitmap(queue.getResult("backgroundImage1"))
    stage.addChild(backgroundImage1);
    backgroundImage1.scaleX = 0.3;
    backgroundImage1.scaleY = 0.3;
    backgroundImage1.x = 35;
    backgroundImage1.y = 200;

    var backgroundImage2 = new createjs.Bitmap(queue.getResult("backgroundImage2"))
    stage.addChild(backgroundImage2);
    backgroundImage2.scaleX = 0.3;
    backgroundImage2.scaleY = 0.3;
    backgroundImage2.x = 360;
    backgroundImage2.y = 200;

    var backgroundImage3 = new createjs.Bitmap(queue.getResult("backgroundImage3"))
    stage.addChild(backgroundImage3);
    backgroundImage3.scaleX = 0.3;
    backgroundImage3.scaleY = 0.3;
    backgroundImage3.x = 685;
    backgroundImage3.y = 200;

    var goSpriteData = {
        "images": [queue.getResult('go')],
        "frames": { "width": 69, "height": 43 },
        "animations": { "normal": [0] }
    };

    var goSpriteSheet = new createjs.SpriteSheet(goSpriteData);
    var go1 = new createjs.Sprite(goSpriteSheet);
    go1.x = 150;
    go1.y = 450;

    stage.addChild(go1);

    var helper1 = new createjs.ButtonHelper(go1, "normal");
    go1.addEventListener("click", function () {
        startGame(0);
    },
                         false);

    var go2 = new createjs.Sprite(goSpriteSheet);
    go2.x = 475;
    go2.y = 450;

    stage.addChild(go2);

    var helper2 = new createjs.ButtonHelper(go2, "normal");
    go2.addEventListener("click", function () {
        startGame(1);
    },
                         false);

    var go3 = new createjs.Sprite(goSpriteSheet);
    go3.x = 800;
    go3.y = 450;

    stage.addChild(go3);

    var helper3 = new createjs.ButtonHelper(go3, "normal");
    go3.addEventListener("click", function () {
        startGame(2);
    },
                         false);

}

function startGame(backgroundNumber) {
    stage.removeAllChildren();
    stage.update();

    gameTimer = setInterval(updateTime, 1000);

    if (backgroundNumber == 0) {
        backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage1"))
        stage.addChild(backgroundImage);
    }
    else if (backgroundNumber == 1) {
        backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage2"))
        stage.addChild(backgroundImage);
    }
    else {
        backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage3"))
        stage.addChild(backgroundImage);
    }
    //Add Score
    scoreText = new createjs.Text("Score: " + score.toString(), "24px Arial", "Blue");
    scoreText.x = 0;
    scoreText.y = 690;
    stage.addChild(scoreText);

    //Ad Timer
    timerText = new createjs.Text("Time: " + gameTime.toString(), "24px Arial", "#FFF");
    timerText.x = 910;
    timerText.y = 690;
    stage.addChild(timerText);

    //Stop menu music
    createjs.Sound.stop();

    // Play background sound
    createjs.Sound.play("background", { loop: -1 });

    // Create duck sprite
    createEnemyLeft();

    // Create crosshair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    stage.addChild(crossHair);

    // Add ticker

    createjs.Ticker.addEventListener('tick', tickEvent);

    // Set up events AFTER the game is loaded
    window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;
    

}

function createEnemyLeft() {
    animation = new createjs.Sprite(spriteSheetLeft, "flap");
    animation.regX = 750;
    animation.regY = 800;

    //Randomly generate the animation scale between 15% and 22%
    var scale = (Math.random() * (0.15 - 0.22) + 0.22).toFixed(2);

    animation.scaleX = scale;
    animation.scaleY = scale;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation, 1);
}

function createEnemyRight() {
    animation = new createjs.Sprite(spriteSheetRight, "flap");
    animation.regX = 750;
    animation.regY = 800;

    //Randomly generate the animation scale between 15% and 22%
    var scale = (Math.random() * (0.15 - 0.22) + 0.22).toFixed(2);

    animation.scaleX = scale;
    animation.scaleY = scale;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation, 1);
}

function duckDeath() {
    deathAnimation = new createjs.Sprite(duckDeathSpriteSheet, "die");
    deathAnimation.regX = 99;
    deathAnimation.regY = 58;
    deathAnimation.x = enemyXPos;
    deathAnimation.y = enemyYPos;
    deathAnimation.gotoAndPlay("die");
    stage.addChild(deathAnimation);
}

function tickEvent() {
    //Make sure enemy is within game boundaries and move enemy
    if (enemyXPos < WIDTH && enemyXPos > 0) {
        enemyXPos += enemyXSpeed;
    } else {
        enemyXSpeed = enemyXSpeed * (-1);
        enemyXPos += enemyXSpeed;
    }
    if (enemyYPos < HEIGHT && enemyYPos > 0) {
        enemyYPos += enemyYSpeed;
    } else {
        enemyYSpeed = enemyYSpeed * (-1);
        enemyYPos += enemyYSpeed;
    }

    var randomMovement = 0;

    if (needsRandomMove == 1) {
        randomPositionX = Math.floor(Math.random() * (1000 - 100 + 100)) + 0;
        randomPositionY = Math.floor(Math.random() * (650 - 100 + 100)) + 0;
        enemyXPos = randomPositionX;
        enemyYPos = randomPositionY;

        needsRandomMove = 0;

    }




    animation.x = enemyXPos;
    animation.y = enemyYPos;

}


function handleMouseMove(event) {
 
  
    var x = event.clientX;
    var y = event.clientY;
    console.log(event);
    console.log(y);

    // set mouseposition relative to canvas
    var canvas = document.getElementById("myCanvas");

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    x = x - 30;
    y = y - 30;

    //Offset the position by 30 pixels so mouse is in center of crosshair
    crossHair.x = x;
    crossHair.y = y;
}

function handleMouseDown(event) {

    var x = event.clientX;
    var y = event.clientY;

    // Calculate mouseposition relative to canvas
    var canvas = document.getElementById("myCanvas");

    x -= canvas.offsetLeft;
    //console.log(x);
    y -= canvas.offsetTop;
    //console.log(y);
    x = x;
    y = y;

    //Check click occurred within canvas
    if (x > 0 && x < WIDTH && y > 0 && y < HEIGHT) {
        //Play Gunshot sound
        createjs.Sound.play("shot", createjs.Sound.INTERRUPT_ANY);

        //Increase speed of enemy slightly
        enemyXSpeed *= 1.05;
        enemyYSpeed *= 1.06;

        //Obtain Shot position
        var shotX = Math.round(x);
        var shotY = Math.round(y);
        var spriteX = Math.round(animation.x);
        var spriteY = Math.round(animation.y);

        // Compute the X and Y distance using absolute value
        var distX = Math.abs(shotX - spriteX);
        var distY = Math.abs(shotY - spriteY);

        // Anywhere in the body or head is a hit - but not the wings
        if (distX < 100 && distY < 100) {
            //Hit
            stage.removeChild(animation);
            duckDeath();
            score += 100;
            scoreText.text = "Score: " + score.toString();
            createjs.Sound.play("deathSound");

            //Make it harder next time
            enemyYSpeed *= 1.05;
            enemyXSpeed *= 1.06;

            //Create new enemy in up to 2 seconds and randomly select which direction sprite to use
            var timeToCreate = Math.floor((Math.random() * 2000) + 1);
            var randomzeroone = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

            needsRandomMove = 1;

            if (randomzeroone == 0) {
                setTimeout(createEnemyLeft, timeToCreate);

            }

            else {
                setTimeout(createEnemyRight, timeToCreate);
            }

        }

        else {
            //Miss
            score -= 10;
            scoreText.text = "Score: " + score.toString();

        }

        //Set score text color, relative to zero
        if (score > 0) {
            scoreText.color = "Blue";
        }
        else {
            scoreText.color = "Red";
        }
    }
}

function playMenuMusic(event)
{
    createjs.Sound.play("menuMusic", { loop: -1 });

}

function updateTime() {
    gameTime += 1;
    if (gameTime > 60) {
        //End Game and Clean up
        timerText.x = 875;
        timerText.y = 690;
        timerText.text = "GAME OVER";
        stage.removeChild(animation);
        stage.removeChild(crossHair);
        stage.removeChild(backgroundImage);
        stage.addChild(menuBG);
        window.onmousedown = null;
        stage.addChild(logo);
        logo.x = 250;
        logo.y = 100;
        container = new createjs.Container();
        stage.addChild(container);

        var frame = new createjs.Shape();

        var content = new createjs.DOMElement("foo");

        //content.visible = false;

        document.getElementById("scoreLabel").innerHTML = "You scored " + score.toString() + " points";
        document.getElementById("hiddenScore").value = score;

        container.addChild(frame, content);

        container.x = (WIDTH / 2) - 200;
        container.y = (HEIGHT / 2) - 25;
        container.alpha = 1;
        container.rotation = 0;
        container.scaleX = 1;

        //Stop game music
        createjs.Sound.stop();

        var si = createjs.Sound.play("gameOverSound");
        si.addEventListener("complete",playMenuMusic);
        clearInterval(gameTimer);
    }
    else {
        if (gameTime > 50) {
            timerText.color = "Red";
        }
        timerText.text = "Time: " + gameTime
        createjs.Sound.play("tick");
    }
}
