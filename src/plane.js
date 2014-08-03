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
function Plane (aX,aY,aWidth,aHeight)
{
    IpsumObject.call(this, "Plane","plane");
	
	var geo = new THREE.Geometry();
	var polygonObject = null;

	/**
	*
	*/
	this.init=function init ()
	{
		this.debug ("init ()");
		
		geo.vertices.push( new THREE.Vector3( aX, aY, 0.0 ) );
		geo.vertices.push( new THREE.Vector3( aX, aY+aHeight, 0.0 ) );
		geo.vertices.push( new THREE.Vector3( aX+aWidth, aY+aHeight, 0.0 ) );
		geo.vertices.push( new THREE.Vector3( aX+aWidth, aY, 0.0 ) );
						
		geo.faces.push (new THREE.Face3(0,1,2));
		geo.faces.push (new THREE.Face3(0,2,3));
				
		// Just as a note the plane material doesn't have to be transparent but it helps to
		// prevent making any mistakes using them because they will always be hidden
		var myPolygonMaterial = new THREE.MeshBasicMaterial ({color: 0xffffff, transparent: true, opacity: 0.0});		
		//var myPolygonMaterial = new THREE.MeshBasicMaterial ({color: 0xffffff});		
		myPolygonMaterial.side = THREE.DoubleSide; // VERY IMPORTANT
		polygonObject = new THREE.Mesh (geo,myPolygonMaterial);

		this.setReference (polygonObject);		
	};		
	
	/**
	*
	*/
	this.setCellX=function setCellX (aValue)
	{
		cellX=aValue;
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
	this.setCellY=function setCellY (aValue)
	{
		cellY=aValue;
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
	this.setX=function setX (aValue)
	{
		tileX=aValue;
	};
	/**
	*
	*/
	this.getX=function getX ()
	{
		return (tileX);
	};
	
	/**
	*
	*/
	this.setY=function setY (aValue)
	{
		tileY=aValue;
	};
	/**
	*
	*/
	this.getY=function getY ()
	{
		return (tileY);
	};
	
	/**
	*
	*/
	this.setWidth=function setWidth (aValue)
	{
		width=aValue;
	};
	/**
	*
	*/
	this.getWidth=function getWidth ()
	{
		return (width);
	};	
	
	/**
	*
	*/
	this.setHeight=function setHeight (aValue)
	{
		height=aValue;
	};
	/**
	*
	*/
	this.getHeight=function getHeight ()
	{
		return (height);
	};	
	
	/**
	*
	*/
	this.setSrc=function setSrc (aValue)
	{
		src=aValue;
	};
	/**
	*
	*/
	this.getSrc=function getSrc ()
	{
		return (src);
	};
	
	/**
	*
	*/
	this.move=function move (deltaX,deltaY)
	{
		tileX+=deltaX;
		tileY+=deltaY;

		polygonObject.position.x=tileX;
		polygonObject.position.y=tileY;
	};
	
	/**
	*
	*/
	this.place=function place (anX,anY)
	{
		tileX=anX;
		tileY=anY;
	
		polygonObject.position.x=tileX;
		polygonObject.position.y=tileY;
	};
	
	/**
	*
	*/
	this.resize=function (aWidth,aHeight)
	{

	};
}

Plane.prototype = Object.create(IpsumObject.prototype);
Plane.prototype.constructor = IpsumObject;
