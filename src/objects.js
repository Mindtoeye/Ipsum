

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

