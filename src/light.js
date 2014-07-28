
/**
*
*/
function Light ()
{
    DescentObject.call(this, "Light","light");
	
	var currentValue=defaultBrightness;
	var up=false;

	/**
	*
	*/
	this.vacillate=function vacillate ()
	{
		if (up==false)
		{
			currentValue+=0.1;
			
			if (currentValue>defaultBrightness)
			{
				up=true;
			}
		}
		else
		{
			currentValue-=0.1;
			
			if (currentValue<0.2)
			{
				up=false;
			}		
		}
	};
	/**
	*
	*/
	this.getBrightness=function getBrightness ()
	{
		return (currentValue);
	};
	/**
	*
	*/
	this.init=function init (anX,anY,aLabel)
	{
		this.setPlace (anX,anY);
		this.setLabel (aLabel);
		
		this.debug ("init ("+anX+","+anY+","+aLabel+")");	
		this.setReference (paper.rect(anX,anY, 20, 20).attr({fill: '#ffff00'}));
		
		anim = Raphael.animation({transform: "r360"}, 5000).repeat(Infinity);
		this.getReference ().animate(anim);
	};
}

Light.prototype = Object.create(DescentObject.prototype);
Light.prototype.constructor = DescentObject;