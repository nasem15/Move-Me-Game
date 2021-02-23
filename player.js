const Player = function() {
  this.x = 50;
  this.y = 100;
  this.width = 32;
  this.height = 32;
  this.color = '#0000ff';
};

Player.prototype = {
  
  moveLeft() { this.x -= 5; },

  moveRight() { this.x += 5; },

  moveUp() { this.y -= 5; },

  moveDown() { this.y += 5; },

  endGameRandomPosition() {
    game.showEndingScreen();
    player.x = randomNumX();
    player.y = randomNumY();
  }

};


function randomNumX() {
  return Math.floor(Math.random() * 350) + 130;
}

function randomNumY() {
  return Math.floor(Math.random() * (world_height-200)) + 200;
}