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
 
// Graphics

var paper=null;
var scale=1;
var defaultBrightness=0.9;
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

var camera=null;
var scene=null;
var renderer=null;
var mesh=null;

var clock = new THREE.Clock;
var cube=null;
var chunkRoot=null;
var sceneRoot=null;
var lightRoot=null;
var wanderers=new Array ();
var windowPlane=null;

// Mouse support

var mouseHitBox=null;
var xDown=0;
var yDown=0;
var xLast=0;
var yLast=0;
var mouseMoving=false;
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

// GUI settings

var windowWidth=800;
var windowHeight=640;
var windowPadding=5;

var windowTop=0;
var windowLeft=0;
var windowRight=0;
var windowBottom=0;

// Events

var nextTimeout=0;

// Game objects

var globalXReference=0;
var globalYReference=0;
var diePool=null;

var tileWidth=10;
var tileHeight=10;
var tileXExtend=2;
var tileYExtend=2;