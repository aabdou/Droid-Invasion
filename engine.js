// Game class
var Game = new function() {
    // Key codes
    var keyCodes = {
        37: 'left',
        38: 'right',
        39: 'fire'
    };
    
    // Game boards
    var boards = [
    
    ];
    
    // State of the keys
    this.keys = {};
    
    // Init the game object
    this.initialize = function(canvasId, spriteData, callback) {
        this.canvas = document.getElementById(canvasId);
        this.width  = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx    = this.canvas.getContext && this.canvas.getContext('2d');
        
        if (!this.ctx) {
            return alert("Your browser does not support canvas");
        }
        
        // Set up input keys
        this.setupInput();
        
        // Game loop
        this.loop();
        
        // Load game sprite
        SpriteSheet.load(spriteData, callback);
    };
    
    // Set up input keys
    this.setupInput = function() {
        // Keydown turns the stats on
        window.addEventListener('keydown', function(e) {
            if (keyCodes[e.keyCode]) {
                Game.keys[keyCodes[e.keyCode]] = true;
                e.preventDefault();
            }
        }, false);
        
        // Keyup turns the stats off
        window.addEventListener('keyup', function(e) {
            if (keyCodes[e.keyCode]) {
                Game.keys[keyCodes[e.keyCode]] = false;
                e.preventDefault();
            }
        }, false);
    };
    
    // Start the game loop
    this.loop = function() {
        var dt = 10 / 1000; // ??        
        for (i=0; i < boards.length; i++) {
            if (boards[i]) {
                boards[i].step(dt);
                
                // The step may remove the board
                boards[i] && boards[i].draw(Game.ctx);
            }
        }
        
        setTimeout(Game.loop, 30);
    };
    
    // Set an active board
    this.setBoard = function(num, board) {
        boards[num] = board;
    }
};


// Sprite sheet class
var SpriteSheet = new function() {
    this.map = {};
    this.load = function(spriteData, callback) {
        this.map = spriteData;
        this.image = new Image();
        this.image.onload = callback;
        this.image.src = "images/sprites.png";
    }
    
    this.draw = function(ctx,sprite,x,y,frame) {
        var s = this.map[sprite];
        if(!frame) frame = 0;
        ctx.drawImage(this.image,
        s.sx + frame * s.w,
        s.sy,
        s.w, s.h,
        x,
        y,
        s.w, s.h);
    };
}

// Title screen
var TitleScreen = function(title, subTitle, callback) {
    this.step = function(dt) {
        if (Game.keys['fire'] && callback) 
            callback();
    }
    
    this.draw = function(ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        
        // Draw the title
        ctx.font = "bold bangers 40px";
        ctx.fillText(title, Game.width/2, Game.height/2);
        
        // Draw the title
        ctx.font = "bold bangers 20px";
        ctx.fillText(subTitle, Game.width/2, 40 + Game.height/2);
    }
}
