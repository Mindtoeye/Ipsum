
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

/**
*
*/
function getRandomTile ()
{		
	var testTile=tilesources [Math.floor((Math.random() * (tilesources.length-1)) + 1)];
	
	while (testTile.indexOf ('G')!=0) // pick only grass
	{
		testTile=tilesources [Math.floor((Math.random() * (tilesources.length-1)) + 1)];
	}

	return (testTile);
}

/**
*
*/
function getRandomInteger (aRange)
{
	return (Math.floor((Math.random() * (aRange-1)) + 1));
}
	