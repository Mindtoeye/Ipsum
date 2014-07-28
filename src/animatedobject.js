
/**
*
*/
function AnimatedObject ()
{
    DescentObject.call(this, "AnimatedObject","object");

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

DescentObject.prototype = Object.create(DescentObject.prototype);
DescentObject.prototype.constructor = DescentObject;
