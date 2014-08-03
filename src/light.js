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
function Light ()
{
    IpsumObject.call(this, "Light","light");
	
	var type=0;
	var currentValue=defaultBrightness;
	var up=false;
	var light=null;
		
	/**
	*
	*/
	this.init=function init ()
	{
		this.debug ("init ()");
		
		var lightGroup = new THREE.Object3D();	
		//var lightGeometry = new THREE.SphereGeometry(1,5,5);
		var lightGeometry = new THREE.BoxGeometry(1,1,1);
		var lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff22 });
		cube = new THREE.Mesh(lightGeometry, lightMaterial); 
		lightGroup.add(cube);	
							
		light = new THREE.PointLight(0xffffff);
		light.intensity = defaultBrightness;
		lightGroup.add(light);
		
		this.setReference (lightGroup);		
		
		/*
		this.setType (getRandomInteger (3));
		this.debug ("Light type: " + this.getType ());
		*/
	};		
	
	/**
	*
	*/
	this.setType=function setType (aType)
	{
		type=aType;
	};
	
	/**
	*
	*/
	this.getType=function getType ()
	{
		return (type);
	};
	
	/**
	*
	*/
	this.vacillate=function vacillate ()
	{
		if (up==false)
		{
			currentValue+=0.1;
			
			if (currentValue>defaultBrightness)
			{
				up=true;
			}
		}
		else
		{
			currentValue-=0.1;
			
			if (currentValue<0.5)
			{
				up=false;
			}		
		}
		
		light.intensity=currentValue;
	};
	/**
	*
	*/
	this.getBrightness=function getBrightness ()
	{
		return (currentValue);
	};	
}

Light.prototype = Object.create(IpsumObject.prototype);
Light.prototype.constructor = IpsumObject;
