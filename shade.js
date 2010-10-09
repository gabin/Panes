// Shade Defaults
/*
var shadeColor = '#363636';
var shadeOpacity = 0.9;
var shadeZIndex = 1;
*/

/*

function: initShade ()
return: undefined
arguments: none
description: initializes a shade <div>

*/
function initShade ()
{
	divShade = document.getElementById('shade');
	if (divShade == null)
	{
		divShade = document.createElement('div');
		divShade.id = 'shade';
		divShade.className = 'panes.js-shade';
		document.body.appendChild(divShade);
	}

	divShade.style.display = 'none';
}


/*

function: shade ()
return: undefined
arguments: none
description: shades viewing area

*/
function shade ()
{
	divShade = document.getElementById('shade');
	if (divShade == null)
	{
		initShade();
		divShade = document.getElementById('shade');
	}
	divShade.style.display = 'block';
}


/*


/*

function: unshade ()
return: undefined
arguments: none
description: unshades viewing area

*/
function unshade ()
{
	divShade = document.getElementById('shade');
	divShade.style.display = 'none';
}

// Functions end
