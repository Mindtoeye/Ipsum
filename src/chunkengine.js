
/**
* Nice and quick way to get target tile. Nice because it ONLY
* finds visible tiles!
*/
function getTile (cellX,cellY)
{
	//debug ("getTile ("+cellX+","+cellY+") - " + chunksCache.length);
	
	var found=null;
	
	for (var i=0;i<chunksCache.length;i++)
	{	
		var testChunk=chunksCache [i];
		
		found=testChunk.getTile (cellX,cellY);
		
		if (found!=null)
		{
			return (found);
		}
	}	
			
	return (null);
}

/**
*
*/
function placeScene (deltaX,deltaY)
{
	for (var i=0;i<chunksCache.length;i++)
	{
		chunksCache [i].place (deltaX,deltaY);
	}
}

/**
*
*/
function addChunk (cellX,cellY)
{
	debug ("addChunk ("+cellX+","+cellY+")");

   var chunk=new Chunk ();
   chunk.place (cellX,cellY); // Initial placement, should be remembered by the chunk
   chunk.load ();
   
   chunksCache.push (chunk);
}

/**
*
*/
function checkChunks ()
{
	var dirty=true;
	var removed=0;
	var added=0;
	
	var testTop=0;
	var testLeft=0;
	var testRight=mouseHitBox.attrs.width;
	var testBottom=mouseHitBox.attrs.height;
	
	var actualLeft  =globalXReference;
	var actualTop   =globalYReference;
	var actualRight =(globalXReference+windowWidth);
	var actualBottom=(globalYReference+windowHeight);	
	
	var i=0;
	
	while (dirty==true)
	{
		dirty=false;
	
		/* 
		   ======================================================
		   Check to see if we have to unload any chunks
		   ======================================================
		*/
	
		for (i=0;i<chunksCache.length;i++)
		{
			var testChunk=chunksCache [i];
			
			if (testChunk.testBounds (testTop,testLeft,testRight,testBottom)==false)
			{
				testChunk.unload ();
				removeFromArray (chunksCache,testChunk);
				movetoDataStore (testChunk);
				removed++;
				dirty=true;
				break;
			}
			/*
			else
			{
				testChunk.load ();
			}
			*/
		}
		
		/* 
		   ======================================================
		   Load chunks from data-store or create new ones for 
		   unexplored areas
		   ======================================================
		*/
		
		for (var i=0;i<chunksCache.length;i++)
		{
			var testChunk=chunksCache [i];
			
		}
	}
	
	document.getElementById("chunkinfo").innerHTML=("Chunks: " + chunksCache.length + ", Store: " + chunks.length + ", Added: " + added + ", Removed: " + removed + " ( " +actualLeft + "," + actualTop + "," + actualRight + "," + actualBottom +")");
}

/**
*
*/
function moveChunks (anX,anY)
{
	for (var i=0;i<chunksCache.length;i++)
	{
		chunksCache [i].move (anX,anY);
	}
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
function movetoDataStore (aChunk)
{
	chunks.push (aChunk);
}
