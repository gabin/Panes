/*

file: imgpane.js
description: ImagePane Class

version: 0.3-1
last updated: 2010-10-11

author: gabin kattukaran <gabin@kattukaran.in>

copyright: all rights reserved. no part may be used.

TOC

 1. Constants & Config
 2. Globals
 3. Classes
 	 3.1 ImagePane
 4. Functions
	 4.1. makeImgPane ()
 5. init
 	 

Revision History

2010-10-02 - v0.2-1 rewrite of ImagePane class
2010-10-03 - v0.2-1 added global img pane, impn
                    added interface functions showimpn, hideimpn, shownext, showprev
										added init, keyHandler support and imgPaneSetup
2010-10-03 - v0.2-1 moved interface functions to photoframe.js
2010-10-06 - v0.2-1 added change () method

2010-10-11 - v0.3-1 rewrite of ImgPane class using new closure idiom

*/
//  1. Constants & Config
var defImgPad = 200;
// Constants & config ends

//  2. Globals
// Globals ends

//  3. Classes
/*
class: ImgPane
description: Image Pane
*/
function ImgPane (pane, type, id, bgStyle, fgStyle)
{
	if (!type) type = 'imgpane';
	pane = new Pane(pane, type, id);

	bgType = pane.className + '-bg';
	bgId = pane.id + '-bg';
	bg = new Pane(null, bgType, bgId, bgStyle);
	pane.addChild('bg', bg);

	pane.img = document.createElement('img');
	pane.appendChild(pane.img);

	pane.change = function (im)
	{
		im2 = pane.img
		pane.removeChild(im2);
		pane.img = im;
		pane.appendChild(this.img);
		return im2;
	}

	return pane;
}
// class ImgPane ends
// Classes ends

//  4. Functions
function makeImgPane (pane, type, id, bgStyle, fgStyle)
{
	return new ImgPane(pane, type, id, bgStyle, fgStyle);
}

// Functions ends

//  5. init
if (window.makefns)
	makefns['imgpane'] = makeImgPane;
// init ends
