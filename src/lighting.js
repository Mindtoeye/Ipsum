/** 
 * Author: Martin van Velsen <vvelsen@cs.cmu.edu>
 * 
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as 
 *  published by the Free Software Foundation, either version 3 of the 
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

var lights=new Array ();

/**
*
*/
function addLight ()
{
	debug ("addLight ()");
	
	var aLight = new Light ();
	aLight.init ();
	
	lights.push (aLight);
	
	return (aLight);
}
/**
*
*/
function createLights ()
{
	debug ("createLights ()");
	
	for (var i=0;i<3;i++)
	{
		lightRoot=addLight ();
		sceneRoot.add (lightRoot.getReference ());	
		lightRoot.getReference ().position.set(getRandomInteger (30)-15,getRandomInteger (30)-15,10);
		wanderers.push (new Wanderer (lightRoot.getReference ()));	
	}	
}
/**
*
*/
function checkLights ()
{
	//debug ("checkLights ()");

	var found=false;
	
	for (var j=0;j<lights.length;j++)
	{
		var aLight=lights [j];
		
		if (aLight.getType ()==1)
		{
			aLight.vacillate ();
		}
	}		
	
	while (found==false)
	{	
		found=true;
		
		for (var i=0;i<lights.length;i++)
		{
			var aLight=lights [i];
			
			var lightX=aLight.getReference ().position.x;
			var lightY=aLight.getReference ().position.y;
			
			//debug ("Light: " + lightX + "," + lightY + ", Window: (" + windowLeft + "," + windowTop + "," + windowRight + "," + windowBottom);
			
			if ((lightX<windowLeft) || (lightX>windowRight) || (lightY>windowTop) || (lightY<windowBottom))
			{
				debug ("Removing light ("+i+")...");
			
				sceneRoot.remove (aLight.getReference ());
				
				var aWanderer=getWanderer (aLight.getReference ());
				if (aWanderer!=null)
				{
					removeFromArray (wanderers,aWanderer);
				}
				
				removeFromArray (lights,aLight);
				
				var newLight=addLight ();
				sceneRoot.add (newLight.getReference ());	
				newLight.getReference ().position.set(getRandomInteger (30)-15,getRandomInteger (30)-15,10);
				wanderers.push (new Wanderer (newLight.getReference ()));	
				
				found=false;
				break;
			}		
		}
	}	
}
