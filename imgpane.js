/*

file: imgpane.js
description: ImagePane Class

version: 0.2-1
last updated: 2010-10-06

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
function ImgPane (type, id, bgStyle, fgStyle)
{
	if (!type) type = 'imgpane';
	Pane.call(this, type, id, bgStyle);

	bgType = this.type + '-bg';
	bgId = this.id + '-bg';
	this.addChild('bg', null, bgType, bgId);

	this.img = document.createElement('img');
	this.appendChild(this.img);

	this.change = function (im)
	{
		im2 = this.img
		this.removeChild(im2);
		this.img = im;
		this.appendChild(this.img);
		return im2;
	}
}
// class ImgPane ends
// Classes ends

//  4. Functions
function makeImgPane (pane, type, id, bgStyle, fgStyle)
{
	if (!pane) pane = document.createElement('div');

	ImgPane.call(pane, type, id, bgStyle, fgStyle);

	return pane;
}

// Functions ends

//  5. init
if (window.makefns)
	makefns['imgpane'] = makeImgPane;
// init ends
