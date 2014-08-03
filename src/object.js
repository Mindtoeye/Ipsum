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
function IpsumObject ()
{
    Base.call(this, "IpsumObject","object");
	
	var placeX=0;
	var placeY=0;	
	var cellX=0;
	var cellY=0;	
	var label="undefined";	
	var reference=null;
	
	/**
	*
	*/
	this.init=function init ()
	{
		this.debug ("To be implemented in child class");
	};	
	
	/**
	*
	*/
	this.setLabel=function setLabel (aLabel)
	{
		label=aLabel;
	};
	
	/**
	*
	*/
	this.getLabel=function getLabel ()
	{
		return (label);
	};	
	
	/**
	*
	*/
	this.setPlace=function setPlace (anX,anY)
	{
		placeX=anX;
		placeY=anY;
		
		if (reference!=null)
		{
			reference.position.x=placeX;
			reference.position.y=placeY;
		}
	};
	
	/**
	*
	*/
	this.getX=function getX ()
	{
		return (placeX);
	};
	
	/**
	*
	*/
	this.getY=function getY ()
	{
		return (placeY);
	};
	
	/**
	*
	*/
	this.setCellXY=function setCellXY (anX,anY)
	{
		cellX=anX;
		cellY=anY;
	};
	
	/**
	*
	*/
	this.getCellX=function getCellX ()
	{
		return (cellX);
	};
	
	/**
	*
	*/
	this.getCellY=function getCellY ()
	{
		return (cellY);
	};		
	
	/**
	*
	*/
	this.getWidth=function getWidth ()
	{
		if (reference!=null)
		{

			return (0);
		}
		
		return (0);
	};

	/**
	*
	*/
	this.getHeight=function getHeight ()
	{
		if (reference!=null)
		{
			return (0);
		}
		
		return (0);
	};	
	
	/**
	*
	*/
	this.setReference=function setReference (aRef)
	{
		reference=aRef;
		
		if (reference!=null)
		{
			reference.castShadow = true;
			reference.receiveShadow = false;		
		}
	};
	
	/**
	*
	*/
	this.getReference=function getReference ()
	{
		return (reference);
	};
	
	/**
	*
	*/
	this.init=function init (anX,anY,aLabel)
	{
		this.this.debug ("init ("+anX+","+anY+","+aLabel+")");
		
		placeX=anX;
		placeY=anY;
		label=aLabel;	
		
	};
	
	/**
	*
	*/
	this.move=function move (deltaX,deltaY)
	{
		placeX+=deltaX;
		placeY+=deltaY;

	};
}

IpsumObject.prototype = Object.create(Base.prototype);
IpsumObject.prototype.constructor = Base;
