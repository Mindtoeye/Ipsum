
/**
*
*/
function Card ()
{
    IpsumObject.call(this, "Card","object");

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

Card.prototype = Object.create(IpsumObject.prototype);
Card.prototype.constructor = IpsumObject;
