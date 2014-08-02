
var lights=new Array ();

/**
*
*/
function addLight ()
{
	debug ("addLight ()");
	
	var aLight = new Light ();
	aLight.init ();
	
	lights.push (aLight);
	
	return (aLight);
}
/**
*
*/
function createLights ()
{
	debug ("createLights ()");
	
	lightRoot=addLight ();
	sceneRoot.add (lightRoot.getReference ());	
	lightRoot.getReference ().position.set(0,0,10);
	wanderers.push (new Wanderer (lightRoot.getReference ()));
	
	lightRoot=addLight ();
	sceneRoot.add (lightRoot.getReference ());	
	lightRoot.getReference ().position.set(0,0,10);
	wanderers.push (new Wanderer (lightRoot.getReference ()));	
}
/**
*
*/
function checkLights ()
{
	for (var i=0;i<lights.length;i++)
	{
		var aLight=lights [i];
		

	}
}
