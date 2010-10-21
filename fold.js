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
function Fold (pane, pnType, pnId, pnStyle, pullDown)
{
	if (!pnType) pnType = 'fold';
	if (pullDown != true) pullDown = false;

	pane = new Pane(pane, pnType, pnId, pnStyle);

	divs = pane.getElementsByTagName('div');

	var head = divs[0];
	if (head)
	{
		hid = (head.id) ? head.id : (pane.id + '-head');
		htype = pane.type() + '-head';
		hstyle = head.className + ' ' + (pane.type() + '-head');
		head = new Pane(head, htype, hid, hstyle);
		pane.head = head;
	}
	else
	{
		hid = pane.id + '-head';
		htype = pane.type() + '-head';
		hstyle = pane.type() + '-head';
		head = new Pane(head, htype, hid, hstyle);
		pane.addChild('head', head);
	}

	var body = divs[1];
	if (body)
	{
		bid = (body.id) ? body.id : (pane.id + '-body');
		btype = pane.type() + '-body';
		bstyle = body.className + ' ' + (pane.type() + '-body');
		body = new Pane(body, btype, bid, bstyle);
		pane.body = body;
	}
	else
	{
		bid = pane.id + '-body';
		btype = pane.type() + '-body';
		bstyle = pane.type() + '-body';
		body = new Pane(body, btype, bid, bstyle);
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
