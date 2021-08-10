var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,500);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

  doorG = new Group();
  climberG = new Group();
  invisibleBlockG = new Group();


}

function draw() {
  background(0);
  
 
 if (gameState==="play"){
  if (keyDown("Space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.5

  
  if (keyDown("left")){
    ghost.x=ghost.x-3;
  }

  if (keyDown("right")){
    ghost.x=ghost.x+3;
  }


  spawnDoor();

  if(tower.y > 400){
      tower.y = 300
    }
  
  if (climberG.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if (invisibleBlockG.isTouching(ghost)||ghost.y>600){

    gameState = "end";
    ghost.destroy();
  }
  


  drawSprites();
  }
 
  else if (gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250)
    

  }



  }

  function spawnDoor(){
  if (frameCount % 240===0){
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    

    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=climber.x;
    
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;

    door.depth = ghost.depth
    ghost.depth = ghost.depth+1;

    invisibleBlock.debug=true;
    
    doorG.add(door);
    climberG.add(climber);
    invisibleBlockG.add(invisibleBlock);

    

    door.lifetime=800;
    invisibleBlock.lifetime=800;
    climber.lifetime=800;

  }





  }