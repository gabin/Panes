/*

file: accordion.js
description: an accordion pane

version: 0.3
last updated: 2010-10-12

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

2010-10-08 - v0.1 created

2010-10-12 - v0.3 rewrite using closure idiom
*/

//  2. Globals
// Globals ends

//  3. Classes
function Fold (pane, type, id, style)
{
	if (!type) type = 'fold';
	pane = new Pane(pane, type, id, style);

	hid = id + '-head';
	htype = type + '-head';
	head = new Pane(null, htype, hid);
	pane.addChild(head);

	bid = id + '-body';
	btype = type + '-body';
	body = new Pane(null, btype, bid);
	pane.addChild(body);
}

function Accordion (type, id, style)
{
	if (!type) type = 'accordion';
	pane = new Pane(pane, type, id, style);

	folds = {};
	foldCount = 0;

	pane.addFold = function (name, fold)
	{
		if (!name) name = 'fold' + ++this.foldCount; 
		if (!fold) fold = new Fold(null, null, name);

		folds[name] = fold;
		folds[name].attach(pane);
		folds[name].acc = pane;
		// this.folds[name].head.onclick = function(e) {this.acc.expand(this.foldname)}
	}

	this.expand = function (foldname)
	{
		// alert(this + ':  ' + this.folds[foldname]);
		for (i in this.folds)
		{
			if (i == foldname)
			{
				// alert(i);
				this.folds[i].body.show();
			}
			else this.folds[i].body.hide();
		}
	}
}
// Classes ends

//  4. Functions
function makeFold (pane, type, id, style)
{
	if (!pane) pane = document.createElement('div');

	Fold.call(pane, type, id, style);

	return pane;
}

function makeAccordion (pane, type, id, style)
{
	if (!pane) pane = document.createElement('div');

	Accordion.call(pane, type, id, style);

	return pane;
}
// Functions ends

//  5. init
if (window.makefns)
{
	makefns['accordion'] = makeAccordion;
	makefns['fold'] = makeFold;
}
// init ends
