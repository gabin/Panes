/*

file: msgpane.js
description: MsgPane Class

version: 0.3-1
last updated: 2010-10-16

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

2010-10-16 - v0.2-1 - rewrite using closure idiom
*/

//  3. Classes
function MsgPane (pane, pnType, pnId, pnStyle)
{
	if (!pnType) pnType = 'msgpane';
	pane = new Pane(pane, pnType, pnId, pnStyle);

	var msg = document.createElement('p');
	pane.appendChild(msg);

	pane.setMsg = function (txt)
	{
		msg.innerHTML = txt;
	}

	return pane;
}
// Classes ends

//  4. Functions
function makeMsgPane (pane, type, id, style)
{
	return new MsgPane(pane, type, id, style);
}

function pnalert (txt)
{
	alpn = new MsgPane(null, null, null, 'msgpane popup border');
	alpn.showBG();
	alpn.setMsg(txt);
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
