/*

file: style.js
description: Style and related classes

version: 0.1
last updated: 2010-09-30

author: gabin kattukaran <gabin@kattukaran.in>

copyright: all rights reserved. no part may be used.

Terminology

TOC

 1. Constants & Config
 2. Globals & Init
 3. Functions
 4. Classes
	 4.1. Style
	 4.2. PaneStyle
	 4.3. TxtStyle

Revision History

 2010-09-30 - v0.1 created, moved PaneStyle from panes.js
                   added superclass Style
									 added TxtStyle

*/

//  1. Constants & Config
// Constants

// Constants ends

//  2. Globals
var defaultPaneStyle;
var defaultTxtStyle;

//  4. Classes

/*
class: Style
description: Style superclass
*/
function Style (styles)
{
	for (p in styles)
	{
		if (TypeCheck[p](styles[p]))
			this[p] = styles[p];
	}

	this.set = function (styles)
	{
		for (p in styles)
		{
			if (TypeCheck[p](styles[p]))
				this[p] = styles[p];
		}
	}

	this.clone = function ()
	{
		s = {};
		s.__proto__ = this.__proto__;

		for (p in this)
			s[p] = this[p];

		return s;
	}
}

// class Style ends

/*
class: PaneStyle
description: Constructor for a PaneStyle object

*/
function PaneStyle (styles)
{
	// constructor

	for (p in defaultPaneStyle)
	{
		this[p] = defaultPaneStyle[p];
	}

	Style.call(this, styles); // call superclass constructor

	/*
	for (p in defaultPaneStyle)
	{
		this[p] = defaultPaneStyle[p];
	}

	for (p in styles)
	{
		if (TypeCheck[p](styles[p]))
			this[p] = styles[p];
	}

	this.set = function (styles)
	{
		for (p in styles)
			if (TypeCheck[p](styles[p]))
				this[p] = styles[p];
	}

	this.clone = function()
	{

		ps = new PaneStyle();
		for (p in defaultPaneStyle)
		{
			ps[p] = this[p];
		}
		return ps;
	}
	*/
}

// class PaneStyle ends

/*
class: TxtStyle
description: Text Style
*/
function TxtStyle (styles)
{
	// constructor
	for (p in defaultTxtStyle)
	{
		this[p] = defaultTxtStyle[p];
	}

	Style.call(this, styles); // call superclass constructor
}

// class TxtStyle ends
