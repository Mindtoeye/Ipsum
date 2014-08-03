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
function Chunk ()
{
    Base.call(this, "Chunk","chunk");
	
	var cells=null;
	var loaded=false;
	
	var cellX =0; // top left cell
	var cellY =0; // top left cell	
	
	var chunkLeft=0;
	var chunkTop=0;
	var chunkRight=0;
	var chunkBottom=0;
	
	/**
	*
	*/
	this.setCellX=function setCellX (aValue)
	{
		cellX=aValue;
	};
	/**
	*
	*/
	this.getCellX=function getCellX ()
	{
		return (cellX);
	};
	
	/**
	*
	*/
	this.setCellY=function setCellY (aValue)
	{
		cellY=aValue;
	};
	/**
	*
	*/
	this.getCellY=function getCellY ()
	{
		return (cellY);
	};
	
	/**
	*
	*/
	this.place=function place (tileX,tileY)
	{		
		placeX=tileX*tileWidth;
		placeY=tileY*tileHeight;
		
		this.setCellX (tileX);
		this.setCellY (tileY);
	};
	
	/**
	* Nice and quick way to get a target tile. Nice because it ONLY
	* finds visible tiles!
	*/
	this.getTile=function getTile (cellX,cellY)
	{
		//this.debug ("getTile ("+cellX+","+cellY+")");
		
		for (var i=0;i<cells.length;i++)
		{
			var testTile=cells [i];
			
			//this.debug ("Comparing " + cellX + "," + cellY + ", to: " + testTile.getCellX () + "," + testTile.getCellY ());
			
			if ((testTile.getCellX ()==cellX) && (testTile.getCellY ()==cellY))
			{
				return (testTile);
			}
		}	
				
		return (null);
	};
	
	/**
	*
	*/
	this.load=function load ()
	{		
		if (loaded==true)
		{
			//this.debug ("Already loaded");
			return;
		}
		
		this.this.debug ("load ()");		
	
		cells=new Array (); // A bit too brute force
	
		var cell=null;

		// Row 1 ...
		
		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX);
		cell.setCellY (cellY);
		cells.push (cell);
				
		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX+1);
		cell.setCellY (cellY);		
		cells.push (cell);

		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX+2);
		cell.setCellY (cellY);		
		cells.push (cell);

		// Row 2 ...
		
		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX);
		cell.setCellY (cellY+1);		
		cells.push (cell);
		
		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX+1);
		cell.setCellY (cellY+1);		
		cells.push (cell);

		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX+2);
		cell.setCellY (cellY+1);		
		cells.push (cell);

		// Row 3 ...
		
		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX);
		cell.setCellY (cellY+2);
		cells.push (cell);
		
		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX+1);
		cell.setCellY (cellY+2);		
		cells.push (cell);

		cell=new Tile ();
		cell.load (makeImagePath (getRandomTile ()));
		cell.setCellX (cellX+2);
		cell.setCellY (cellY+2);		
		cells.push (cell);
		
		cells [0].place(placeX,placeY);	
		cells [1].place(placeX+tileWidth,placeY);	
		cells [2].place(placeX+tileWidth+tileWidth,placeY);	
		
		cells [3].place(placeX,placeY+tileHeight);	
		cells [4].place(placeX+tileWidth,placeY+tileHeight);	
		cells [5].place(placeX+tileWidth+tileWidth,placeY+tileHeight);	
		
		cells [6].place(placeX,placeY+tileHeight+tileHeight);
		cells [7].place(placeX+tileWidth,placeY+tileHeight+tileHeight);	
		cells [8].place(placeX+tileWidth+tileWidth,placeY+tileHeight+tileHeight);
		
		// Essentially cell 0
		chunkLeft  =placeX;
		chunkTop   =placeY;
		
		// Essentially cell 8
		chunkRight =(placeX+(tileWidth*3));
		chunkBottom=(placeY+(tileHeight*3));
		
		loaded=true;
	};
	
	/**
	*
	*/
	this.unload=function unload ()
	{
		this.this.debug ("unload ()");
	
		if (cells==null)
		{
			// already unloaded
			return;
		}
		
		for (var i=0;i<cells.length;i++)
		{
			cells [i].unload ();
		}
		
		cells=null;
		
		loaded=false;
	};	

	/**
	*
	*/
	this.move=function move (deltaX,deltaY)
	{	
		chunkLeft+=deltaX;
		chunkTop+=deltaY;
		chunkRight+=deltaX;
		chunkBottom+=deltaY;
		
		if (loaded==false)
		{
			return;
		}		
	
		if (cells!=null)
		{
			for (var i=0;i<cells.length;i++)
			{
				cells [i].move (deltaX,deltaY);
			}
		}	
	};

	/**
	*
	*/
	this.testBounds=function testBounds (aLeft,aTop,aRight,aBottom)
	{
		//this.this.debug ("testBounds ("+aLeft+","+aTop+","+aRight+","+aBottom+")")

		if (chunkLeft>aRight)
		{
			//this.this.debug ("Chunk out of bounds (left)");
			return (false);
		}		
		
		if (chunkTop>aBottom)
		{
			//this.this.debug ("Chunk out of bounds (top)");
			return (false);
		}		
		
		if (chunkRight<aLeft)			
		{
			//this.this.debug ("Chunk out of bounds (right)");
			return (false);
		}

		if (chunkBottom<aTop)
		{
			//this.this.debug ("Chunk out of bounds (bottom)");
			return (false);
		}		

		return (true);
	};
}

Chunk.prototype = Object.create(Base.prototype);
Chunk.prototype.constructor = Base;
