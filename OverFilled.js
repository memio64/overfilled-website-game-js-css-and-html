var gameScreen = document.getElementById("gameScreen");
var dropper = document.getElementById("dropper");
var interval; // used to set up interval that checks every period of time whats being input 
var both = 0; // checks if both inputs are being held
var fishArray = []; //  places all the fish onto a list to detect collision
var fishCounter = 0;
var playMode = true; // tells the gameloop whether the game is currently running or not
var lastFrame = 0;
/* functions resposable for the left and right inputs of the dropper*/
function moveLeft(){
  var positionOfDropper = parseInt(window.getComputedStyle(dropper).getPropertyValue("left"));// obtains the style position in css from the dropper value
  if(positionOfDropper > 0){
  dropper.style.left = positionOfDropper - 2 + "px";
  }
} 

function moveRight(){
  var positionOfDropper = parseInt(window.getComputedStyle(dropper).getPropertyValue("left"));// obtains the style position in css from the dropper value
  if(positionOfDropper < 380)
    dropper.style.left = positionOfDropper + 2 + "px";
}

// function detects the offset position of any object on the page
function getOffset(elem) {
    const objPos = elem.getBoundingClientRect();
    const gameScreenPos = gameScreen.getBoundingClientRect();
    return {
      left: objPos.left - gameScreenPos.left + window.scrollX ,
      top: objPos.top - gameScreenPos.top + window.scrollY
    };
}

/* function detects if an input has been regestered */
document.addEventListener("keydown", event =>{
  if(both == 0){
    both++;
  if(event.key=== "ArrowLeft" || event.key === 'a'){
    interval = setInterval(moveLeft,1);/*will repeatedly play the function moveLeft */
  }
  if(event.key=== "ArrowRight" || event.key === 'd'){
    interval = setInterval(moveRight,1);/*will repeatedly play the function moveRight */
  }
}
if(event.key=== 'e'){
  let fishDropPool = 0; // change to randomizer
  FishType(fishDropPool);


}


});
/*checks if the input is released then clears the current interval */
document.addEventListener("keyup", event =>{
    clearInterval(interval);
    both = 0;
});
// sets the spawn position of the fish
function FishSpawnPosition(fish, depthFromDropper){
  let offsetOfDropper = getOffset(dropper);
  fish.style.position = "absolute";
  fish.style.left = offsetOfDropper.left + "px";
  fish.style.top = offsetOfDropper.top + "px";
  fish.style.top = depthFromDropper + "px";
  gameScreen.append(fish);
}
// destroy
function fishGravity(fish, height) {
  // manages the fish gravity and speed along the y axis
  fish.gravity = 0.05;
  fish.speedY = 0;
  function update() {
    // Update the fish position and speed
    fish.speedY += fish.gravity;
    let newPosition = parseFloat(fish.style.top) + fish.speedY;
    let fishesOffset = fish.getBoundingClientRect();
    // creates collision  for the fish and the boarder
    //might have to make this logic handled in a collision script
    if (newPosition < 500 - height) {
      fish.style.top = newPosition + "px";
      requestAnimationFrame(update);
    } else {
      fish.style.top = fish.style.top + height; 
      fish.speedY = 0;
    }
      
  }
  requestAnimationFrame(update);
}

function fishCollision(fish) {
  for(let i = 0; i < fishArray.length; i++){
    for(let j = 1 + i;j < fishArray.length; j++){
      const fishA = fishArray[i];
      const fishB = fishArray[j];
      let colliderA = fishA.getBoundingClientRect();
      let colliderB = fishB.getBoundingClientRect();

      if(colliderA.width + colliderA.x >= colliderB.x &&
         colliderA.x <= colliderB.x + colliderB.width &&
        colliderA.y + colliderA.height >= colliderB.y &&
        colliderA.y <= colliderB.y + colliderB.height ||
        colliderA.y + colliderA.height == 500 + colliderA.height ||
        colliderB.y + colliderB.height == 500 + colliderB.height

      ){
        if((JSON.stringify([...fishA.classList].sort()) === JSON.stringify([...fishB.classList].sort()))){
          
          fishArray.splice(i, 1); 
          fishArray.splice(j - 1, 1); 
          fishA.remove();
          fishB.remove();
          let currentY = parseInt(fishA.style.top) || 0;
          FishType(1); 
          const newFish = document.getElementById('fishOne' + (fishCounter - 1));  
          fishArray.push(newFish);
        }
        else{
        console.log(fishA.style.top);
        let currentY = parseInt(fishB.style.top) || 0; 
        fishB.style.top = (currentY - 1) + "px";}
      }

    }
  }
  
}


// detects and declares the fish type
function FishType(IdOfFish){
  var fish = document.createElement("div");
  switch(IdOfFish) {
    case 0:
      fish.setAttribute("class", "fishZero");
      fish.setAttribute("id", "fishZero" + fishCounter++);
      FishSpawnPosition(fish, 40);
      fishGravity(fish,40);
      fishArray.push(fish);
      
      break;
    case 1:
      fish.setAttribute("class", "fishOne" );
      fish.setAttribute("id", "fishOne" + fishCounter++);
      FishSpawnPosition(fish, 40);
      fishGravity(fish, 40);
      fishArray.push(fish);
      break;
    case 2:
      
      break;
    case 3:
      
      break;
    case 4:
      
      break;
    case 5:

      break;
    case 6:
      
      break;
    case 7:
      
      break;
    case 8:
      
      break;
    case 9:
      
      break;
    case 10:

      break;
    default:
      
      fish.setAttribute("class", "fishZero");
      fish.setAttribute("id", "fishZero");
      FishSpawnPosition(fish, 40);
      
      fishArray.push(fish);
      break;
      
  }
  

}
// looping fucntion that repeatedly sends out information about the game such as collision
function gameLoop(){
  
  fishCollision();
  window.requestAnimationFrame(gameLoop);
}
// animation frame allows us too repeatedly loop the code without having to resort to a while true loop
window.requestAnimationFrame(gameLoop);

