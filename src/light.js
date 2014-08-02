
/**
*
*/
function Light ()
{
    IpsumObject.call(this, "Light","light");
		
	/**
	*
	*/
	this.init=function init ()
	{
		debug ("init ()");
		
		var currentValue=defaultBrightness;
		var up=false;

		var lightGroup = new THREE.Object3D();	
		//var lightGeometry = new THREE.SphereGeometry(1,5,5);
		var lightGeometry = new THREE.BoxGeometry(1,1,1);
		var lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff22 });
		cube = new THREE.Mesh(lightGeometry, lightMaterial); 
		lightGroup.add(cube);	
							
		var light = new THREE.PointLight(0xffffff);
		light.intensity = 0.90;
		lightGroup.add(light);
		
		this.setReference (lightGroup);		
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
			
			if (currentValue<0.2)
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
