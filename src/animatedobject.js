
/**
*
*/
function AnimatedObject ()
{
    IpsumObject.call(this, "AnimatedObject","object");

	/**
	*
	*/
	this.init=function init (anX,anY,aLabel)
	{
		this.setPlace (anX,anY);
		this.setLabel (aLabel);
		
		this.debug ("init ("+anX+","+anY+","+aLabel+")");	
		this.setReference (paper.rect(anX,anY, 20, 20).attr({fill: '#F00'}));
		
		anim = Raphael.animation({transform: "r360"}, 5000).repeat(Infinity);
		this.getReference ().animate(anim);
	};
}

IpsumObject.prototype = Object.create(IpsumObject.prototype);
IpsumObject.prototype.constructor = IpsumObject;
