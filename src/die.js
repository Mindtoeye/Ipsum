
/**
*
*/
function Die (aName,aTag)
{
	var name=aName;
	var tag=aTag;
	var value=0;
	var images=new Array ();
	var reference=null;
	var loadName="";
	
	/**
	*
	*/
	this.roll=function roll (anX,anY)
	{
		value=Math.floor((Math.random() * 6));
		
		loadName=(tag+value+".jpg");
		
		debug ("roll ("+name+","+loadName+")");
		
		reference=paper.image (makeImagePath ("/descent/"+loadName),anX,anY,30,28);
		reference.show().animate({ opacity : 1 }, 1000);
	};
	/**
	*
	*/
	this.unload=function unload ()
	{
		if (reference!=null)
		{
			reference.hide ();
			reference.remove ();
			reference.removeData ();
			reference=null;
		}	
	};
}
