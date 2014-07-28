
/**
*
*/
function getDie (anIndex)
{
	return (dies [anIndex]);
}
/**
*
*/
function createDies ()
{
	var newDie=null;
	
	newDie=new Die ("white","W");
	dies.push (newDie);
	
	newDie=new Die ("black","B");
	dies.push (newDie);	
	
	newDie=new Die ("yellow","Y");
	dies.push (newDie);	
	
	newDie=new Die ("red","R");
	dies.push (newDie);	
		
	newDie=new Die ("green","G");
	dies.push (newDie);		
	
	newDie=new Die ("blue","U");
	dies.push (newDie);		
}

/**
*
*/
function processMouseDown (event, a, b)
{
	//debug ("processMouseDown ()");

    // get bounding rect of the paper
    var bnds = event.target.getBoundingClientRect();

    // adjust mouse x/y
    var mx = event.clientX - bnds.left;
    var my = event.clientY - bnds.top;

    // divide x/y by the bounding w/h to get location %s and apply factor by actual paper w/h
    var fx = mx/bnds.width * mouseHitBox.attrs.width;
    var fy = my/bnds.height * mouseHitBox.attrs.height;

    // cleanup output
    fx = Number(fx).toPrecision(3);
    fy = Number(fy).toPrecision(3);
	
	xDown=fx;
	yDown=fy;
	
	xLast=xDown;
	yLast=yDown;

	mouseDown=true;
}

/**
*
*/
function processMouseMove (event, a, b)
{
	//debug ("processMouseMove ("+mouseMoving+","+mouseDown+")");

	if (mouseMoving==true)
	{
		//debug ("bump (mouseMoving)");
		return;
	}
	
	if (mouseDown==false)
	{
		//debug ("bump (mouseDown)");
		return;
	}
	
	mouseMoving=true;
	
	//debug ("moving ...");
	
    // get bounding rect of the paper
    var bnds = event.target.getBoundingClientRect();

    // adjust mouse x/y
    var mx = event.clientX - bnds.left;
    var my = event.clientY - bnds.top;

    // divide x/y by the bounding w/h to get location %s and apply factor by actual paper w/h
    var fx = mx/bnds.width * mouseHitBox.attrs.width;
    var fy = my/bnds.height * mouseHitBox.attrs.height;

    // cleanup output
    fx = Number(fx).toPrecision(3);
    fy = Number(fy).toPrecision(3);
					
	moveScene (fx-xLast,fy-yLast);

	checkChunks ();	
	
	xLast=fx;
	yLast=fy;
	
	mouseMoving=false;	
}

/**
*
*/
function processMouseOut (event, a, b)
{
	//debug ("processMouseOut ()");
	
	mouseDown=false;
}

function getTile (cellX,cellY)
{
	debug ("getTile ("+cellX+","+cellY+")");
	
	debug ("Chunks: " + chunks.length);

	return (null);
}

/**
*
*/
function addChunk (x,y)
{
	debug ("addChunk ("+x+","+y+")");

   var chunk=new Chunk ();
   chunk.place (x,y); // Initial placement, should be remembered by the chunk
   chunk.load ();
   
   chunks.push (chunk);
}

/**
*
*/
function placeScene (deltaX,deltaY)
{
	for (var i=0;i<chunks.length;i++)
	{
		chunks [i].place (deltaX,deltaY);
	}
}

/**
*
*/
function moveScene (deltaX,deltaY)
{
	//debug ("moveScene ("+deltaX+","+deltaY+")");

	var i=0;

	for (i=0;i<chunks.length;i++)
	{
		chunks [i].move (deltaX,deltaY);
	}
	
	for (i=0;i<objects.length;i++)
	{
		objects [i].move (deltaX,deltaY);
	}	
	
	for (i=0;i<lights.length;i++)
	{
		lights [i].move (deltaX,deltaY);
	}	
}

/**
*
*/
function checkChunks ()
{
	//debug ("checkChunks ()");
	
	var testTop=0;
	var testLeft=0;
	var testRight=mouseHitBox.attrs.width;
	var testBottom=mouseHitBox.attrs.height;

	for (var i=0;i<chunks.length;i++)
	{
		var testChunk=chunks [i];
		
		if (testChunk.testBounds (testTop,testLeft,testRight,testBottom)==false)
		{
			testChunk.unload ();
		}
		else
		{
			testChunk.load ();
		}
	}	
}

/**
*
*/
function calculateLights ()
{
	debug ("calculateLights ()");
	
	for (var i=0;i<lights.length;i++)
	{
		var aLight=lights [i];
		
		var cellX=aLight.getCellX ();
		var cellY=aLight.getCellY ();
		
		debug ("Processing light " + i + ", at: " + cellX + ", " + cellY);
		
		var aTile=getTile (cellX,cellY);
		
		if (aTile!=null)
		{
			aTile.setBrightness (0.1);
		}
	}
}

/**
* http://bertanguven.com/raphael-js-setsize-function/
*/
function scaleScene (aDelta)
{
	debug ("scaleScene ("+aDelta+")");
		
	//circle.scale(scale);
}

/**
*
*/
function addLight (aLabel)
{
	debug ("addLight ()");

	var obj=new Light ();
	
	lights.push (obj);
	
	obj.init (Math.floor((Math.random() * (500)) + 1),
			  Math.floor((Math.random() * (500)) + 1),
			  aLabel);

	objID++;
	
	return (obj);	
}

