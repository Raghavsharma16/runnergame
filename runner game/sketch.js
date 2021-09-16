var man,manRunning;
var bg,bgImage;
var coin,coinImage;
var stone,stoneImage;
var diamond,diamondImage;
var score=0;
var ig;

var gameState = 0;
var gameState = 1;

var PLAY=1;
var END=0;


var stoneGroup;
var coinGroup;
var gameOver,gameOverImage;

function preload() {
manRunning=loadAnimation("man1.png","man2.png","man3.png");
bgImage=loadImage("background.jpg");
coinImage=loadImage("coin.png");
stoneImage=loadImage("stone.png");
diamondImage=loadImage("diamond.png");
gameOverImage=loadImage("gmi.jpg");
}

function setup() {
createCanvas(800,600);


bg=createSprite(400,300);
 bg.addImage(bgImage);
 bg.scale=5;

 gameOver=createSprite(400,300,800,600);
 gameOver.addImage(gameOverImage);
 gameOver.scale=2.5;
 gameOver.visible = false;
        man=createSprite(200,550);
        man.addAnimation("running",manRunning);
        man.scale=0.2;
        
        ig=createSprite(400,560,800,5);
        ig.visible=false;

       

        stoneGroup=new Group();
        coinGroup=new Group();
        score=0;
}

function draw(){
    background(0);
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);
    score = score + Math.round(getFrameRate()/60);
   bg.velocityX = -(6 + 3*score/100);
    if(bg.x<200){
        bg.x=400;
    }
   
   
    if(gameState===1){
        bg.velocityX=-9;
        
        man.collide(ig);
        spawnStone();
        spawnCoin();
       
     if(keyDown("SPACE")){
        man.y=man.y-15;
         }
 man.velocityY=man.velocityY+0.4;
     
if(stoneGroup.isTouching(man)){
   gameState=0;
  
}

if(coinGroup.isTouching(man)){
    score=score+5;
}
    }

    if(gameState===0){
        gameOver.visible = true;
        bg.velocityX=0;
        man.velocityX=0;
      man.visible=false;
      stone.visible=false;
      coin.visible=false;
        stoneGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
       
    }
   
    drawSprites();
}


function spawnStone(){
if(frameCount%150===0){
    stone=createSprite(600,550,50,50);
    stone.addImage(stoneImage);
    stone.velocityX=-3;
    stone.scale=0.3;
    man.depth=stone.depth;
    stone.depth=stone.depth+2;
    stoneGroup.add(stone);
    stone.collide(ig)
}
}
function spawnCoin(){
if(frameCount%200===0){
    coin=createSprite(800,400,50,50);
    coin.addImage(coinImage);
    coin.velocityX=-4;
coin.scale=0.2;

man.depth=coin.depth;
coin.depth=coin.depth+1;
coinGroup.add(coin);
}
}



