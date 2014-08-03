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
function AnimatedObject ()
{
    IpsumObject.call(this, "AnimatedObject","object");

	var objectGeometry = null;
	var objectTexture = null;
	var objectPolygonMaterial = null;
	var object = null;
		
	/**
	*
	*/
	this.init=function init ()
	{
		this.debug ("init ()");
		
		var objectGeometry = new THREE.BoxGeometry(5,5,5);
		var objectTexture = THREE.ImageUtils.loadTexture ('textures/crate.gif');
		var objectPolygonMaterial = new THREE.MeshLambertMaterial ({map: objectTexture});
		var object = new THREE.Mesh (objectGeometry,objectPolygonMaterial);
		
		this.setReference (object);
		
		object.position.z=2.5;
	};
}

AnimatedObject.prototype = Object.create(IpsumObject.prototype);
AnimatedObject.prototype.constructor = IpsumObject;