/**
*
*/
function addAnimatedObject (aLabel)
{
	debug ("addAnimatedObject ()");

	var obj=new AnimatedObject ();
	
	objects.push (obj);
	
	obj.init (Math.floor((Math.random() * (500)) + 1),
			  Math.floor((Math.random() * (500)) + 1),
			  aLabel);
			  
	//obj.addSparks ();
	
	objID++;
	
	return (obj);	
}

/**
*
*/
function addImageObject (aUrl)
{
	debug ("addImageObject ()");

	var obj=new ImageObject ();
	
	objects.push (obj);
	
	obj.init (Math.floor((Math.random() * (500)) + 1),
			  Math.floor((Math.random() * (500)) + 1),
			  aUrl);
	
	objID++;
	
	return (obj);
}

/**
*
*/
function addObjects ()
{
	debug ("addObjects ()");
	
	var light=addLight ("object-"+objID);
	
	var chestA=addImageObject (makeImagePath ("/descent/chest_gold.png"));
	var chestB=addImageObject (makeImagePath ("/descent/chest_silver.png"));
	
	var objectA=addAnimatedObject ("object-"+objID);
	var objectB=addAnimatedObject ("object-"+objID);
	var objectC=addAnimatedObject ("object-"+objID);

	bindToCell (chestA,getRandomCell (),getRandomCell ());
	bindToCell (chestB,getRandomCell (),getRandomCell ());

	bindToCell (objectA,getRandomCell (),getRandomCell ());
	bindToCell (objectB,getRandomCell (),getRandomCell ());
	bindToCell (objectC,getRandomCell (),getRandomCell ());	
	
	bindToCell (light,4,4);
}

/**
*
*/
function addCards ()
{
	debug ("addCards ()");
	
	var obj=null;
		
	obj=new Card ();
	obj.init (10,10,300,243,makeImagePath ("/descent/HeroCard.png"));	
	obj.addShadow ();	
	cards.push (obj);

	placeScreenObject (obj,"bottomright");
	
	obj=new Card ();
	obj.init (10,10,294,454,makeImagePath ("/descent/CopperBack.png"));	
	var tfm = 'S0.5,0.5,0,5';
	obj.getReference ().transform(tfm);
	obj.addShadow ();	
	cards.push (obj);	
	
	placeScreenObject (obj,"bottomleft");	
}

/**
*
*/
function addIcons ()
{
	debug ("addIcons ()");
	
	var obj=new ImageObject ();
		
	obj.init (10,10,makeImagePath ("/descent/compass_rose.png"));	
	obj.addShadow ();		
	icons.push (obj);	
	
	//placeScreenObject (obj,"topleft");
}	

/**
*
*/
function addInteractionLayer ()
{
	debug ("addInteractionLayer ()");

	mouseHitBox=paper.rect(0, 0, windowWidth, windowHeight, 0).attr({cursor: 'move', fill: "#eeeeee", "fill-opacity": 0.0, stroke: "none"});
	mouseHitBox.mousedown(processMouseDown);
	mouseHitBox.mousemove(processMouseMove);
	mouseHitBox.mouseup(processMouseOut);
	
    $(mouseHitBox.node).bind('mousewheel', function(event, delta) 
	{		
        scale = delta > 0 ? 1.1 : 0.9;
		
		scaleScene (scale);				
    });	
}

/**
*
*/
function bindToCell (anObject,cellX,cellY)
{
	debug ("bindToCell ()");
	
	var xLocation=(cellX*tileWidth);
	var yLocation=(cellY*tileHeight);
	
	anObject.setPlace (xLocation+((tileWidth-anObject.getWidth ())/2),yLocation+((tileHeight-anObject.getHeight ())/2));
	anObject.setCellXY (cellX,cellY);
}

/**
*
*/
function startEngine ()
{
	debug ("startEngine ()");
		
	var canvas=document.getElementById("canvas");
	
	canvas.style.width = (windowWidth+'px');
	canvas.style.height = (windowHeight+'px');
	
	paper = Raphael("canvas", windowWidth, windowHeight);
	   
	addChunk (0,0);
	addChunk (3,0);
	addChunk (0,3);
	addChunk (3,3);
		
	addObjects();
	
	//addCards ();	
	
	addIcons ();
	
	addInteractionLayer ();
	
	calculateLights ();
	
	createDies ();
	
	window.setInterval(eventTick,1000);	
}

/**
*
*/
function placeScreenObject (anObj,aLocation)
{
	debug ("placeScreenObject ("+aLocation+")");

	if (aLocation=="topleft")
	{
		anObj.setPlace (windowPadding,windowPadding);
	}
	
	if (aLocation=="topright")
	{
		anObj.setPlace (windowWidth-anObj.getWidth ()-windowPadding,windowPadding);
	}

	if (aLocation=="bottomleft")
	{
		anObj.setPlace (windowPadding,windowHeight-anObj.getHeight()-windowPadding);
	}
	
	if (aLocation=="bottomright")
	{
		anObj.setPlace (windowWidth-anObj.getWidth ()-windowPadding,windowHeight-anObj.getHeight()-windowPadding);
	}	
}

/**
*
*/
function eventTick ()
{
	if (nextTimeout<=0)
	{
		nextTimeout=Math.floor(Math.random() * 20); // max 5 seconds
	
		if (diePool!=null)
		{
			diePool.unload ();
		}
	
		diePool=new DiePool ();
		diePool.addDie (getDie (Math.floor(Math.random() * 6)));
		diePool.addDie (getDie (Math.floor(Math.random() * 6)));
		diePool.addDie (getDie (Math.floor(Math.random() * 6)));
		diePool.addDie (getDie (Math.floor(Math.random() * 6)));
		diePool.roll ();
	}
	else
	{
		nextTimeout--;
	}
}

