
var calculatingLights=false; // Mutex

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
function moveLights (anX,anY)
{
	for (var i=0;i<lights.length;i++)
	{
		lights [i].move (anX,anY);
	}
}

/**
*
*/
function calculateLights ()
{
	//debug ("calculateLights ()");
	
	if (calculatingLights==true)
	{
		return;
	}
	
	calculatingLights=true;
	
	for (var i=0;i<lights.length;i++)
	{
		var aLight=lights [i];
		
		aLight.vacillate ();
		
		var cellX=aLight.getCellX ();
		var cellY=aLight.getCellY ();
		
		//debug ("Processing light " + i + ", at: " + cellX + ", " + cellY);
		
		var newBrightness=aLight.getBrightness ();

		var aCenter=getTile (cellX,cellY);
		
		if (aCenter!=null)
		{
			aCenter.setBrightness (newBrightness);
		}
		else
			debug ("Tile to light not found");
						
		// Change the brightness of all the tiles around this light
		
		var newFalloff=newBrightness+0.1;
		
		newFalloff+=0.1;
		
		if (newFalloff>defaultBrightness)
		{
			newFalloff=defaultBrightness;
		}
		
		//debug ("Brightness: " + newBrightness + ", Falloff: " + newFalloff);
				
		var aCenterA=getTile (cellX-1,cellY-1);
		var aCenterB=getTile (cellX,cellY-1);
		var aCenterC=getTile (cellX+1,cellY-1);
		
		var aCenterD=getTile (cellX-1,cellY);
		// aCenter,aCenterF
		var aCenterF=getTile (cellX+1,cellY);
		
		var aCenterG=getTile (cellX-1,cellY+1);
		var aCenterH=getTile (cellX,cellY+1);
		var aCenterI=getTile (cellX+1,cellY+1);		
		
		if (aCenterA!=null) { aCenterA.setBrightness (newFalloff); }
		if (aCenterB!=null) { aCenterB.setBrightness (newFalloff); }
		if (aCenterC!=null) { aCenterC.setBrightness (newFalloff); }
		
		if (aCenterD!=null) { aCenterD.setBrightness (newFalloff); }
		if (aCenterF!=null) { aCenterF.setBrightness (newFalloff); }
		
		if (aCenterG!=null) { aCenterG.setBrightness (newFalloff); }
		if (aCenterH!=null) { aCenterH.setBrightness (newFalloff); }
		if (aCenterI!=null) { aCenterI.setBrightness (newFalloff); }
	}
	
	calculatingLights=false;
}
