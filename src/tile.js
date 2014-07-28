
var tileWidth=128;
var tileHeight=128;

/**
*
*/
function Tile ()
{
    Base.call(this, "Tile","tile");
	
	var cellX =0;
	var cellY =0;	
	var tileX =0;
	var tileY =0;
	var width =tileWidth;
	var height=tileHeight;
	var src   ="textures/";
	var image =null;
	var shade =null;
	

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
	this.setX=function setX (aValue)
	{
		tileX=aValue;
	};
	/**
	*
	*/
	this.getX=function getX ()
	{
		return (tileX);
	};
	
	/**
	*
	*/
	this.setY=function setY (aValue)
	{
		tileY=aValue;
	};
	/**
	*
	*/
	this.getY=function getY ()
	{
		return (tileY);
	};
	
	/**
	*
	*/
	this.setWidth=function setWidth (aValue)
	{
		width=aValue;
	};
	/**
	*
	*/
	this.getWidth=function getWidth ()
	{
		return (width);
	};	
	
	/**
	*
	*/
	this.setHeight=function setHeight (aValue)
	{
		height=aValue;
	};
	/**
	*
	*/
	this.getHeight=function getHeight ()
	{
		return (height);
	};	
	
	/**
	*
	*/
	this.setSrc=function setSrc (aValue)
	{
		src=aValue;
	};
	/**
	*
	*/
	this.getSrc=function getSrc ()
	{
		return (src);
	};
	
	/**
	*
	*/
	this.move=function move (deltaX,deltaY)
	{
		tileX+=deltaX;
		tileY+=deltaY;
			
		if (image!=null)
		{
			image.attr({x: tileX, y: tileY});
			shade.attr({x: tileX, y: tileY});
		}	
	};
	
	/**
	*
	*/
	this.place=function place (anX,anY)
	{
		tileX=anX;
		tileY=anY;
	
		if (image!=null)
		{
			image.attr({x: anX, y: anY});	
			shade.attr({x: anX, y: anY});			
		}	
	};
	
	/**
	*
	*/
	this.resize=function (aWidth,aHeight)
	{
		if (image!=null)
		{
			image.attr ({width: tileWidth, height: tileHeight});
			shade.attr ({width: tileWidth, height: tileHeight});
		}
	};
	
	/**
	*
	*/
	this.load=function load (url)
	{
		this.setSrc (url);
		
		if (paper!=null)
		{
			shade=paper.rect(tileX,tileY,128,128, 0).attr({fill: "#000000", "fill-opacity": defaultBrightness, stroke: "none"});
			image=paper.image (url,tileX,tileY,128,128);
			
			shade.toBack ();		
			image.toBack ();		
		}
	};
	
	/**
	*
	*/
	this.setBrightness=function setBrightness (aValue)
	{
		if (shade!=null)
		{
			shade.attr({"fill-opacity": aValue});
		}	
	};
	
	/**
	*
	*/
	this.unload=function unload ()
	{
		if (image!=null)
		{
			image.hide ();
			image.remove ();
			image.removeData ();
			
			shade.hide ();
			shade.remove ();
			shade.removeData ();			
		}
	};
}

Tile.prototype = Object.create(Base.prototype);
Tile.prototype.constructor = Base;
