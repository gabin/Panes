/*

file: photoframe.js
description: unobtrusively adds photoframe functionality to an html page

version: 0.3
last updated: 2010-10-11

author: gabin kattukaran <gabin@kattukaran.in>

copyright: all rights reserved. no part may be used.

TOC

 1. Constants & Config
 2. Globals
 3. Classes
 	 3.1. Photoframe
 4. Functions
	 4.5. photoFrameSetup ()
 5. init
 	 

Revision History

2010-10-03 - v0.1 moved photoframe globals and functions from imgpane.js
2010-10-04 - v0.1 moved call to addLoadEvent() from try.js
2010-10-04 - v0.1 changed showimpn() to compute position using actual heights
2010-10-06 - v0.1 added Photoframe class
2010-10-07 - v0.1 added jumpTo(), new photoframeSetup() and hook for shade()

2010-10-07 - v0.3 rewrite of Photoframe class using new closure idiom
*/

//  2. Globals
var phrame;
var tms = [];
var srs = [];

var phrame;
// Globals ends

//  3. Classes
function Photoframe (pane, pnType, pnId, pnStyle)
{
	if (!pnType) pnType = 'photoframe';
	pane = new Pane(pane, pnType, pnId, pnStyle);

	var impn = new ImgPane(null, null, null, 'imgpane border');
	impn.attach(pane);
	var slbr = new SlBrPane(null, null, null, 'slbrpane border');
	slbr.attach(pane);

	// data management
	var thumbs = [];
	var srcs = [];
	var cur = 0;
	var nextim = null;
	var previm = null;
	var linked = false;


	// change sub panes to visible so that this pane's visibility will control them
	impn.show();
	slbr.show();

	pane.next = function ()
	{
		if (!nextim) return; // not initialized

		// add checks to ensure image has loaded

		previm = pane.showImg(nextim);
		cur = ++cur % srcs.length;

		if (linked) pane.syncSlBr();

		// preload next image
		next = (cur + 1) % srcs.length;
		nextim = document.createElement('img');
		nextim.src = srcs[next];
	}

	pane.prev = function ()
	{
		if (!previm) return; // not initialized

		// add checks to ensure image has loaded

		nextim = pane.showImg(previm);
		cur = (cur + srcs.length - 1) % srcs.length;

		if (linked) pane.syncSlBr();

		// preload prev image
		prev = (cur + srcs.length - 1) % srcs.length;
		previm = document.createElement('img');
		previm.src = srcs[prev];
	}

	pane.jumpTo = function (index)
	{
		if (typeof index == 'number') cur = index;

		im = document.createElement('img');
		im.src = srcs[cur];
		pane.showImg(im);


		// sync slide browser
		if (linked) pane.syncSlBr();

		// preload adjacent images
		prev = (cur + srcs.length - 1) % srcs.length;
		next = (cur + 1) % srcs.length;

		nextim = document.createElement('img');
		nextim.src = srcs[next];
		previm = document.createElement('img');
		previm.src = srcs[prev];
	}
	
	pane.link = function ()
	{
		linked = true;
	}
	
	pane.unlink = function ()
	{
		linked = false;
	}

	pane.syncSlBr = function ()
	{
		slbrcur = slbr.getElementsByTagName('img')[0];

		// currently centered slide is two ahead of the first element
		t = (slbrcur.c + 2) % srcs.length;
		if (cur > t)
		{
			slbr.right(cur - t);
		}
		else
		{
			slbr.left(t - cur);
		}
	}

	pane.showImg = function (img)
	{
		// shade
		pane.callHook('shade');

		// make the pane visible so that dimensions are available
		pane.show();

		// recompute top and left
		t = ((window.innerHeight - pane.offsetHeight) / 2) + window.pageYOffset;
		l = ((document.body.offsetWidth - pane.offsetWidth) / 2) + window.pageXOffset;
		pane.moveToY(t);
		pane.moveToX(l);

		// set new image
		im = impn.change(img);

		return im;
	}

	pane.setup = function (tms, srs)
	{
		// get all hrefs and put in pf.srcs
		// get all thumbs and append copies to slbrnextim.src = 'Photos/img_6581.jpg';pf.nextim = nextim
		thumbs = tms;
		srcs = srs;

		slbr.setSlides(tms);
	}

	return pane;
}
// Classes ends

//  4. Functions

function makePhotoframe (pane, type, id, bgStyle)
{
	return new Photoframe(pane, type, id, bgStyle);
}

function photoframeSetup ()
{
	phrame = new Photoframe(null, null, null, 'photoframe popup');
	phrame.showBG();
	phrame.attach(document.body);

	initShade();

	ims = document.getElementsByClassName('phrame');
	j = 0;
	for (i=0; i<ims.length; ++i)
	{
		if (ims[i].nodeName != 'A') break; // not a link

		ims[i].c = j; // add index to the element
		ims[i].addEventListener('click', function(e){phrame.jumpTo(this.c); e.preventDefault();}, true);
		tms[j] = document.createElement('img');
		tms[j].src = ims[i].childNodes[1].src;
		tms[j].c = j;
		tms[i].addEventListener('click', function(e){phrame.jumpTo(this.c); e.preventDefault();}, true);
		srs[j] = ims[i].href;
		++j;
	}

	phrame.setup(tms, srs);

	keyHandler.register(27, function(){unshade(); phrame.hide()});
	keyHandler.register(67, function(){unshade(); phrame.hide()});
	keyHandler.register(83, function(){phrame.jumpTo()});
	keyHandler.register(37, function(){phrame.prev()});
	keyHandler.register(39, function(){phrame.next()});

	phrame.setHook('shade', shade);
}

// Functions ends

//  5. init

if (window.makefns)
	makefns['photoframe'] = makePhotoframe;
addLoadEvent(photoframeSetup);

// init ends
