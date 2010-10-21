/*

file: slbrpane.js
description: Slide Browser Pane Class

version: 0.3-1
last updated: 2010-10-14

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

2010-10-11 - v0.3-1 - rewrite of SlBrPane class using new closure idiom
2010-10-14 - v0.3-1 - addEventListener() calls corrected to use 3 arguments
*/

//  3. Classes
function SlBrPane (pane, pnType, pnId, pnStyle)
{
	if (!pnType) pnType = 'slbrpane';
	pane = new Pane(pane, pnType, pnId, pnStyle);

	/*
	bgType = pane.className + '-bg';
	bgId = pane.id + '-id';
	bg = new Pane(null, bgType, bgId);
	pane.addChild('bg', bg);
	*/

	lbType = pane.type() + '-lb';
	lbId = pane.id + '-lb';
	lbstyle = pane.type() + '-button' + ' ' + pane.type() + '-lb';
	var lb = new Pane(null, lbType, lbId, lbstyle);
	pane.addChild('lb', lb);
	a = document.createElement('a');
	a.href = '#';
	a.innerHTML = '&laquo;';
	pane.lb.appendChild(a);

	rbType = pane.type() + '-rb';
	rbId = pane.id + '-rb';
	rbstyle = pane.type() + '-button' + ' ' + pane.type() + '-rb';
	var rb = new Pane(null, rbType, rbId, rbstyle);
	pane.addChild('rb', rb);
	a = document.createElement('a');
	a.href = '#';
	a.innerHTML = '&raquo;';
	pane.rb.appendChild(a);

	lb.setHook('click', function(){pane.left(4)});
	lb.addEventListener('click', function(e){lb.callHook('click'); e.preventDefault()}, true);
	rb.setHook('click', function(){pane.right(4)});
	rb.addEventListener('click', function(e){rb.callHook('click'); e.preventDefault()}, true);

	var slides = [];

	pane.setSlides = function (sls)
	{
		slides = sls;

		for (i=0; i<slides.length; ++i)
		{
			pane.appendChild(slides[i]);
		}
	}

	pane.right = function (count)
	{
		if (count == null) count = 1;

		for (i=0; i<count; ++i)
		{
			sls = pane.getElementsByTagName('img');
			tim = sls[0];
			pane.removeChild(tim);
			pane.appendChild(tim);
		}
	}

	pane.left = function (count)
	{
		if (count == null) count = 1;

		for (i=0; i<count; ++i)
		{
			sls = pane.getElementsByTagName('img');
			tim = sls[sls.length - 1];
			pane.removeChild(tim);
			pane.insertBefore(tim, sls[0]);
		}
	}

	return pane;
}
// Classes ends

//  4. Functions
function makeSlBrPane (pane, type, id, style)
{
	return new SlBrPane(pane, type, id, style);
}

// Functions ends

//  5. init
if (window.makefns)
	makefns['slbrpane'] = makeSlBrPane;
// init ends
