/*

file: keyhandler.js
description: KeyHandler Class and related functions

version: 0.1
last updated: 2010-09-30

author: gabin kattukaran <gabin@kattukaran.in>

copyright: all rights reserved. no part may be used.

Terminology


TOC

 1. Constants & Config
 2. Globals
 3. Functions
 	 3.1 keypress ()
	 3.2 keyHandlerSetup ()
 4. Classes
 	 4.1 KeyHandler
 5. Init
 	 

Revision History

 2010-09-30 - v0.1 created KeyHandler class and related functions
 2010-10-04 - v0.1 moved call to addLoadEvent() from try.js

*/

//  1. Constants & Config

// Constants & Config ends

//  2. Globals
var keyHandler;	// global key handler registry 
// Globals ends

//  3. Functions

function keypress (e)
{
	code = e.keyCode.toString();
	if (keyHandler[code])
		keyHandler[code]();
}

function keyHandlerSetup ()
{
	keyHandler = new KeyHandler();
	document.addEventListener('keydown', keypress, true);
}

// Functions ends

//  4. Classes

function KeyHandler ()
{
	// constructor

	// constructor ends
	
	this.register = function (keyCode, func)
	{
		code = keyCode.toString();
		if (!this[code])
			this[code] = func;
	}

	this.unregister = function (keyCode)
	{
		this[keyCode.toString()] = null;
	}
}

// Classes ends

//  5. init
addLoadEvent(keyHandlerSetup);
// init ends
