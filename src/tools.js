
/**
*
*/
function makeImagePath (aFile)
{
	return ("textures/" + aFile);
}

/**
*
*/
function getRandomCell ()
{
	return (Math.floor((Math.random() * (5))));
}

/**
*
*/
function removeFromArray (anArray,anObject)
{
	var index = anArray.indexOf(anObject);
	
	if (index > -1) 
	{
		anArray.splice(index, 1);
	}	
}

function setStatus (aMessage)
{	
	document.getElementById("statusbar").innerHTML=aMessage;
}
