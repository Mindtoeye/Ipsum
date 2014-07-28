// Create an array to store our particles
var particles = [];

// The amount of particles to render
var particleCount = 30;

// The maximum velocity in each direction
var maxVelocity = 2;

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 33;

// The cloudCanvas context if it is defined.
var context=null;

// Create an image object (only need one instance)
var imageObj = new Image();

// Once the image has been downloaded then set the image on all of the particles
imageObj.onload = function() 
{
	debug ("loaded");
	
	/*
	initClouds();
	
    particles.forEach(function(particle) 
	{
		particle.setImage(imageObj);
    });	
	
	// If the context is set then we can draw the scene (if not then the browser does not support cloudCanvas)
	if (context) 
	{
		setInterval(function() 
		{
			// Update the scene befoe drawing
			update();

			// Draw the scene
			draw();
		}, 1000 / targetFPS);
	}
	*/	
};

// Once the callback is arranged then set the source of the image
imageObj.src = "images/Smoke10.png";

// A function to create a particle object.
function Particle(context) 
{
    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 5;

    // Store the context which will be used to draw the particle
    this.context = context;

    // The function to draw the particle on the cloudCanvas.
    this.draw = function() 
	{        
        // If an image is set draw it
        if(this.image)
		{
            this.context.drawImage(this.image, this.x-128, this.y-128);         
            // If the image is being rendered do not draw the circle so break out of the draw function                
            return;
        }
			
        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba(0, 255, 255, 1)";
        this.context.fill();
        this.context.closePath();
    };

    // Update the particle.
    this.update = function() {
        // Update the position of the particle with the addition of the velocity.
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Check if has crossed the right edge
        if (this.x >= $(document).width()) {
            this.xVelocity = -this.xVelocity;
            this.x = $(document).width();
        }
        // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if (this.y >= $(document).height()) {
            this.yVelocity = -this.yVelocity;
            this.y = $(document).height();
        }
        
        // Check if has crossed the top edge
        else if (this.y <= 0) {
            this.yVelocity = -this.yVelocity;
            this.y = 0;
        }
    };

    // A function to set the position of the particle.
    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    // Function to set the velocity.
    this.setVelocity = function(x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };
    
    this.setImage = function(image){
        this.image = image;
    }
}

// A function to generate a random number between 2 values
function generateRandom(min, max){
    return Math.random() * (max - min) + min;
}

// Initialise the scene and set the context if possible
function initClouds() 
{
    var cloudCanvas = document.getElementById('background');
	
	if (cloudCanvas==null)
	{
		alert ("canvas is null");
		return;
	}
	
    if (cloudCanvas.getContext) 
	{
        // Set the context variable so it can be re-used
        context = cloudCanvas.getContext('2d');

        // Create the particles and set their initial positions and velocities
        for(var i=0; i < particleCount; ++i){
            var particle = new Particle(context);
            
            // Set the position to be inside the cloudCanvas bounds
            particle.setPosition(generateRandom(0, $(document).width()), generateRandom(0, $(document).height()));
            
            // Set the initial velocity to be either random and either negative or positive
            particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
            particles.push(particle);            
        }
    }
    else {
        alert("Please use a modern browser");
    }		
}

// The function to draw the scene
function draw() {
    // Clear the drawing surface and fill it with a black background
    context.fillStyle = "rgba(0, 0, 0, 0.9)";
    context.fillRect(0, 0, $(document).width(), $(document).height());

    // Go through all of the particles and draw them.
    particles.forEach(function(particle) 
	{
        particle.draw();
    });
}

// Update the scene
function update() {
    particles.forEach(function(particle) {
        particle.update();
    });
}

