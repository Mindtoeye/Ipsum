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

	if (mouseDown==false)
	{
		//debug ("bump (mouseDown)");
		return;
	}	
	
	if (mouseMoving==true)
	{
		//debug ("bump (mouseMoving)");
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

	globalXReference+=(fx-xLast);
	globalYReference+=(fy-yLast);
	
	setStatus ("x: " + globalXReference + ", y: " + globalYReference);
	
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

/**
*
*/
function moveScene (deltaX,deltaY)
{
	//debug ("moveScene ("+deltaX+","+deltaY+")");

	var i=0;

	moveChunks (deltaX,deltaY);
	
	for (i=0;i<objects.length;i++)
	{
		objects [i].move (deltaX,deltaY);
	}
	
	moveLights (deltaX,deltaY);
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
	window.setInterval(calculateLights,200);
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
* Main even tick occuring once a second. Use this to setup non real-time events
* that do not have to occur frequently
*/
function eventTick ()
{
	//calculateLights ();

	if (nextTimeout<=0)
	{
		nextTimeout=Math.floor(Math.random() * 20); // max 5 seconds
	
		/*
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
		*/
	}
	else
	{
		nextTimeout--;
	}
}

