
/**
*
*/
function Card ()
{
    DescentObject.call(this, "Card","object");

	/**
	*
	*/
	this.init=function init (anX,anY,aWidth,aHeight,aURL)
	{
		this.debug ("init ("+anX+","+anY+","+aURL+")");
		
		this.setPlace (anX,anY);
		this.setLabel (aURL);
	
		this.setReference (paper.image (aURL,anX,anY,aWidth,aHeight));
	};
}

Card.prototype = Object.create(DescentObject.prototype);
Card.prototype.constructor = DescentObject;
