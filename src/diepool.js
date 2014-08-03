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
function DiePool ()
{
	var dies=new Array ();
	
	/**
	*
	*/
	this.addDie=function addDie (aDie)
	{
		dies.push (aDie);
	};
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
	};
}
