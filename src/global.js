
// Graphics

var paper=null;
var scale=1;
var defaultBrightness=0.8;
var maxBrightness=0.2;

// World objects
	
var chunks=new Array ();
var chunksCache=new Array ();
var objects=new Array ();
var icons=new Array ();
var lights=new Array ();
var dies=new Array ();
var cards=new Array ();

var objID=0;

// Mouse support

var mouseHitBox=null;
var xDown=0;
var yDown=0;
var xLast=0;
var yLast=0;
var mouseDown=false;
var mouseMoving=false;

// GUI settings

var windowWidth=800;
var windowHeight=640;
var windowPadding=5;

// Events

var nextTimeout=0;

// Game objects

var globalXReference=0;
var globalYReference=0;
var diePool=null;

