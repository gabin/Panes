/*

file: photoframe.js
description: unobtrusively adds photoframe functionality to an html page

version: 0.1
last updated: 2010-10-06

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

*/

//  2. Globals
var phrame;
var thumbs = [];
var srcs = [];
var curim;
var impn;

var phrame;
// Globals ends

//  3. Classes
function Photoframe (type, id, bgStyle)
{
	if (!type) type = 'photoframe';
	Pane.call(this, type, id, bgStyle);

	// these lines use impn and slbr default styles
	this.impn = newPane('imgpane');
	this.appendChild(this.impn);
	this.slbr = newPane('slbrpane');
	this.appendChild(this.slbr);

	// use the following lines if photoframe.css is used to set styles for impn & slbr
	//impnType = this.type + '-impn';
	//impnId = this.id + '-impn';
	//this.impn = newPane('imgpane', null, impnType, impnId);
	//slbrType = this.type + '-slbr';
	//slbrId = this.id + '-slbr';
	//this.slbr = newPane('slbrpane', null, slbrType, slbrId);

	// data management
	this.thumbs = [];
	this.srcs = [];
	this.cur = 0;
	this.nextim = null;
	this.previm = null;
	this.linked = false;


	// change sub panes to visible so that this pane's visibility will control them
	this.impn.show();
	this.slbr.show();

	this.next = function ()
	{
		if (!this.nextim) return; // not initialized

		// add checks to ensure image has loaded

		this.previm = this.showImg(this.nextim);
		this.cur = ++this.cur % this.srcs.length;

		if (this.linked) this.syncSlBr();

		// preload next image
		next = (this.cur + 1) % this.srcs.length;
		this.nextim = document.createElement('img');
		this.nextim.src = this.srcs[next];
	}

	this.prev = function ()
	{
		if (!this.previm) return; // not initialized

		// add checks to ensure image has loaded

		this.nextim = this.showImg(this.previm);
		this.cur = (this.cur + this.srcs.length - 1) % this.srcs.length;

		if (this.linked) this.syncSlBr();

		// preload prev image
		prev = (this.cur + this.srcs.length - 1) % this.srcs.length;
		this.previm = document.createElement('img');
		this.previm.src = this.srcs[prev];
	}

	this.jumpTo = function (index)
	{
		im = document.createElement('img');
		im.src = this.srcs[index];
		this.showImg(im);

		this.cur = index;

		// sync slide browser
		if (this.linked) this.syncSlBr();

		// preload adjacent images
		prev = (index + this.srcs.length - 1) % this.srcs.length;
		next = (index + 1) % this.srcs.length;

		this.nextim = document.createElement('img');
		this.nextim.src = this.srcs[next];
		this.previm = document.createElement('img');
		this.previm.src = this.srcs[prev];
	}
	
	this.link = function ()
	{
		this.linked = true;
	}
	
	this.unlink = function ()
	{
		this.linked = false;
	}

	this.syncSlBr = function ()
	{
		slbrcur = this.slbr.getElementsByTagName('img')[0];

		// currently centered slide is two ahead of the first element
		cur = (slbrcur.c + 2) % this.srcs.length;
		if (this.cur > cur)
		{
			this.slbr.right(this.cur - cur);
		}
		else
		{
			this.slbr.left(cur - this.cur);
		}
	}

	this.showImg = function (img)
	{
		// shade
		if ((this.hooks) && (this.hooks['shade']) && (this.hooks['shade'] != null))
			this.hooks['shade']();

		// make the pane visible so that dimensions are available
		this.show();

		// recompute top and left
		t = (window.innerHeight - this.offsetHeight) / 2;
		l = (window.innerWidth - this.offsetWidth) / 2;
		this.moveToY(t);
		this.moveToX(l);

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
		im = this.impn.change(img);

		return im;
	}

	this.setup = function ()
	{
		// get all hrefs and put in pf.srcs
		// get all thumbs and append copies to slbrnextim.src = 'Photos/img_6581.jpg';pf.nextim = nextim
	}
}
// Classes ends

//  4. Functions

function makePhotoframe (pane, type, id, bgStyle)
{
	if (!pane) pane = document.createElement('div');

	Photoframe.call(pane, type, id, bgStyle);

	return pane;
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
		thumbs[j] = document.createElement('img');
		thumbs[j].src = ims[i].childNodes[1].src;
		thumbs[j].c = j;
		thumbs[i].addEventListener('click', function(e){phrame.jumpTo(this.c); e.preventDefault();}, true);
		srcs[j] = ims[i].href;
		++j;
	}

	phrame.thumbs = thumbs;
	phrame.srcs = srcs;

	phrame.slbr.setSlides(thumbs);

	// im = document.createElement('img');
	// im.src = phrame.srcs[0];
	/*
	phrame.impn.img.src = phrame.srcs[0];

	nextim = document.createElement('img');
	nextim.src = phrame.srcs[1];
	phrame.nextim = nextim;

	previm = document.createElement('img');
	previm.src = phrame.srcs[phrame.srcs.length - 1];
	phrame.previm = previm;

	phrame.slbr.left(2);
	*/

	keyHandler.register(27, function(){unshade(); phrame.hide()});
	keyHandler.register(67, function(){unshade(); phrame.hide()});
	keyHandler.register(83, function(){shade(); phrame.jumpTo(phrame.cur)});
	keyHandler.register(37, function(){phrame.prev()});
	keyHandler.register(39, function(){phrame.next()});

	phrame.slbr.lb.setHook('click', function(){phrame.slbr.left(4)});
	phrame.slbr.lb.addEventListener('click', phrame.slbr.lb.hooks['click'], true);
	phrame.slbr.rb.setHook('click', function(){phrame.slbr.right(4)});
	phrame.slbr.rb.addEventListener('click', phrame.slbr.rb.hooks['click'], true);

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
