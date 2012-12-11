var sprites = {
    ship: { sx: 0, sy: 0, w: 18, h: 35, frames: 3 }
};    

var startGame = function () {
    //SpriteSheet.draw(Game.ctx,"ship",100,100,1);
    
    Game.setBoard(0,new Starfield(20,0.4,100,true))
    Game.setBoard(1,new Starfield(50,0.6,100))
    Game.setBoard(2,new Starfield(100,1.0,50));        
    Game.setBoard(3,new TitleScreen("Alien Invasion", "Hit tab to start!"), playGame);
}

window.addEventListener('load', function() {
    Game.initialize("game", sprites, startGame);
});

var playGame = function() {
    Game.setBoard(3, new TitleScreen("Alien Invasion", "Game started..."));
}

// Star field
var Starfield = function(speed,  opacity, numOfStars, clear) {
    var stars = document.createElement("canvas");
    stars.height = Game.height;
    stars.width  = Game.width;
    var starsCtx = stars.getContext("2d");
    var offset = 0;
    
    // Clear the context
    if (clear) {
        starsCtx.fillStyle = "#000";
        starsCtx.fillRect(0, 0, stars.width, stars.height);
    }
    
    // Draw the stars
    starsCtx.fillStyle   = "#fff";
    starsCtx.globalAlpha = opacity;
    for(var i=0; i< numOfStars; i++) {
        starsCtx.fillRect(Math.floor(Math.random() * stars.width),
                     Math.floor(Math.random() * stars.height),
                     2, 2);
    }
    
    // Draw the starfield
    this.draw = function(ctx) {
        var intOffset = Math.floor(offset);
        var remaining = stars.height - intOffset;
        
        // Draw the top half
        if (intOffset > 0) {
            ctx.drawImage(stars, 
                          0, remaining, 
                          stars.width, intOffset, 
                          0, 0, 
                          stars.width, intOffset);
        }
        
        // Draw the bottom half
        if (remaining) {
            ctx.drawImage(stars, 
                          0, 0, 
                          stars.width, remaining, 
                          0, intOffset, 
                          stars.width, remaining);
        }
    }
    
    // Scroll the starfield
    this.step = function(dt) {
        offset += dt * speed;
        offse = offset % stars.height;
    }
}
