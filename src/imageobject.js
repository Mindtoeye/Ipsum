
/**
*
*/
function ImageObject ()
{
    DescentObject.call(this, "ImageObject","object");

	/**
	*
	*/
	this.init=function init (anX,anY,aURL)
	{
		this.debug ("init ("+anX+","+anY+","+aURL+")");
		
		this.setPlace (anX,anY);
		this.setLabel (aURL);
	
		this.setReference (paper.image (aURL,anX,anY,64,64));
	}
}

ImageObject.prototype = Object.create(DescentObject.prototype);
ImageObject.prototype.constructor = DescentObject;
