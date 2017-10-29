const canvas = document.getElementById('my canvas');
const context = canvas.getContext('2d');

alert('Close This Window and Hit Space to Start');

const backgroundImg = new Image();
backgroundImg.src = "backroundImg.png";

const gorillaStanding = new Image();
gorillaStanding.src = "gorillaStanding.gif";
const gorillaStandingtoL = new Image();
gorillaStandingtoL.src = "gorillaStandingtoL.gif";

const gorillaWalking = new Image();
gorillaWalking.src = "gorillaWalking.gif";
const gorillaWalkingtoL = new Image();
gorillaWalkingtoL.src = "gorillaWalkingtoL.gif";

const gorillaJumping = new Image();
gorillaJumping.src = "gorillaJumping.gif";
const gorillaJumpingtoL = new Image();
gorillaJumpingtoL.src = "gorillaJumpingtoL.gif";

const cactus1 = new Image();
cactus1.src = "cactus1.gif";
const cactus2 = new Image();
cactus2.src = "cactus2.gif";
const cactus3 = new Image();
cactus3.src = "cactus3.gif";



const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
const spaceBar = 32;
const floorY = canvas.height - 91;

const rand = function(num) {
  return Math.floor(Math.random() * num);
};

const forEach = function(arr, func) {
  const helper = function(index) {
    if(index === arr.length) {
      return;
    }
    func(arr[index]);

    helper(index + 1);
  };

  helper(0);
};

const cacti = [cactus1, cactus2, cactus3];



const gameData = {
  isPaused: true,
  enemy : [
  {
    x: rand(canvas.width-300),
    y: 270,
    img: cacti[rand(3)],
    width: 50,
    height: 50,
    xDelta: Math.pow(-1, (rand(2) + 1))
  },
  {
    x: rand(canvas.width-300),
    y: 270,
    img: cacti[rand(3)],
    width: 50,
    height: 50,
    xDelta: Math.pow(-1, (rand(2) + 1))
  }
  ],
  hero : {
    x: canvas.width-150,
    y: floorY,
    img: gorillaStanding,
    width: 90,
    height: 90,
    xDelta: 9,
    yDelta: 0
  }
}


const hero = gameData.hero;
const enemy = gameData.enemy;
const jumpHeight = floorY - 1.5 * hero.height;


const draw = function() {
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  context.drawImage(hero.img, hero.x, hero.y, hero.width, hero.height);

  forEach(enemy, function(cactus){
    context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
  });
};



const updateData = function(){
  if(hero.yDelta !== 0) {
    if(hero.img === (gorillaStanding || gorillaWalking)){
    hero.img = gorillaJumping;
    } else if(hero.img === (gorillaStandingtoL || gorillaWalkingtoL)){
      hero.img = gorillaJumpingtoL;
    }
    hero.y -= hero.yDelta;
    if(hero.y <= jumpHeight) {
      hero.yDelta = -hero.yDelta;
      } if(hero.y >= floorY){
        hero.y = floorY;
        hero.yDelta = 0;
        if(hero.img === gorillaJumping){
          hero.img = gorillaStanding;
        } else if(hero.img === gorillaJumpingtoL) {
          hero.img = gorillaStandingtoL;
        }
      }
  }
  forEach(enemy, function(cactus){
    if(cactus.x >= canvas.width-cactus.width){
      cactus.xDelta = -(cactus.xDelta + 0.5);
    } else if (cactus.x <= 0) {
      cactus.xDelta = -(cactus.xDelta);
    }
    return cactus.x += cactus.xDelta;
  });

  forEach(enemy, function(cactus){
    if(cactus.x < hero.x && cactus.x + 3 > hero.x && cactus.y <= hero.y + 70){
      alert("Game over =( Close This Window to Play Again")
      hero.x = canvas.width-150;
      forEach(enemy, function(cactus){
        cactus.x = rand(canvas.width-300);
        cactus.yDelta = Math.pow(-1, (rand(2) + 1));
        cactus.img = cacti[rand(3)];
      });
    } if(cactus.x > hero.x && cactus.x < hero.x + 45 && cactus.y <= hero.y + 70){
      alert("Game over :( Close This Window to Play Again")
      hero.x = canvas.width-150;
      forEach(enemy, function(cactus){
        cactus.x = rand(canvas.width-300);
        cactus.yDelta = Math.pow(-1, (rand(2) + 1));
        cactus.img = cacti[rand(3)];
      });
    } 
  });
};


const loop = function() {
if(!gameData.isPaused){
  draw();
  updateData();
}
 
  requestAnimationFrame(loop);
};
loop();




document.addEventListener('keydown', function(event) {
  if(event.keyCode === rightKey) {
    if(hero.y === floorY){
      hero.img = gorillaWalking;
    }
    hero.x += hero.xDelta;
    if(hero.x >= canvas.width - 75) {
      hero.x = -25;
    }
  } else if(event.keyCode === leftKey) {
    if(hero.y === floorY){
      hero.img = gorillaWalkingtoL;
    }
      hero.x -= hero.xDelta;
      if(hero.x <= -30) {
        hero.x = canvas.width - 70;
      }
  } else if(event.keyCode === upKey) {
      if(hero.yDelta === 0) {
        hero.yDelta = 4;
      }
  } else if(event.keyCode === downKey) {
    hero.yDelta = 0;
    hero.y = floorY;
    if(hero.img === gorillaJumping){
      hero.img = gorillaStanding;
    } else if(hero.img === gorillaJumpingtoL){
      hero.img = gorillaStandingtoL;
    }
  } else if(event.keyCode === spaceBar){
    gameData.isPaused = !gameData.isPaused;
  }
}, false);

document.addEventListener('keyup', function(event) {
  if(event.keyCode === rightKey) {
    hero.img = gorillaStanding;
  } else if(event.keyCode === leftKey) {
    hero.img = gorillaStandingtoL;
  }
}, false);









