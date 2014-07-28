
/**
*
*/
function DescentObject ()
{
    Base.call(this, "AnimatedObject","object");
	
	var placeX=0;
	var placeY=0;
	var label="undefined";
	
	var reference=null;
	var glowSet=null;
	var anim=null;
	
	var sparks=null;
	
	var cellX=0;
	var cellY=0;

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
			reference.attr({x: placeX, y: placeY});
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
			var bbox=reference.getBBox (false);
			
			return (bbox.width);
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
			var bbox=reference.getBBox (false);
			
			return (bbox.width);
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
		
		reference = paper.rect(placeX,placeY, 20, 20).attr({fill: '#F00'});		
	};
	
	/**
	*
	*/
	this.move=function move (deltaX,deltaY)
	{
		placeX+=deltaX;
		placeY+=deltaY;
					
		if (reference!=null)
		{
			reference.attr({x: placeX, y: placeY});
		
			if (glowSet!=null)
			{
				for (var i=0;i<glowSet.length;i++)
				{			
					glowSet [i].attr({x: placeX, y: placeY});
				}	
			}
		}	
		
		if (sparks!=null)
		{
			sparks.move(placeX, placeY);
		}
	};
	
	/**
	*
	*/
	this.addSparks=function addSparks ()
	{
		sparks = new Sparks(paper);
		
		// Move particle generator
		sparks.settings.color = '#eee';
		sparks.settings.radius = 3;	
		sparks.move(placeX, placeY);
		sparks.start();
	};
	
	/**
	*
	*/
	this.addShadow=function addShadow ()
	{
		if (reference!=null)
		{
			reference.glow({color: '#000', offsetx: 2, offsety: 2 });
		}	
	};
}

DescentObject.prototype = Object.create(Base.prototype);
DescentObject.prototype.constructor = Base;
