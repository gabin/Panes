/*

file: try.js
description: trial file 

version: 0.1
last updated: 2010-10-14

author: gabin kattukaran <gabin@kattukaran.in>

copyright: all rights reserved. no part may be used.

Terminology


TOC

 1. Constants & Config
 2. Globals
 3. Functions
	 3.1. addLoadEvent ()
 4. Classes
 5. Init
 	 

Revision History

 2010-09-28 - v0.1 created. added addLoadEvent()
 2010-10-04 - v0.1 added includes array. used to pull in other .js and .css files
                   moved addLoadEvent() calls to init section of individual .js files
 2010-10-14 - v0.1 changed document.head to head = document.getElementsByTagName('head')
*/

//  1. Constants & Config
var includes = [
	{'name':'shade', 'css':1},
	{'name':'pane', 'css':1},
	{'name':'msgpane', 'css':1},
	{'name':'imgpane', 'css':1},
	{'name':'slbrpane', 'css':1},
	{'name':'keyhandler', 'css':0},
	{'name':'photoframe', 'css':1},
	{'name':'fold', 'css':1},
	{'name':'accordion', 'css':1},
];
// Constants & Config ends

//  2. Globals

// Globals ends

//  3. Functions

function addLoadEvent (func)
{
	var oldonload = window.onload;

	if (typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function ()
		{
			oldonload();
			func();
		}
	}
}

// Functions ends

//  5. Init
for (i=0; i<includes.length; ++i)
{
	var head = document.getElementsByTagName('head')[0];
	if (includes[i].css == 1)
	{
		css = document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = includes[i].name + '.css';

		head.appendChild(css);
	}
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = includes[i].name + '.js';

	head.appendChild(script);
}
