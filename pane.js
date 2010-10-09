/*

file: pane.js
description: Pane class and related functions

version: 0.1-4
last updated: 2010-10-07

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

*/

//  1. Constants & Config

// Constants & Config ends

//  2. Globals
var nPanes = {}; // count of unnamed panes. used to auto-generate pane ids.
var makefns = {}; // make functions
// Globals ends

//  3. Classes

function Pane (type, id, paneStyle)
{
	if (!type) type = 'pane';
	this.type = type;

	this.className = type;
	this.display = 'block';
	// this.style.position = 'relative';

	// hooks
	this.hooks = null;

	if (!nPanes[this.type]) nPanes[this.type] = 0;

	if (!id) id = this.type + ++(nPanes[this.type]);
	this.id = id;

	this.addChild = function (name, pane, type, id, style)
	{
		this[name] = makePane(pane, type, id, style);
		this.appendChild(this[name]);
	}

	this.attach = function (parent)
	{
		if (this.parentElement)
			this.detach();

		parent.appendChild(this);
	}

	this.detach = function ()
	{
		if (parent = this.parentElement)
			parent.removeChild(this);
	}

	this.show = function ()
	{
		this.style.display = this.display;
	}

	this.hide = function ()
	{
		this.style.display = 'none';
	}

	this.toString = function ()
	{
		return '[ ' + this.id + ' ]';
	}

	this.identify = function ()
	{
		txt = document.createElement('p');
		txt.style.position = 'relative';
		txt.style.margin = '0px';
		txt.style.color = 'white';
		txt.style.fontFamily = 'sans-serif';
		txt.innerHTML = this.toString();
		this.appendChild(txt);
	}

	this.resize = function (size)
	{
		this.style.width = size.width + 'px'; // change from 'px' to a config'able unit
		this.style.height = size.height + 'px'; // change from 'px' to a config'able unit
	}

	this.shiftX = function (x)
	{
		newLeft = this.style.left.match(/^[-,+]?[0-9]*/);
		
		newLeft = (newLeft[0] == '') ? x : eval(newLeft[0]) + x;
		this.style.left = newLeft + 'px'; // change from 'px' to a config'able unit
	}

	this.shiftY = function (y)
	{
		newTop = this.style.top.match(/^[-,+]?[0-9]*/);

		newTop = (newTop == '') ? y : eval(newTop[0]) + y;
		this.style.top = newTop + 'px'; // change from 'px' to a config'able unit
	}

	this.moveToX = function (x)
	{
		this.style.left = x.toFixed(0) + 'px'; // change from 'px' to a config'able unit
	}

	this.moveToY = function (y)
	{
		this.style.top = y.toFixed(0) + 'px'; // change from 'px' to a config'able unit
	}

	this.setHook = function (name, func)
	{
		if (this.hooks == null) this.hooks = {}; // set up an object on first call

		if ((typeof this.hooks[name] === 'undefined') || (this.hooks[name] != null))
			this.hooks[name] = func;
		// this.addEventListener(name, this.hooks[name], true);
	}

	this.removeHook = function (name)
	{
		if ((typeof this.hooks[name] !== 'undefined') && (this.hooks[name] != null))
			this.hooks[name] = null;
	}
}
// Classes ends

//  4. Functions
function makePane (pane, type, id, paneStyle)
{
	if (!pane) pane = document.createElement('div');
	// add checks to see is the div has already been made a pane

	//if (!paneStyle) paneStyle = new PaneStyle();

	Pane.call(pane, type, id, paneStyle);

	return pane;
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
