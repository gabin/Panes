/*

file: msgpane.js
description: MsgPane Class

version: 0.2-1
last updated: 2010-10-03

author: gabin kattukaran <gabin@kattukaran.in>

copyright: 2010, all rights reserved.

TOC

 1. Constants & Config
 2. Globals
 3. Classes
 	3.1. MsgPane
 4. Functions
 	4.1. makeMsgPane ()
 	4.2. pnalert ()
 5. init

Revision History

2010-10-03 - v0.2-1 - created

*/

//  3. Classes
function MsgPane (type, id, style)
{
	if (!type) type = 'msgpane';
	Pane.call(this, type, id, style);

	this.msg = document.createElement('p');
	this.appendChild(this.msg);
}
// Classes ends

//  4. Functions
function makeMsgPane (pane, type, id, style)
{
	if (!pane) pane = document.createElement('div');

	MsgPane.call(pane, type, id, style);

	return pane;
}

function pnalert (txt)
{
	alpn = makeMsgPane();
	alpn.msg.innerHTML = txt;
	alpn.button = document.createElement('input');
	alpn.button.type = 'button';
	alpn.button.value = 'OK';
	alpn.button.pn = alpn;
	alpn.button.onclick = function () {this.pn.hide(); this.pn.detach();}
	alpn.button.style.float = 'right';
	alpn.appendChild(alpn.button);

	alpn.attach(document.body);
	alpn.show();
	alpn = null;
}
// Functions ends

//  5. init
if (window.makefns)
	makefns['msgpane'] = makeMsgPane;
oldalert = alert;
alert = pnalert;
// init ends
