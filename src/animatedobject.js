
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
		debug ("init ()");
		
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
