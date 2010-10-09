/*

file: typecheck.js
description: types and functions to check types

version: 0.1
created: 2010-09-25
last updated: 2010-09-25

author: gabin kattukaran

copyright: all rights reserved. no part may be used.

Terminology


TOC

 1. Constants

 2. isHTMLColor (color)

Revision History

 2010-09-25 - isHTMLColor added

*/


/* Constants */
minOpacity = 0.0;
maxOpacity = 1.0;
HTMLColor = /^#[0-9,a-f]{6}$/i;  // regex to match HTML colors

var TypeCheck = new function ()
{
	this.size = function (s) // generic size
	{
		if (s && (!isNaN(s)) && (s>=0))
			return true;

		// not a size
		return false;
	}
	this.width = this.size; // width
	this.height = this.size; // height
	this.fontSize = this.size; 
	this.padding = this.size;

	this.position = function (pos) // generic position
	{
		if (pos && (!isNaN(pos)))
			return true;

		// not a position
		return false;
	}
	this.top = this.position;
	this.right = this.position;
	this.bottom = this.position;
	this.left = this.position;
	this.zIndex = this.position;
	
	this.margin = function ()
	{
		// don't know what to do
		return true;
	}
	this.marginLeft = this.margin;

	this.opacity = function (op) // opacity
	{
		if (op && (!isNaN(op)) && (op >= minOpacity) && (op<= maxOpacity))
			return true;

		// not valid opacity
		return false;
	}

	this.HTMLColor = function (color)
	{
		if (color != null)
		{
			if ((color[0] == '#') && (color.length == 7))
			{
				if (color.match(HTMLColor))
					return true;
			}
			else if ((color == 'transparent'))
				return true;
		}

		// not an HTML color
		return false;
	}
	this.color = this.HTMLColor;

	this.border = function (bdr) // HTML border
	{
		// don't know how to check
		return true;
	}

	this.fontFamily = function (fnt)
	{
		// don't know how to check
		return true;
	}
	this.font = this.fontFamily;

	this.align = function (aln)
	{
		// don't know how to check
		return true;
	}

	this.float = function (flt)
	{
		// don't know what to do
		return true;
	}
}

/*

function: isHTMLColor
return: boolean
argument: color, reference to a string
description: checks if color is a valid HTML color. Accepts '#rrggbb'

*/
function isHTMLColor (color)
{
	if ((color != null) && (color[0] == '#') && (color.length == 7))
	{
		if (color.match(HTMLColor))
			return true;
	}
	
	// not an HTML color
	return false;
}

