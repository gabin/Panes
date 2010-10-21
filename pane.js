/*

file: pane.js
description: Pane class and related functions

version: 0.3-1
last updated: 2010-10-11

author: gabin kattukaran <gabin@kattukaran.in>

copyright: 2010, all rights reserved. no part may be used.

TOC

 1. Constants & Config
 2. Globals
 3. Classes
 	3.1. Pane
 4. Functions
 	4.1. makePane ()
	4.2. newPane ()
 5. init

 Revision History:

2010-10-01 - v0.2-1 rewrite of Pane class and interfaces
2010-10-03 - v0.2-1 added makefns, global makePane function repository
2010-10-07 - v0.2-1 added added hooks[], setHook() and removeHook()

2010-10-11 - v0.3-1 rewrite of Pane class using new closure idiom
2010-10-12 - v0.3-1 added toggle()

*/

//  1. Constants & Config

// Constants & Config ends

//  2. Globals
var makefns = {}; // make functions
// Globals ends

//  3. Classes

function Pane (pane, pnType, pnId, pnStyle)
{
	if (!pane) pane = document.createElement('div');

	var that = pane;
	var display = 'block';
	var hooks = null;
	var bg = null;
	var type;

	if (!pnType) pnType = 'pane';
	type = pnType;

	if (!pnStyle) pnStyle = 'def';
	
	if (pnStyle) pane.className += pnStyle;
	//if (!pane.className) pane.className = pnStyle;

	if (!Pane.nPanes[type]) Pane.nPanes[type] = 0;

	if (!pnId) pnId = type + ++(Pane.nPanes[type]);
	if (!pane.id) pane.id = pnId;

	pane.type = function ()
	{
		return type;
	}

	pane.addChild = function (name, child)
	{
		that[name] = child;
		child.attach(pane);
	}

	pane.attach = function (p)
	{
		if (pane.parentElement)
			pane.detach();

		p.appendChild(pane);
	}

	pane.detach = function ()
	{
		p = pane.parentElement;
		if (p)
		{
			p.removeChild(pane);
		}
	}

	pane.show = function ()
	{
		pane.style.display = display;
	}

	pane.hide = function ()
	{
		pane.style.display = 'none';
	}

	pane.toggle = function ()
	{
		if (pane.style.display == display) pane.style.display = 'none';
		else pane.style.display = display;
	}

	pane.toString = function ()
	{
		return '[ ' + pane.id + ' ]';
	}

	pane.identify = function ()
	{
		txt = document.createElement('p');
		txt.style.position = 'relative';
		txt.style.margin = '0px';
		txt.style.color = 'white';
		txt.style.fontFamily = 'sans-serif';
		txt.innerHTML = pane.toString();
		pane.appendChild(txt);
	}

	pane.resize = function (size)
	{
		pane.style.width = size.width + 'px'; // change from 'px' to a config'able unit
		pane.style.height = size.height + 'px'; // change from 'px' to a config'able unit
	}

	pane.shiftX = function (x)
	{
		newLeft = pane.style.left.match(/^[-,+]?[0-9]*/);
		
		newLeft = (newLeft[0] == '') ? x : eval(newLeft[0]) + x;
		pane.style.left = newLeft + 'px'; // change from 'px' to a config'able unit
	}

	pane.shiftY = function (y)
	{
		newTop = pane.style.top.match(/^[-,+]?[0-9]*/);

		newTop = (newTop == '') ? y : eval(newTop[0]) + y;
		pane.style.top = newTop + 'px'; // change from 'px' to a config'able unit
	}

	pane.moveToX = function (x)
	{
		pane.style.left = x.toFixed(0) + 'px'; // change from 'px' to a config'able unit
	}

	pane.moveToY = function (y)
	{
		pane.style.top = y.toFixed(0) + 'px'; // change from 'px' to a config'able unit
	}

	pane.setHook = function (name, func)
	{
		if (hooks == null) hooks = {}; // set up an object on first call

		if ((typeof hooks[name] === 'undefined') || (hooks[name] != null))
			hooks[name] = func;
		// this.addEventListener(name, this.hooks[name], true);
	}

	pane.removeHook = function (name)
	{
		if ((typeof hooks[name] !== 'undefined') && (hooks[name] != null))
			hooks[name] = null;
	}

	pane.getHooks = function ()
	{
		return hooks;
	}

	pane.callHook = function (name)
	{
		if ((hooks) && (hooks[name]) && (hooks[name] != null))
			hooks[name]();
	}

	pane.showBG = function ()
	{
		bg = document.createElement('div');
		bg.id = pane.id + '-bg';
		bg.classList.add(pane.type() + '-bg');
		bg.classList.add('bg');
		//bg.className = pane.type() + '-bg bg';

		pane.appendChild(bg);
	}

	pane.hideBG = function ()
	{
		pane.removeChild(bg);

		bg = null;
	}

	return pane;
}

Pane.nPanes = {}; // counts number of panes of each type. used to set pane id's
// Classes ends

//  4. Functions
function makePane (pane, type, id, paneStyle)
{
	return new Pane(pane, type, id, paneStyle);
}

function newPane (kind, pane, type, id)
{
	if (makefns[kind])
		return makefns[kind](pane, type, id);
}
// Functions ends

//  5. init
if (window.makefns)
	makefns['pane'] = makePane;
//init ends
