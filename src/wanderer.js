
/**
*
*/
function Wanderer (aReference)
{
    IpsumObject.call(this, "Wanderer","wandere");
	
	var runningCount=0;
	var runningXDelta=0.5;
	var runningYDelta=0.5;
	
	this.setReference (aReference);

	/**
	*
	*/
	this.init=function init ()
	{
		debug ("init ()");
		
	};		
	/**
	*
	*/
	this.update=function update()
	{
		if (this.getReference ()==null)
		{
			return;
		}
	
		if (runningCount<0)
		{
			runningXDelta=Math.random()-0.5;
			runningYDelta=Math.random()-0.5;
			runningCount=getRandomInteger(5);
		}
		else
		{
			this.getReference ().position.x+=runningXDelta;
			this.getReference ().position.y+=runningYDelta;		
			runningCount--;
		}	
	};
}

Light.prototype = Object.create(IpsumObject.prototype);
Light.prototype.constructor = IpsumObject;
