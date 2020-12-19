//Create variables here
var dog, happyDog, database, foodS, foodStock, feedDog;
var fedTime, lastFed, foodObj, object, sadDog;
var bedroom, garden, washroom, gameState, readingState;

function preload()
{
  //load images here
  sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
  bedroom = loadImage("images/virtual pet images/Bed Room.png");
  garden = loadImage("images/virtual pet images/Garden.png");
  washroom = loadImage("images/virtual pet images/Wash Room.png");
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database()
  foodObj = new Food();

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock = database.ref('Food');
foodStock.on("value", readStock);

readingState = database.ref('gameState')
readingState.on("value", function(data){
  gameState = data.val()
})

feed = createButton("Feed the dog");
feed.position(700, 95);
feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position (800, 95);
addFood.mousePressed(addFoods);



}


function draw() { 
  background(46, 139, 87);

foodObj.display();

function update(state){
  database.ref('/').update({
    gameState:state
  });

}

if(gameState != 'Hungry'){
  feed.hide();
  addFood.hide();
dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog)
}

currentTime = hour();
if(currentTime = (lastFed+1)){
update("Playing");
foodObj.garden();
}else if(currentTime ==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}


  fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed = data.val();
})

  
fill(255, 255, 254);
 textSize(15);
 if(lastFed>=12){
     text("Last Fed:"+lastFed%12+"PM", 350, 30)
}else{if(lastFed === 0)
    text("Last Fed: 12 AM", 350, 30)
}  {
    text("Last Fed:"+lastFed+"AM", 350, 30)
}

drawSprites();
}


  function readStock(data){

  
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }

  function feedDog(){
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

  function addFoods(){
    foodS++;
    databaser.ref('/').update({
      Food:foodS

    })
  }

  
  






