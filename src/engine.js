/** 
 * Author: Martin van Velsen <vvelsen@cs.cmu.edu>
 * 
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as 
 *  published by the Free Software Foundation, either version 3 of the 
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

/**
*
*/		
function processMouseMove(evt) 
{
	var offsets = document.getElementById('canvas').getBoundingClientRect();
	var windowX=evt.clientX-offsets.left;
	var windowY=evt.clientY-offsets.top;

	var deltaX = evt.clientX - mouseX;
	var	deltaY = evt.clientY - mouseY;
	
	mouseX = evt.clientX;
	mouseY = evt.clientY;
	
	setStatus ("x: " + windowX + ", y: " + windowY);

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

	var offsets = document.getElementById('canvas').getBoundingClientRect();
	var windowX=evt.clientX-offsets.left;
	var windowY=evt.clientY-offsets.top;	
	
	mouseDown = true;
	
	mouseX = evt.clientX;
	mouseY = evt.clientY;
	
	calculateMouseXY (windowX,windowY);
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
	
	for (var i=0;i<(tileXExtend*2);i++)
	{
		for (var j=0;j<(tileXExtend*2);j++)
		{
			chunkGroup.add(createChunkInCell (i-tileXExtend,j-tileYExtend));
		}	
	}

	sceneRoot.add (chunkGroup);
	
	return (chunkGroup);
}
/**
*
*/	
function createObjects ()
{
	debug ("createObjects ()");
	
	for (var i=0;i<10;i++)
	{
		var crate=new AnimatedObject ();
		crate.init ();	
		crate.setPlace (getRandomInteger (60)-30,getRandomInteger (60)-30);
	
		sceneRoot.add (crate.getReference ());
	}	
}
/**
*
*/
function createDebugObjects ()
{
	debug ("createDebugObjects ()");
	
	windowPlane=new Plane (-100,-100,200,200);
	windowPlane.init ();
	scene.add (windowPlane.getReference ());
	//scene.add(new THREE.AmbientLight(0xffffff));
}
/**
*
*/
function calcBoundingPlanes ()
{
	debug ("calcBoundingPlanes ()");
	
	var mouse3D=null;	
	var debugObjects = [];
	var raycaster =null;
	var intersects =null;
	
	debugObjects.push (windowPlane.getReference ());
		
	projector = new THREE.Projector();
	
	// Top Left
	mouse3D = new THREE.Vector3 (getScreenX2Cartesian (0),getScreenY2Cartesian (0),0.5);
								 
	projector.unprojectVector( mouse3D, camera );								

	raycaster = new THREE.Raycaster (camera.position,mouse3D.sub (camera.position).normalize());	
	
	intersects = raycaster.intersectObjects (debugObjects);
	
	if (intersects.length>0) 
	{
		intersects[0].point.y=-intersects[0].point.y;
	
		debug ("Top left: ("+intersects.length+") " + intersects[0].point.x + "," + intersects[0].point.y + "," + intersects[0].point.z);	
		
		windowLeft=intersects[0].point.x;
		windowTop =intersects[0].point.y;
	
		/*
		var crate=new AnimatedObject ();
		crate.init ();	
		crate.setPlace (intersects[0].point.x,intersects[0].point.y);
	
		sceneRoot.add (crate.getReference ());		
		*/
	}	
				
	// Bottom Right
	mouse3D = new THREE.Vector3 (getScreenX2Cartesian (windowWidth),getScreenY2Cartesian (windowHeight),0.5);
								
	projector.unprojectVector( mouse3D, camera );																
								
	raycaster = new THREE.Raycaster (camera.position,mouse3D.sub (camera.position).normalize());	
	intersects = raycaster.intersectObjects (debugObjects);
	
	if (intersects.length>0) 
	{
		intersects[0].point.y=-intersects[0].point.y;
		
		debug ("Bottom right: ("+intersects.length+") " + intersects[0].point.x + "," + intersects[0].point.y + "," + intersects[0].point.z);	
		
		windowRight=intersects[0].point.x;
		windowBottom =intersects[0].point.y;		
		
		/*
		var crate=new AnimatedObject ();
		crate.init ();	
		crate.setPlace (intersects[0].point.x,intersects[0].point.y);
	
		sceneRoot.add (crate.getReference ());		
		*/
	}									
}
/**
*
*/
function calculateMouseXY (mouseX,mouseY)
{
	debug ("calculateMouseXY ("+mouseX+","+mouseY+")");

	var mouse3D=null;	
	var debugObjects = [];
	var raycaster =null;
	var intersects =null;
	
	debugObjects.push (windowPlane.getReference ());
		
	projector = new THREE.Projector();
	
	// Top Left
	mouse3D = new THREE.Vector3 (getScreenX2Cartesian (mouseX),getScreenY2Cartesian (mouseY),0.5);
								 
	projector.unprojectVector (mouse3D,camera);

	raycaster = new THREE.Raycaster (camera.position,mouse3D.sub (camera.position).normalize());	
	
	intersects = raycaster.intersectObjects (debugObjects);
	
	if (intersects.length>0) 
	{
		intersects[0].point.y=-intersects[0].point.y;
	
		debug ("Top left: ("+intersects.length+") " + intersects[0].point.x + "," + intersects[0].point.y + "," + intersects[0].point.z);	

		/*	
		var crate=new AnimatedObject ();
		crate.init ();	
		crate.setPlace (intersects[0].point.x,-intersects[0].point.y);
	
		sceneRoot.add (crate.getReference ());
		*/
	}	
}
/**
*
*/			
function createScene() 
{
	debug ("createScene ()");
	
	scene = new THREE.Scene();
	
	sceneRoot = new THREE.Object3D();
		
	createDebugObjects ();
				
	createChunks ();
	
	createLights ();
	
	createObjects();
		
	scene.add (sceneRoot);
	
	// We need to do at least one render cycle before we do any raycasting otherwise
	// the numbers will be completely off
	
	renderer.render (scene,camera);
	
	calcBoundingPlanes ();
}			
/**
*
*/
function initWebGL() 
{
	debug ("init ()");

	var canvas=document.getElementById("canvas");
	
	canvas.style.width = (windowWidth+'px');
	canvas.style.height = (windowHeight+'px');
	
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	
	var sceneDiv=document.getElementById ("canvas");
	sceneDiv.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera (50,(windowWidth/windowHeight), 1, 500 );
	camera.position.z = 100;
	
	createScene();
			
	setSize ();
	
	render ();
	
	// need both for FF and Webkit - others I haven't tested
	window.addEventListener ('DOMMouseScroll', mousewheel, false);
	window.addEventListener ('mousewheel', mousewheel, false);				
	window.addEventListener ('resize',onWindowResize,false);		
	
	canvas.addEventListener('mousemove',processMouseMove);
	canvas.addEventListener('mousedown',processMouseDown);
	canvas.addEventListener('mouseup',processMouseUp);
}

/**
*
*/
function onWindowResize() 
{
	debug ("onWindowResize ()");
	
	setSize ();
}

/**
*
*/
function setSize ()
{
	debug ("setSize ()");

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
	
	checkLights ();
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

/*
var init = function() {
  camera = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, NEAR, FAR);
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

function onDocumentMouseDown( e ) {
  e.preventDefault();
  var mouseVector = new THREE.Vector3();
  mouseVector.x = 2 * (e.clientX / SCREEN_WIDTH) - 1;
  mouseVector.y = 1 - 2 * ( e.clientY / SCREEN_HEIGHT );
  var raycaster = projector.pickingRay( mouseVector.clone(), camera );
  var intersects = raycaster.intersectObject( TARGET );
  for( var i = 0; i < intersects.length; i++ ) {
    var intersection = intersects[ i ],
    obj = intersection.object;
    console.log("Intersected object", obj);
  }
}
*/