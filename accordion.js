/*

file: accordion.js
description: an accordion pane

version: 0.1
last updated: 2010-10-06

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

*/

//  2. Globals
// Globals ends

//  3. Classes
function Fold (type, id, style)
{
	if (!type) type = 'fold';
	Pane.call(this, type, id, style);

	hid = id + '-head';
	htype = type + '-head';
	this.head = newPane('pane', null, htype, hid);
	this.head.attach(this);

	bid = id + '-body';
	btype = type + '-body';
	this.body = newPane('pane', null, btype, bid);
	this.body.attach(this);
}

function Accordion (type, id, style)
{
	if (!type) type = 'accordion';
	Pane.call(this, type, id, style);

	this.folds = {};
	this.foldCount = 0;

	this.addFold = function (name, fold)
	{
		if (!name) name = 'fold' + ++this.foldCount; 
		if (!fold) fold = newPane('fold', null, null, name);

		this.folds[name] = fold;
		this.folds[name].attach(this);
		this.folds[name].acc = this;
		this.folds[name].head.acc = this;
		this.folds[name].head.foldname = name;
		this.folds[name].body.acc = this;
		this.folds[name].body.foldname = name;
		this.folds[name].head.onclick = function(e) {this.acc.expand(this.foldname)}
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
