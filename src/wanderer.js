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
		this.debug ("init ()");
		
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

function getWanderer (aReference)
{
	for (var i=0;i<wanderers.length;i++)
	{
		var aWanderer=wanderers [i];
		
		if (aWanderer.getReference ()==aReference)
		{
			return (aWanderer);
		}
	}

	return (null);
}

Light.prototype = Object.create(IpsumObject.prototype);
Light.prototype.constructor = IpsumObject;
