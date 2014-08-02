
var camera=null;
var scene=null;
var renderer=null;
var mesh=null;

var uvs = [];
uvs.push( new THREE.Vector2( 0.0, 0.0 ) );
uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
uvs.push( new THREE.Vector2( 0.0, 1.0 ) );			

var clock = new THREE.Clock;
var cube=null;
var chunkRoot=null;
var sceneRoot=null;
var lightRoot=null;

var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

var wanderers=new Array ();

/**
*
*/		
function processMouseMove(evt) 
{
	var deltaX = evt.clientX - mouseX;
	var	deltaY = evt.clientY - mouseY;
	
	mouseX = evt.clientX;
	mouseY = evt.clientY;
	
	setStatus ("x: " + mouseX + ", y: " + mouseY);

	if (!mouseDown) 
	{
		return;
	}

	evt.preventDefault();
	
	moveScene(deltaX, deltaY);
}
/**
*
*/
function processMouseDown(evt) 
{
	evt.preventDefault();

	mouseDown = true;
	mouseX = evt.clientX;
	mouseY = evt.clientY;
}
/**
*
*/
function processMouseUp(evt) 
{
	evt.preventDefault();

	mouseDown = false;
}
/**
*
*/
function createTile(aTexture) 
{
	debug ("createTile ()");
	
	var newTile=new Tile (aTexture);
	newTile.init ();
	
	return (newTile);
}
/**
*
*/
function createChunk() 
{
	debug ("createChunk ()");
	
	var chunk = new THREE.Object3D();

	// Row 1 ...
	
	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (0,0);
	chunk.add (cell.getReference ());
	
	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (0,10);
	chunk.add (cell.getReference ());

	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (0,20);
	chunk.add (cell.getReference ());
	
	// Row 2 ...
	
	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (10,0);
	chunk.add (cell.getReference ());
	
	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (10,10);
	chunk.add (cell.getReference ());

	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (10,20);
	chunk.add (cell.getReference ());

	// Row 3 ...
	
	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (20,0);
	chunk.add (cell.getReference ());
	
	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (20,10);
	chunk.add (cell.getReference ());

	cell=createTile (makeImagePath (this.getRandomTile ()));
	cell.setPlace (20,20);
	chunk.add (cell.getReference ());

	return chunk;
}
/**
*
*/
function createChunkInCell (cellX,cellY)
{
	debug ("createChunkInCell ("+cellX+","+cellY+")");

	var aChunk=createChunk ();
	aChunk.position.x=(cellX*(tileWidth*3));
	aChunk.position.y=(cellY*(tileHeight*3));

	return (aChunk);	
}	
/**
*
*/
function createChunks ()
{
	debug ("createChunks ()");
	
	var chunkGroup = new THREE.Object3D();
	
	for (var i=0;i<4;i++)
	{
		for (var j=0;j<4;j++)
		{
			chunkGroup.add(createChunkInCell (i-2,j-2));
		}	
	}

	return (chunkGroup);
}
/**
*
*/			
function createScene() 
{
	debug ("createScene ()");
	
	scene = new THREE.Scene();
	
	sceneRoot = new THREE.Object3D();
		
	chunkRoot=createChunks ();
	sceneRoot.add (chunkRoot);
	
	lightRoot=addLight ();
	sceneRoot.add (lightRoot.getReference ());	
	lightRoot.getReference ().position.set(0,0,10);
	wanderers.push (new Wanderer (lightRoot.getReference ()));
	
	lightRoot=addLight ();
	sceneRoot.add (lightRoot.getReference ());	
	lightRoot.getReference ().position.set(0,0,10);
	wanderers.push (new Wanderer (lightRoot.getReference ()));	
	
	//scene.add(new THREE.AmbientLight(0x444444));		
		
	scene.add (sceneRoot);
}			
/**
*
*/
function initWebGL() 
{
	console.log ("init ()");

	var canvas=document.getElementById("canvas");
	
	canvas.style.width = (windowWidth+'px');
	canvas.style.height = (windowHeight+'px');
	
	renderer = new THREE.WebGLRenderer();
	
	var sceneDiv=document.getElementById ("canvas");
	sceneDiv.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera (70,(windowWidth/windowHeight), 1, 1000 );
	camera.position.z = 50;
	
	createScene();

	// need both for FF and Webkit - others I haven't tested
	window.addEventListener ('DOMMouseScroll', mousewheel, false);
	window.addEventListener ('mousewheel', mousewheel, false);				
	window.addEventListener ('resize',onWindowResize,false);				
		
	setSize ();
	render ();
	
	canvas.addEventListener('mousemove',processMouseMove);
	canvas.addEventListener('mousedown',processMouseDown);
	canvas.addEventListener('mouseup',processMouseUp);
}

/**
*
*/
function onWindowResize() 
{
	console.log ("onWindowResize ()");
	
	setSize ();
}

/**
*
*/
function setSize ()
{
	console.log ("setSize ()");

	camera.aspect = (windowWidth / windowHeight);
	camera.updateProjectionMatrix();

	renderer.setSize (windowWidth, windowHeight);
}

/**
*
*/
function moveScene (deltaX,deltaY)
{
	sceneRoot.position.x+=(deltaX/3);
	sceneRoot.position.y-=(deltaY/3);
}

/**
*
*/
function render ()
{			
	/*
	cube.rotation.y -= clock.getDelta();	
	cube.rotation.z -= clock.getDelta();	
	cube.rotation.x -= clock.getDelta();	
	*/
	
	renderer.render (scene,camera);
	
	requestAnimationFrame (render);	
	
	for (var i=0;i<wanderers.length;i++)
	{
		wanderers [i].update();
	}
}

/**
*
*/
function mousewheel (event)
{
	return;
	
	var amount = 100; // parameter

	// get wheel direction 
	var d = ((typeof event.wheelDelta != "undefined")?(-event.wheelDelta):event.detail);
	d = 100 * ((d>0)?1:-1);

	// do calculations, I'm not using any three.js internal methods here, maybe there is a better way of doing this
	// applies movement in the direction of (0,0,0), assuming this is where the camera is pointing
	var cPos = camera.position;
	var r = cPos.x*cPos.x + cPos.y*cPos.y;
	var sqr = Math.sqrt(r);
	var sqrZ = Math.sqrt(cPos.z*cPos.z + r);

	var nx = cPos.x + ((r==0)?0:(d * cPos.x/sqr));
	var ny = cPos.y + ((r==0)?0:(d * cPos.y/sqr));
	var nz = cPos.z + ((sqrZ==0)?0:(d * cPos.z/sqrZ));

	// verify we're applying valid numbers
	if (isNaN(nx) || isNaN(ny) || isNaN(nz))
	  return;

	cPos.x = nx;
	cPos.y = ny;
	cPos.z = nz;
}
