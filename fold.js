/*

file: fold.js
description: an accordion pane

version: 0.3
last updated: 2010-10-13

author: gabin kattukaran <gabin@kattukaran.in>

copyright: all rights reserved. no part may be used.

TOC

 1. Constants & Config
 2. Globals
 3. Classes
 	 3.1. Accordion
 4. Functions
 5. init
 	 

Revision History

2010-10-13 - v0.3 moved class from accordion.js
*/
//  3. Classes
function Fold (pane, type, id, style, pullDown)
{
	if (!type) type = 'fold';
	if (pullDown != true) pullDown = false;

	pane = new Pane(pane, type, id, style);

	divs = pane.getElementsByTagName('div');

	var head = divs[0];
	if (head)
	{
		hid = (head.id) ? head.id : (id + '-head');
		htype = (head.className) ? head.className : (type + '-head');
		head = new Pane(head, htype, hid);
		pane.head = head;
	}
	else
	{
		hid = id + '-head';
		htype = type + '-head';
		head = new Pane(head, htype, hid);
		pane.addChild('head', head);
	}

	var body = divs[1];
	if (body)
	{
		bid = (body.id) ? body.id : (id + '-body');
		btype = (body.className) ? body.className : (type + '-body');
		body = new Pane(body, btype, bid);
		pane.body = body;
	}
	else
	{
		bid = id + '-body';
		btype = type + '-body';
		body = new Pane(body, btype, bid);
		pane.addChild('body', body);
	}

	if (pullDown) head.attach(pane);

	function togglePullDown ()
	{
		if (pullDown) body.attach(pane);
		else head.attach(pane);

		pullDown = !pullDown;
	}

	head.addEventListener('click', function(){head.callHook('click')}, true);

	pane.setPullDown = function (pd)
	{
		// oldalert(pullDown + ' ' + pd);
		if (pd != true) pd = false;

		if (pullDown != pd) togglePullDown();
	}

	return pane;
}
// Classes ends
