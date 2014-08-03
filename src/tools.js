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
function makeImagePath (aFile)
{
	return ("textures/" + aFile);
}

/**
*
*/
function getRandomCell ()
{
	return (Math.floor((Math.random() * (5))));
}

/**
*
*/
function removeFromArray (anArray,anObject)
{
	var index = anArray.indexOf(anObject);
	
	if (index > -1) 
	{
		anArray.splice(index, 1);
	}	
}

function setStatus (aMessage)
{	
	document.getElementById("statusbar").innerHTML=aMessage;
}

/**
*
*/
function getRandomTile ()
{		
	var testTile=tilesources [Math.floor((Math.random() * (tilesources.length-1)) + 1)];
	
	while (testTile.indexOf ('G')!=0) // pick only grass
	{
		testTile=tilesources [Math.floor((Math.random() * (tilesources.length-1)) + 1)];
	}

	return (testTile);
}

/**
*
*/
function getRandomInteger (aRange)
{
	return (Math.floor((Math.random() * (aRange-1)) + 1));
}

/**
*
*/
function getScreenX2Cartesian (anX)
{
	return ( (anX / windowWidth ) * 2 - 1);
}

/**
*
*/
function getScreenY2Cartesian (anY)
{
	return ( (anY / windowHeight ) * 2 - 1);
}