
/**
*
*/
function DiePool ()
{
	var dies=new Array ();
	
	/**
	*
	*/
	this.addDie=function addDie (aDie)
	{
		dies.push (aDie);
	}
	/**
	*
	*/
	this.roll=function roll ()
	{
		var yIndex=5;
	
		for (var i=0;i<dies.length;i++)
		{
			var aDie=dies [i];
			
			aDie.roll  (mouseHitBox.attrs.width-80,yIndex);
			
			yIndex+=34;
		}
	};
	/**
	*
	*/
	this.unload=function unload ()
	{
		for (var i=0;i<dies.length;i++)
		{
			var aDie=dies [i];
			
			aDie.unload  ();		
		}		
	}
}
