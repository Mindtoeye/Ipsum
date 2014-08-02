
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

