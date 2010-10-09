/*

file: slbrpane.js
description: Slide Browser Pane Class

version: 0.1
last updated: 2010-10-07

author: gabin kattukaran <gabin@kattukaran.in>

copyright: 2010, all rights reserved.

TOC

 1. Constants & Config
 2. Globals
 3. Classes
 	3.1. SlBrPane
 4. Functions
 	4.1 makeSlBrPane ()
 5. init

Revision History

2010-10-03 - v0.2-1 - created
2010-10-07 - v0.2-1 - added support for hooks

*/

//  3. Classes
function SlBrPane (type, id, style)
{
	if (!type) type = 'slbrpane';
	Pane.call(this, type, id, style);

	bgType = this.type + '-bg';
	bgId = this.id + '-id';
	this.addChild('bg', null, bgType, bgId);

	lbType = this.type + '-lb';
	lbId = this.id + '-lb';
	this.addChild('lb', null, lbType, lbId);
	a = document.createElement('a');
	a.href = '#';
	a.innerHTML = '&laquo;';
	this.lb.appendChild(a);

	rbType = this.type + '-rb';
	rbId = this.id + '-rb';
	this.addChild('rb', null, rbType, rbId);
	a = document.createElement('a');
	a.href = '#';
	a.innerHTML = '&raquo;';
	this.rb.appendChild(a);

	this.slides = [];

	this.setSlides = function (slides)
	{
		this.slides = slides;

		for (i=0; i<this.slides.length; ++i)
		{
			this.appendChild(this.slides[i]);
		}
	}

	this.right = function (count)
	{
		if (count == null) count = 1;

		for (i=0; i<count; ++i)
		{
			slides = this.getElementsByTagName('img');
			tim = slides[0];
			this.removeChild(tim);
			this.appendChild(tim);
		}
	}

	this.left = function (count)
	{
		if (count == null) count = 1;

		for (i=0; i<count; ++i)
		{
			slides = this.getElementsByTagName('img');
			tim = slides[slides.length - 1];
			this.removeChild(tim);
			this.insertBefore(tim, slides[0]);
		}
	}

	this.setLBHook = function (func)
	{
		this.lb.addEventListener('click', func, true);
	}

	this.setRBHook = function (func)
	{
		this.rb.addEventListener('click', func, true);
	}
}
// Classes ends

//  4. Functions
function makeSlBrPane (pane, type, id, style)
{
	if (!pane) pane = document.createElement('div');

	SlBrPane.call(pane, type, id, style);

	return pane;
}

// Functions ends

//  5. init
if (window.makefns)
	makefns['slbrpane'] = makeSlBrPane;
// init ends
