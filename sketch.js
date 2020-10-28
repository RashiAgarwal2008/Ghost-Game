var tower, towerImage;

var door, doorImage, doorsGroup;

var climber, climberImage, climbersGroup;

var ghost, ghostImage;

var invisibleblockGroup, invisibleblock;

var gameState = "play";

var spookySound;

function preload(){
   
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");

  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-standing.png");

  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("towerImage",towerImage);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  
  climbersGroup = new Group();
  
  invisibleblockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.5;
}

function draw (){
  background(0);
  
  if(gameState==="play"){
  if(keyDown("left_arrow")){
     ghost.x = ghost.x - 3;
     }

    if(keyDown("right_arrow")){
     ghost.x = ghost.x + 3;
     }
  
    if(keyDown("space")){
       ghost.velocityY = -5;
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;   
    
    
  if(tower.y>400){
    tower.y = 300;
  }
    
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
     }
  
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
    gameState = "end";
     }  
    
  
  
  drawSprites();
}
  
if(gameState==="end"){
   stroke("red");
   fill("yellow");
  textSize(50);
  text("Game Over", 200, 300);
}
  
  
}
  
function spawnDoors(){
  if(frameCount % 240===0){
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleblock = createSprite(200,15);
    invisibleblock.width = climber.width;
    invisibleblock.height = 2;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleblock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleblock.x = door.x;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleblock.lifetime = 800;
    
    doorsGroup.add(door);
    invisibleblock.debug = true;
    climbersGroup.add(climber);
    invisibleblockGroup.add(invisibleblock);
  }
}