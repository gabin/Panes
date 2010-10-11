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
	 4.1. shownext ()
	 4.2. showprev ()
	 4.3. showimpn ()
	 4.4. hideimpn ()
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
// var curim;
// var impn;

var phrame;
// Globals ends

//  3. Classes
function Photoframe (pane, type, id, bgStyle)
{
	if (!type) type = 'photoframe';
	pane = new Pane(pane, type, id, bgStyle);

	// use the following lines if photoframe.css is used to set styles for impn & slbr
	//impnType = this.type + '-impn';
	//impnId = this.id + '-impn';
	//slbrType = this.type + '-slbr';
	//slbrId = this.id + '-slbr';

	// these lines use impn and slbr default styles
	impn = newPane('imgpane');
	pane.addChild('impn', impn);
	slbr = newPane('slbrpane');
	pane.addChild('slbr', slbr);

	// data management
	var thumbs = [];
	var srcs = [];
	var cur = 0;
	var nextim = null;
	var previm = null;
	var linked = false;


	// change sub panes to visible so that this pane's visibility will control them
	pane.impn.show();
	pane.slbr.show();

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
		if (index) cur = index;

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
		t = (window.innerHeight - pane.offsetHeight) / 2;
		l = (window.innerWidth - pane.offsetWidth) / 2;
		pane.moveToY(t);
		pane.moveToX(l);

		// set new image
		if (!img.complete)
		{
			// alert('yow!');
			/*
			img.onload = function()
			{
				imgload(this.impn, img);
				img = 
			}
			*/
		}
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
	phrame = makePhotoframe();
	phrame.attach(document.body);

	initShade();

	ims = document.getElementsByClassName('pane');
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

	/*
	phrame.slbr.lb.setHook('click', function(){phrame.slbr.left(4)});
	phrame.slbr.lb.addEventListener('click', phrame.slbr.lb.hooks['click'], true);
	phrame.slbr.rb.setHook('click', function(){phrame.slbr.right(4)});
	phrame.slbr.rb.addEventListener('click', phrame.slbr.rb.hooks['click'], true);
	*/

	phrame.setHook('shade', shade);
}

// old
/*
function shownext ()
{
	curim = ++curim % srcs.length;
	showimpn(srcs[curim]);
}

function showprev ()
{
	curim = (curim + srcs.length - 1) % srcs.length;
	showimpn(srcs[curim]);
}

function showimpn (src)
{
	shade();
	impn.img.onload = function ()
	{
		// first show. then compute sizes. this is to avoid heights being set to zero.
		impn.show();
		// impn.bg.resize({'width':impn.img.width+defImgPad, 'height':impn.img.height+defImgPad});
		l = (window.innerWidth - (impn.slbr.offsetWidth)) / 2;
		t = (window.innerHeight - (impn.bg.offsetHeight + impn.slbr.offsetHeight)) / 2;
		impn.style.left = l.toFixed(0) + 'px';
		impn.style.top = '20%';
		// impn.style.top = t.toFixed(0) + 'px';
		impn.img.style.top = -(impn.img.height + (impn.bg.offsetHeight - impn.img.height)/2 + 3) + 'px';
		//impn.brbg.style.top = -(impn.img.height) + 'px';
		impn.slbr.style.top = -(impn.img.height) + 'px';
	}

	impn.img.onabort = function ()
	{
		alert('error loading file');
	}

	impn.img.onerror = impn.img.onabort;

	impn.img.src = src;
	if (impn.img.complete) impn.img.onload();

	// key handlers come here
	keyHandler.unregister(83);
	keyHandler.register(37, showprev);
	keyHandler.register(39, shownext);
	keyHandler.register(27, hideimpn);
	keyHandler.register(67, hideimpn);
}

function hideimpn ()
{
	impn.hide();
	unshade();
	// unregister keyhandlers come here
	keyHandler.unregister(37);
	keyHandler.unregister(39);
	keyHandler.unregister(27);
	keyHandler.unregister(67);
	keyHandler.register(83, shownext);
	--curim;
}

function photoFrameSetup ()
{
	initShade();
	impn = makeImgPane();
	impn.attach(document.body);

	// add event handlers here
	keyHandler.register(83, shownext);

	ims = document.getElementsByClassName('pane');
	j = 0;
	for (i=0; i<ims.length; ++i)
	{
		if (ims[i].nodeName != 'A') break; // discard if element is not an anchor
		ims[i].c = j; // add index to the element
		ims[i].addEventListener('click', function(e){curim=(this.c)-1;shownext(); e.preventDefault();}, true);
		links[j] = ims[i];
		srcs[j++] = ims[i].href;
	}

	curim = -1;
}
*/

// Functions ends

//  5. init

if (window.makefns)
	makefns['photoframe'] = makePhotoframe;
addLoadEvent(photoframeSetup);

// init ends
