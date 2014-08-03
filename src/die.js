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
