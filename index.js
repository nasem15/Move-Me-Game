const world_width = 480;
const world_height = document.documentElement.clientHeight;

var player = new Player();

var display = document.getElementById('canvas').getContext('2d', {alpha:false});

display.canvas.width = world_width;
display.canvas.height = world_height;



var game = {

  init: function() {
    game.hideScreens();
    game.showScreen('startScreen');
  },

  hideScreens: function() {
    var screens = document.getElementsByClassName('gameLayer');
    for (let i = screens.length - 1; i >= 0; i--) {
      var screen = screens[i];
      screen.style.display = 'none';
    }
  },

  hideScreen: function(id) {
    var screen = document.getElementById(id);
    screen.style.display = 'none';
  },

  showScreen: function(id) {
    var screen = document.getElementById(id);
    screen.style.display = 'block';
  },

  showCanvas: function() {
    game.hideScreens();
    game.showScreen('canvas');
  },

  showEndingScreen: function() {
    game.hideScreens();
    game.showScreen('endingScreen');
  }

};


function update() {

  if (ctr.right) player.moveRight();
  if (ctr.left)  player.moveLeft();
  if (ctr.up)    player.moveUp();
  if (ctr.down)  player.moveDown();
  
  if (player.x < -player.width)  player.endGameRandomPosition();
  if (player.x > world_width)    player.endGameRandomPosition();
  if (player.y < -player.height) player.endGameRandomPosition();
  if (player.y > world_height)   player.endGameRandomPosition();
}


function render() {

  // World
  display.fillStyle = '#202830';
  display.fillRect(0, 0, world_width, world_height);

  //Player
  display.fillStyle = player.color;
  display.fillRect(player.x, player.y, player.width, player.height);

  //Border
  display.fillStyle = '#ff0000';
  display.fillRect(0, 0, world_width, 5);
  display.fillRect(0, world_height-5, world_width, 5);
  display.fillRect(0, 0, 5, world_height);
  display.fillRect(world_width-5, 0, 5, world_height);

  //Message
  display.font = '20pt monospace';
  display.fillStyle = '#fff';
  display.fillText(`move the dot out of box to`, 50, world_height - 50);
  display.fillText(`end the game`, 150, world_height - 20);

}

function cycle() {

  window.requestAnimationFrame(cycle);

  render();

  update();

}

function keyUpDown(event) {
  event.preventDefault();
  var state = event.type == 'keydown';
  switch (event.keyCode) {
    case 37: ctr.left  = state; break;
    case 38: ctr.up    = state; break;
    case 39: ctr.right = state; break;
    case 40: ctr.down  = state; break;
  }
}

window.addEventListener('keydown', keyUpDown);
window.addEventListener('keyup', keyUpDown);

cycle();

window.addEventListener('load', function() {
  game.init();
});




