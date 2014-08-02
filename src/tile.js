
var uvs = [];
uvs.push( new THREE.Vector2( 0.0, 0.0 ) );
uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
uvs.push( new THREE.Vector2( 0.0, 1.0 ) );	

/**
*
*/
function Tile (aTexture)
{
    IpsumObject.call(this, "Tile","tile");
	
	var cellX =0;
	var cellY =0;	
	var tileX =0;
	var tileY =0;
	var width =tileWidth;
	var height=tileHeight;

	var myTexture = null;
	var myPolygonMaterial = null;
	var polygonObject = null;
	var geo = new THREE.Geometry();

	/**
	*
	*/
	this.init=function init ()
	{
		debug ("init ()");
		
		geo.vertices.push( new THREE.Vector3( 0.0, 0.0, 0.0 ) );
		geo.vertices.push( new THREE.Vector3( tileWidth, 0.0, 0.0 ) );
		geo.vertices.push( new THREE.Vector3( tileWidth, tileWidth, 0.0 ) );
		geo.vertices.push( new THREE.Vector3( 0.0, tileWidth, 0.0 ) );
						
		geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
		geo.faces.push( new THREE.Face3( 0, 2, 3 ) );
		
		geo.faceVertexUvs [0].push([ uvs[0], uvs[1], uvs[2]]);
		geo.faceVertexUvs [0].push([ uvs[0], uvs[2], uvs[3]]);
		geo.computeFaceNormals();
		
		myTexture = THREE.ImageUtils.loadTexture (aTexture);
		myPolygonMaterial = new THREE.MeshLambertMaterial ({map: myTexture});
		myPolygonMaterial.side = THREE.DoubleSide;
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
	
	/**
	*
	*/
	this.load=function load ()
	{

	};
	
	/**
	*
	*/
	this.setBrightness=function setBrightness (aValue)
	{
		myPolygonMaterial.opacity=aValue;
	};
	
	/**
	*
	*/
	this.unload=function unload ()
	{
		
	};
}

Tile.prototype = Object.create(IpsumObject.prototype);
Tile.prototype.constructor = IpsumObject;
