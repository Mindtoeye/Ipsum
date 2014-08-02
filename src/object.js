
/**
*
*/
function IpsumObject ()
{
    Base.call(this, "IpsumObject","object");
	
	var placeX=0;
	var placeY=0;	
	var cellX=0;
	var cellY=0;	
	var label="undefined";	
	var reference=null;
	
	/**
	*
	*/
	this.init=function init ()
	{
		debug ("To be implemented in child class");
	};	
	
	/**
	*
	*/
	this.setLabel=function setLabel (aLabel)
	{
		label=aLabel;
	};
	
	/**
	*
	*/
	this.getLabel=function getLabel ()
	{
		return (label);
	};	
	
	/**
	*
	*/
	this.setPlace=function setPlace (anX,anY)
	{
		placeX=anX;
		placeY=anY;
		
		if (reference!=null)
		{
			reference.position.x=placeX;
			reference.position.y=placeY;
		}
	};
	
	/**
	*
	*/
	this.getX=function getX ()
	{
		return (placeX);
	};
	
	/**
	*
	*/
	this.getY=function getY ()
	{
		return (placeY);
	};
	
	/**
	*
	*/
	this.setCellXY=function setCellXY (anX,anY)
	{
		cellX=anX;
		cellY=anY;
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
	this.getCellY=function getCellY ()
	{
		return (cellY);
	};		
	
	/**
	*
	*/
	this.getWidth=function getWidth ()
	{
		if (reference!=null)
		{

			return (0);
		}
		
		return (0);
	};

	/**
	*
	*/
	this.getHeight=function getHeight ()
	{
		if (reference!=null)
		{
			return (0);
		}
		
		return (0);
	};	
	
	/**
	*
	*/
	this.setReference=function setReference (aRef)
	{
		reference=aRef;
	};
	
	/**
	*
	*/
	this.getReference=function getReference ()
	{
		return (reference);
	};
	
	/**
	*
	*/
	this.init=function init (anX,anY,aLabel)
	{
		this.debug ("init ("+anX+","+anY+","+aLabel+")");
		
		placeX=anX;
		placeY=anY;
		label=aLabel;	
		
	};
	
	/**
	*
	*/
	this.move=function move (deltaX,deltaY)
	{
		placeX+=deltaX;
		placeY+=deltaY;

	};
}

IpsumObject.prototype = Object.create(Base.prototype);
IpsumObject.prototype.constructor = Base;
