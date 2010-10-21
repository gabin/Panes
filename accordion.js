/*

file: accordion.js
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

2010-10-08 - v0.1 created

2010-10-12 - v0.3 rewrite using closure idiom
2010-10-13 - v0.3 moved fold into its own file
                  added support for pulldown
*/

//  2. Globals
// Globals ends

//  3. Classes
function Accordion (pane, pnType, pnId, pnStyle)
{
	if (!pnType) pnType = 'accordion';
	pane = new Pane(pane, pnType, pnId, pnStyle);

	var folds = {};
	var foldCount = 0;
	var showOnlyOne = false;

	pane.addFold = function (name, fold)
	{
		if (!name) name = pane.id + '_fold' + ++foldCount; 
		// fType = (fold) ? fold.className : null;
		newfold = (fold) ? false : true;

		// fold = new Fold(fold, fType, name);
		fold = new Fold(fold, null, name, 'fold');

		folds[name] = fold;
		if (newfold) folds[name].attach(pane);
		folds[name].acc = pane;
		folds[name].head.setHook('click', function(){pane.toggleFold(name)});
	}

	pane.toggleFold = function (foldname)
	{
		for (i in folds)
		{
			if (i == foldname)
			{
				// alert(i);
				folds[i].body.toggle();
			}
			else if (showOnlyOne) folds[i].body.hide();
		}
	}


	pane.setShowOnlyOne = function (onlyOne)
	{
		showOnlyOne = onlyOne;
	}

	pane.getFolds = function ()
	{
		return folds;
	}

	pane.setPullDown = function (pd)
	{
		for (i in folds)
		{
			folds[i].setPullDown(pd);
		}
	}

	for (i=0; i<pane.childNodes.length; ++i)
	{
		if (pane.childNodes[i].nodeName == 'DIV')
			pane.addFold(null, pane.childNodes[i]);
	}

	return pane;
}
// Classes ends

//  4. Functions
function makeFold (pane, type, id, style)
{
	return new Fold(pane, type, id, style);
}

function makeAccordion (pane, type, id, style)
{
	return new Accordion(pane, type, id, style);
}

// Functions ends

//  5. init
if (window.makefns)
{
	makefns['accordion'] = makeAccordion;
	makefns['fold'] = makeFold;
}
// init ends
