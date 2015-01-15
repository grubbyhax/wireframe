/* wireframe.js
 *  Developed by David Thomson
 *  w/ A big thanks to the contributors of Blueprint v0.4
 *
 *  Version - v0.5
 *  Changelog
 *  - generateSelectOptions() added
 *  - generateSettingsStylesheetCode() updated
 *  - generateLayoutStylesheetCode() updated
 *
 * License - MIT:
 *  Everyone is free to use and modify this code however they wish.
 *  The developer gives no guarentee and takes no responsibility for the use and abuse of the code contained herein.
 *  Given that this is purely a development utility, commenting has been left in for your enjoyment.
 *
 * Play nice everyone, and remember, don't code angry ...whenever possible. :)
 */

////////////////////////////////////////////////////////////////////////////////
//                     U T I L I T Y   C O N S T A N T S                      //
////////////////////////////////////////////////////////////////////////////////

//Grid & Typsetting Defaults.
//NB: Changes here must be replicated in <form name="defaults"> in wireframe.html.
var nDefaultFontSize		= 12;
var nDefaultColumnWidth		= 3;
var nDefaultColumnGutter	= 1;
var nDefaultColumns			= 10;
var nDefaultMaxGridHang		= 5;
var nDefaultMaxGridLift		= 5;
var nDefaultMaxGridPress	= 5;
var nDefaultMaxGridStretch	= 15;

//Development Image Paths.
var sGridImagePath 			= 'grid.png';
var sFrameImagePath 		= 'frame.png';



////////////////////////////////////////////////////////////////////////////////
//          I N T E R F A C E   B U I L D E R   F U N C T I O N S             //
////////////////////////////////////////////////////////////////////////////////

//Initialises default interface controls.
// * Return: 				VOID
// * EH:					onload()
function initialiseInterface()
{
	//Attach event handlers to interface.
	document.getElementById('select_typesettings').onclick 	= function(){return writeTypesettingControls();};
	document.getElementById('select_typography').onclick 	= function(){return writeTypographyControls();};
	document.getElementById('select_wideforms').onclick 	= function(){return writeWideFormsControls();};
	document.getElementById('select_wireframes').onclick 	= function(){return writeWireframeControls();};
	document.getElementById('select_identifiers').onclick 	= function(){return writeIdentifierControls();};
	document.getElementById('select_options').onclick 		= function(){return writeOptionControls();};
	document.getElementById('select_output').onclick 		= function(){return SelectOutputCode();};

	//Display default interface settings.
	writeTypesettingControls();
	document.getElementById('select_typesettings').checked = true;

	return;
}

//Test and assigns select option according to nValue of sInputId in <form name="defaults">.
// * Return:				Attribute/value pair for select option being tested
function getOptionIsSelected(sInputId, nValue)
{
	//Declare return object.
	var sSelectionAttribute = '';

	//If holder value matches this option add selected attribute/value markup.
	if (document.getElementById(sInputId).value == nValue)
		sSelectionAttribute = ' selected="selected"';

	return sSelectionAttribute;
}

//Generates select input options for Wireframe interface.
// - sSelectName:			Name of the select input options are being generated for
// - nStartValue:			Bottom value of the select input
// - nEndValue:				Top value of the select input
// - nValueIncrement:		Number by which the select options increment
// * Return:				Markup code for select options as a string
function generateSelectOptions(sSelectName, nStartValue, nEndValue, nValueIncrement)
{
	//Declare return string.
	var sSelectOptions = '';

	var i = nStartValue;
	while (i <= nEndValue)
	{
		sSelectOptions += '<option value="' + i + '"' + getOptionIsSelected(sSelectName, i) + '>' + i + '</option>';
		i += nValueIncrement;
	}

	return sSelectOptions;
}

//Writes the typesetting control interface when main control radio button is clicked.
// * Return:				VOID
// * EH:					onload(), onclick()
function writeTypesettingControls()
{
	//Declare target object.
	oSettingForm = document.getElementById('settingform');

	//Setting form markup.
	sSettingForm 	= '<table>'
					+ '<tr>'
					+ '<th colspan="3">Typesettings</th>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Font Size(px):</label></td>'
					+ '<td class="text-r"><select name="FontSize" onchange="setFileSetting(this);">'
					+ generateSelectOptions('FontSize', 6, 24, 2)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Column Width:</label></td>'
					+ '<td class="text-r"><select name="ColumnWidth" onchange="setFileSetting(this);">'
					+ generateSelectOptions('ColumnWidth', 1, 10, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Column Gutter:</label></td>'
					+ '<td class="text-r"><select name="ColumnGutter" onchange="setFileSetting(this);">'
					+ generateSelectOptions('ColumnGutter', 1, 10, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>No. Columns:</label></td>'
					+ '<td class="text-r"><select name="Columns" onchange="setFileSetting(this);">'
					+ generateSelectOptions('Columns', 1, 20, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '</table>';

	//Attach form markup.
	oSettingForm.innerHTML = sSettingForm;

	return;
}

//Writes the wideforms control interface when main control radio button is clicked.
// * Return:				VOID
// * EH:					onload(), onclick()
function writeWideFormsControls()
{
	//Declare target object.
	oSettingForm = document.getElementById('settingform');

	//Get wideform ranges.
	var oColumns = document.getElementById('Columns');
	var sColumns = oColumns.value;
	var nColumns = parseInt(sColumns);

	//Setting form markup.
	sSettingForm 	= '<table>'
					+ '<tr>'
					+ '<th colspan="3">Wideforms</th>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Wideform Span(col):</label></td>'
					+ '<td class="text-r"><select name="WideFormSpan">'
					+ generateSelectOptions('WideFormSpan', 2, nColumns, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Label Width(col):</label></td>'
					+ '<td class="text-r"><select name="WideFormLabel">'
					+ generateSelectOptions('WideFormLabel', 2, nColumns, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Input Width(col):</label></td>'
					+ '<td class="text-r"><select name="WideFormInput">'
					+ generateSelectOptions('WideFormInput', 2, nColumns, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td></td>'
					+ '<td class="form_text text-c"><input type="button" class="button" value="Insert" onclick="addWideFormsToFile();" /></td>'
					+ '</tr>'
					+ '</table>';

	//Attach form markup.
	oSettingForm.innerHTML = sSettingForm;

	return;
}

//*!*This needs to be thought about and created as it is the typsettings control!
//Writes the typography control interface when main control radio button is clicked.
// * Return:				VOID
// * EH:					onload(), onclick()
function writeTypographyControls()
{
	//Declare target object.
	oSettingForm = document.getElementById('settingform');

	//Setting form markup.
	sSettingForm 	= '<table>'
					+ '<tr>'
					+ '<th colspan="3">Typography</th>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Font Size(px):</label></td>'
					+ '<td class="text-r"><select name="FontSize" onchange="setFileSetting(this);">'
					+ generateSelectOptions('FontSize', 6, 24, 2)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Column Width:</label></td>'
					+ '<td class="text-r"><select name="ColumnWidth" onchange="setFileSetting(this);">'
					+ generateSelectOptions('ColumnWidth', 1, 10, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Column Gutter:</label></td>'
					+ '<td class="text-r"><select name="ColumnGutter" onchange="setFileSetting(this);">'
					+ generateSelectOptions('ColumnGutter', 1, 10, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>No. Columns:</label></td>'
					+ '<td class="text-r"><select name="Columns" onchange="setFileSetting(this);">'
					+ generateSelectOptions('Columns', 1, 20, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '</table>';

	//Attach form markup.
	oSettingForm.innerHTML = sSettingForm;

	return;
}

//Writes the wireframe control interface when main control radio button is clicked.
// * Return:				VOID
// * EH:					onclick()
function writeWireframeControls()
{
	//Declare target object.
	oSettingForm = document.getElementById('settingform');

	//Setting form markup.
	sSettingForm 	= '<table>'
					+ '<tr>'
					+ '<th colspan="2">Wireframes</th>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Max Grid Hang:</label></td>'
					+ '<td class="text-r"><select name="MaxGridHang" onchange="setFileSetting(this);">'
					+ generateSelectOptions('MaxGridHang', 1, 10, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Max Grid Lift:</label></td>'
					+ '<td class="text-r"><select name="MaxGridLift" onchange="setFileSetting(this);">'
					+ generateSelectOptions('MaxGridLift', 1, 10, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Max Grid Press:</label></td>'
					+ '<td class="text-r"><select name="MaxGridPress" onchange="setFileSetting(this);">'
					+ generateSelectOptions('MaxGridPress', 1, 10, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Max Grid Stretch:</label></td>'
					+ '<td class="text-r"><select name="MaxGridStretch" onchange="setFileSetting(this);">'
					+ generateSelectOptions('MaxGridStretch', 1, 24, 1)
					+ '</select></td>'
					+ '</tr>'
					+ '</table>';

	//Attach form markup.
	oSettingForm.innerHTML = sSettingForm;
	
	return;
}

//Writes the identifier control interface when main control radio button is clicked.
// * Return:				VOID
// * EH:					onclick()
function writeIdentifierControls()
{
	//Declare target object.
	oSettingForm = document.getElementById('settingform');

	//Setting form markup.
	sSettingForm 	= '<table>'
					+ '<tr>'
					+ '<th colspan="2">Identifiers</th>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Selector:</label></td>'
					+ '<td class="text-r"><input type="text" class="text" /></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Classes:</label></td>'
					+ '<td class="text-r"><input type="text" class="text" /></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td></td>'
					+ '<td class="form_text text-c"><input type="button" class="button" value="Enter" onclick="addIdentifierToFile();" /></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Overflow:</label></td>'
					+ '<td class="text-r"><input type="text" class="text" /></td>'
					+ '</tr>'
					+ '</table>';

	//Attach form markup.
	oSettingForm.innerHTML = sSettingForm;
	
	return;
}

//Writes the options control interface when main control radio button is clicked.
// * Return:				VOID
// * EH:					onclick()
function writeOptionControls()
{
	//Declare target object.
	oSettingForm = document.getElementById('settingform');

	//Setting form markup.
	sSettingForm 	= '<table>'
					+ '<tr>'
					+ '<th colspan="3">Options</th>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Settings CSS:</label></td>'
					+ '<td class="text-r squeeze-1"><input type="button" class="button" value="Output" onclick="generateSettingsStylesheetCode();" /></td>'
					+ '<td><input type="button" class="button" value="Reset" onclick="resetBlueprintSettings();" /></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Layout CSS:</label></td>'
					+ '<td class="text-r squeeze-1"><input type="button" class="button" value="Output" onclick="generateLayoutStylesheetCode();" /></td>'
					+ '<td><input type="button" class="button" value="Reset" onclick="resetIdentifiers();" /></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Template HTML:</label></td>'
					+ '<td class="text-r squeeze-1"><input type="button" class="button" value="Output" onclick="generateMarkupTemplateCode();" /></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Wigdets CSS:</label></td>'
					+ '<td class="text-r squeeze-1"><input type="button" class="button" value="Output" onclick="generateWidgetsStyleSheetCode();" /></td>'
					+ '</tr>'
					+ '<tr class="stretch-2">'
					+ '<td><label>Wigdets JS:</label></td>'
					+ '<td class="text-r squeeze-1"><input type="button" class="button" value="Output" onclick="generateWidgetsJavascriptCode();" /></td>'
					+ '</tr>'
					+ '</table>';

	//Attach form markup.
	oSettingForm.innerHTML = sSettingForm;

	return;
}



///////////////////////////////////////////////////////////////////////////////
//        I N T E R F A C E   S E T T I N G S   F U N C T I O N S            //
///////////////////////////////////////////////////////////////////////////////

//Set select option value to corresponding element in <form name="defaults">.
// - oSelectInput:			Select element being changed
// * Return:				VOID
// * EH:					onchange()
function setFileSetting(oSelectInput)
{
	sSettingId = oSelectInput.name;
	nSettingValue = oSelectInput.value;
	document.getElementById(sSettingId).value = nSettingValue;

	return;
}

//Resets layout.css constructor values held in <form name="defaults">.
// * Return:				VOID
// * EH:					onclick()
function resetBlueprintSettings()
{
	//Assign default values into defaults form.
	document.getElementById('FontSize').value = nDefaultFontSize;
	document.getElementById('ColumnWidth').value = nDefaultColumnWidth;
	document.getElementById('ColumnGutter').value = nDefaultColumnGutter;
	document.getElementById('Columns').value = nDefaultColumns;
	document.getElementById('MaxGridHang').value = nDefaultMaxGridHang;
	document.getElementById('MaxGridLift').value = nDefaultMaxGridLift;
	document.getElementById('MaxGridPress').value = nDefaultMaxGridPress;
	document.getElementById('MaxGridStretch').value = nDefaultMaxGridStretch;

	return;
}

//Resets wireframe.css constructor values held in <table id="identifiers">.
// * Return:				VOID
// * EH:					onclick()
function resetIdentifiers()
{
	//Loop through data table and remove any created table rows.
	var bIdentifiers = true;
	var nloop = 0;
	while (bIdentifiers)
	{
		var oIdentifiersTable = document.getElementById('identifiers');
		var oIdentifiersTableRows = oIdentifiersTable.getElementsByTagName('tbody');
		var nIdentifierRows = oIdentifiersTableRows.length;

		if (nIdentifierRows <= 1)
		{
			bIdentifiers = false;
		}
		else
		{
			var oTableRowParent = oIdentifiersTableRows[nIdentifierRows - 1].parentNode;
			var oEmptyParent = oTableRowParent.removeChild(oIdentifiersTableRows[nIdentifierRows - 1]);
		}
	}

	return;
}

function addWideFormsToFile()
{
	//Declare form input objects.
	oSpanInput = document.getElementById('settingform').getElementsByTagName('select')[0];
	oLabelInput = document.getElementById('settingform').getElementsByTagName('select')[1];
	oInputInput = document.getElementById('settingform').getElementsByTagName('select')[2];

	//Form input values.
	sSpanInput = oSpanInput.value;
	sLabelInput = oLabelInput.value;
	sInputInput = oInputInput.value;

	//Make sure the label and input values match the wideform span.
	if (parseInt(sLabelInput) + parseInt(sInputInput) != parseInt(sSpanInput))
	{
		alert('Label and inputs do not match the form width!');
		return;
	}

	//Add input values into holder object.
	cacheWideFormParamters(sSpanInput, sLabelInput, sInputInput);

	//Output value and cleanup form.
	oSpanInput.value = '';
	oLabelInput.value = '';
	oInputInput.value = '';
}

//Add converted widefrom settings in hash form to holder <table id="wideforms">.
// - sSpan:					Width in spans of the wideform which has settings held to it
// - sLabel:				Width value in spans of the label for the wideform
// - sInput:				Width value in spans of the inputs for the wideform
// * Return:				Extra classes not recognised by wireframe.
function cacheWideFormParamters(sSpan, sLabel, sInput)
{
	//Create table row for new data.
	var oWideFormsTable = document.getElementById('wideforms');
	sWideFormsTable = oWideFormsTable.innerHTML;

	//Check match for existing identifier.
	aWideFormsTableRows = oWideFormsTable.getElementsByTagName('tr');
	bWideFormsSpanExist = false;
	for (i = 0; i < aWideFormsTableRows.length; i++)
	{
		//Modify existing table row.
		if ((i > 0) && (aWideFormsTableRows[i].getElementsByTagName('td')[0].innerHTML == sSpan))
		{
			bWideFormsSpanExist = true;
			aWideFormsTableRows[i].getElementsByTagName('td')[1].innerHTML = sLabel;
			aWideFormsTableRows[i].getElementsByTagName('td')[0].innerHTML = sInput;
		}
	}

	//If widefrom does not exist add it to the table.
	if (!bWideFormsSpanExist)
	{
		var sNewWideFormRow = '<tbody><tr>';
		aTableHeaders = oWideFormsTable.getElementsByTagName('th');
		sNewWideFormRow += '<td>' + sSpan + '</td>'
						+ '<td>' + sLabel + '</td>'
						+ '<td>' + sInput + '</td>';

		//Close table row.
		sNewWideFormRow += '</tr></tbody>';

		//Add new row to table.
		sWideFormsTable += sNewWideFormRow;
		oWideFormsTable.innerHTML = sWideFormsTable;
	}
}

//Sorts & caches identifiers and their class values on identifiers form while outputting extra classes.
// * Return:				VOID
// * EH:					onclick()
function addIdentifierToFile()
{
	//Declare form input objects.
	oIdentifierInput = document.getElementById('settingform').getElementsByTagName('input')[0];
	oClassesInput = document.getElementById('settingform').getElementsByTagName('input')[1];
	oExtrasInput = document.getElementById('settingform').getElementsByTagName('input')[3];

	//Form input values.
	sIdentifierInput = oIdentifierInput.value;
	sClassesInput = oClassesInput.value;

	//Handler user errors.
	if ((sIdentifierInput == '') && (sClassesInput == ''))
	{
		alert('Please enter Id Name and Classes.');
		oIdentifierInput.focus();
		return;
	}
	else if (sIdentifierInput == '')
	{
		alert('Please enter Id Name.');
		oIdentifierInput.focus();
		return;
	}
	else if (sClassesInput == '')
	{
		alert('Please enter Classes.');
		oClassesInput.focus();
		return;
	}

	//Add input values into holder object.
	sExtrasInput = cacheNewIdentifierClasses(sIdentifierInput, sClassesInput);

	//Output value and cleanup form.
	oIdentifierInput.value = '';
	oClassesInput.value = '';
	oExtrasInput.value = sExtrasInput;
	oExtrasInput.select();

	return;
}

//Converts sStyleClass into a hash value for storage.
// - sStyleClass:			layout.css stylesheet class.
// * Return:				sStyleClass as a hash value.
function convertClassValue(sStyleClass)
{
	//Declare return string.
	var sConvertedClassValue = '';

	//If it is a changable value get representation.
	if (sStyleClass.indexOf('-') != -1)
	{
		sConvertedClassValue = sStyleClass.substring(sStyleClass.indexOf('-') + 1);
	}
	//Otherwise simply assign it as 1.
	else
	{
		sConvertedClassValue = 1;
	}

	return sConvertedClassValue;
}

//Add converted idenetifier classes in hash form to holder <table id="identifiers">.
// - sId:					Id of stylesheet selector to add.
// - sClasses:				Class properties that sId will assume.
// * Return:				Extra classes not recognised by wireframe.
function cacheNewIdentifierClasses(sId, sClasses)
{
	//Declare return string.
	var sExtraClasses = '';

	//Cleanup string.
	var sClassesHolder = sClasses;
	sClassesHolder = sClassesHolder.replace(/\"/g, '');

	//Convert classes string into an array.
	var aClassesHolder = sClassesHolder.split(' ');

	//Create table row for new data.
	var oIdentifiersTable = document.getElementById('identifiers');
	sIdentifiersTable = oIdentifiersTable.innerHTML;

	//Check match for existing identifier.
	aIdentifiersTableRows = oIdentifiersTable.getElementsByTagName('tr');
	for (i = 0; i < aIdentifiersTableRows.length; i++)
	{
		//Exit from function.
		if ((i > 0) && (aIdentifiersTableRows[i].getElementsByTagName('td')[0].innerHTML == sId))
		{
			alert(sId + ' is already in use!');
			return sClasses;
		}
	}

	//Add identifier name to the table.
	var sNewIdentifierRow = '<tbody><tr>';
	aTableHeaders = oIdentifiersTable.getElementsByTagName('th');
	sNewIdentifierRow += '<td>' + sId + '</td>';

	//Construct rest of table row.
	for (i = 1; i < aTableHeaders.length; i++)
	{
  		var sNewCell = '';
		for (n = 0; n < aClassesHolder.length; n++)
		{
			//If we get a match add the converted value and nullify array string.
			if (aClassesHolder[n].indexOf(aTableHeaders[i].innerHTML) != -1)
			{
				sNewCell = '<td>' + convertClassValue(aClassesHolder[n]) + '</td>';
				aClassesHolder[n] = '';
			}

		}

		//If the cell holds no value add a null placeholder.
		if (sNewCell == '')
		{
			sNewCell = '<td>-1</td>';
		}

		//Attach cell to table row.
		sNewIdentifierRow += sNewCell;
	}

	//Close table row.
	sNewIdentifierRow += '</tr></tbody>';

	//Add new row to table.
	sIdentifiersTable += sNewIdentifierRow;
	oIdentifiersTable.innerHTML = sIdentifiersTable;

	//Return extra classes.
	for (i = 0; i < aClassesHolder.length; i++)
	{
		sClassReturnFormat = (aClassesHolder[i] == '')? '': aClassesHolder[i] + ' ';
		sExtraClasses += sClassReturnFormat;
	}

	//Clean up.
	sExtraClasses = sExtraClasses.substring(0, sExtraClasses.length - 1);

	//Finish up.
	document.getElementById('codeoutput').value = sIdentifiersTable;

	return sExtraClasses;
}

//Focuses and selects output element.
// * Return:				VOID
// * EH:					onclick()
function SelectOutputCode()
{
	document.getElementById('codeoutput').focus();
	document.getElementById('codeoutput').select();

	return;
}



////////////////////////////////////////////////////////////////////////////////
//        S T Y L E S H E E T   G E N E R A T I O N   F U N C T I O N S       //
////////////////////////////////////////////////////////////////////////////////

//Generates 'span-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nColumnWidth:			Width of columns in grid units of layout
// - nColumnGutter:			Gutter Width in grid units of layout
// - nColumns:				Number of columns in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStyleSpan(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
{
	//Declare return string.
	var sStyleSpan = '';

	for (i = 0; i < nColumns; i++)
	{
		var nSpan = i + 1;
		var nWidth = (nSpan * nGridUnit * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit);
		sStyleSpan += '\n.span-' + nSpan +'{width:' + nWidth + 'px;}';
	}

	return sStyleSpan;
}

//Generates 'pane-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nColumnWidth:			Width of columns in grid units of layout
// - nColumnGutter:			Gutter Width in grid units of layout
// * Return:				Stylesheet code to be inserted into layout.css
function generateStylePane(nGridUnit, nColumnWidth, nColumnGutter)
{
	//Declare return string.
	var sStylePane = '';

	var nMaxPaneMargins = nColumnWidth + nColumnGutter;
	for (i = 0; i < nMaxPaneMargins; i++)
	{
		var nPane = i + 1;
		var nWidth = nGridUnit * nPane;
		sStylePane += '\n.pane-' + nPane + '{margin:0 ' + nWidth + 'px;}';
	}
	
	return sStylePane;
}

//Generates 'push-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nColumnWidth:			Width of columns in grid units of layout
// - nColumnGutter:			Gutter Width in grid units of layout
// - nColumns:				Number of columns in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStylePush(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
{
	//Declare return string.
	var sStylePush = '';

	for (i = 0, j = Math.round(nColumns / 2); i < j; i++)
	{
		var nDistance = i * nGridUnit * (nColumnWidth + nColumnGutter);
		sStylePush += '\n.push-' + i + '{margin-left:' + nDistance + 'px;}';
	}
	
	return sStylePush;
}

//Generates 'pull-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nColumnWidth:			Width of columns in grid units of layout
// - nColumnGutter:			Gutter Width in grid units of layout
// - nColumns:				Number of columns in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStylePull(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
{
	//Declare return string.
	var sStylePull = '';
	
	for (i = 0, j = Math.round(nColumns / 2); i < j; i++)
	{
		var nDistance = i * nGridUnit * (nColumnWidth + nColumnGutter);
		sStylePull += '\n.pull-' + i + '{margin-right:' + nDistance + 'px;}';
	}

	return sStylePull;
}

//Generates 'append-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nColumnWidth:			Width of columns in grid units of layout
// - nColumnGutter:			Gutter Width in grid units of layout
// - nColumns:				Number of columns in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStyleAppend(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
{
	//Declare return string.
	var sStyleAppend = '';

	for (i = 0; i < nColumns; i++)
	{
		var Append = i + 1;
		var nPadding = (Append * nGridUnit * (nColumnWidth + nColumnGutter)) + (nGridUnit / 2 * nColumnGutter);
		sStyleAppend += '\n.append-' + Append + '{margin-right:' + nPadding + 'px;}';
	}

	return sStyleAppend;
}

//Generates 'prepend-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nColumnWidth:			Width of columns in grid units of layout
// - nColumnGutter:			Gutter Width in grid units of layout
// - nColumns:				Number of columns in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStylePrepend(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
{
	//Declare return string.
	var sStylePrepend = '';

	for (i = 0; i < nColumns; i++)
	{
		var nPrepend = i + 1;
		var nPadding = (nPrepend * nGridUnit * (nColumnWidth + nColumnGutter)) + (nGridUnit / 2 * nColumnGutter);
		sStylePrepend += '\n.prepend-' + nPrepend + '{margin-left:' + nPadding + 'px;}';
	}
	
	return sStylePrepend;
}

//Generates 'hang-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nMaxGridHang:			Maximum grid units of hang in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStyleHang(nGridUnit, nMaxGridHang)
{
	//Declare return string.
	var sStyleHang = '';

	for (i = 0; i < (nMaxGridHang + 1); i++)
	{
		var nPadding = i * nGridUnit;
		sStyleHang += '\n.hang-' + i + '{padding-top:' + nPadding + 'px;}';
	}

	return sStyleHang;
}

//Generates 'lift-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nMaxGridLift:			Maximum grid units of lift in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStyleLift(nGridUnit, nMaxGridLift)
{
	//Declare return string.
	var sStyleLift = '';

	for (i = 0; i < (nMaxGridLift + 1); i++)
	{
		var nPadding = i * nGridUnit;
		sStyleLift += '\n.lift-' + i + '{padding-bottom:' + nPadding + 'px;}';
	}

	return sStyleLift;
}

//Generates 'press-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nMaxGridPress:			Maximum grid units of press in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStylePress(nGridUnit, nMaxGridPress)
{
	//Declare return string.
	var sStylePress = '';

	for (i = 0; i < (nMaxGridPress + 1); i++)
	{
		var nMargin = i * nGridUnit;
		sStylePress += '\n.press-' + i + '{margin-bottom:' + nMargin + 'px;}';
	}

	return sStylePress;
}

//Generates 'stretch-*' class selectors for settings.css.
// - nGridUnit:				Number of pixles in each grid unit of layout
// - nMaxGridStretch:		Maximum font units of stretch in layout.css stylesheet
// * Return:				Stylesheet code to be inserted into layout.css
function generateStyleStretch(nGridUnit, nMaxGridStretch)
{
	//Declare return string.
	var sStyleStretch = '';

	for (i = 1; i < (nMaxGridStretch + 1); i++)
	{
		var nHeight = i * 1.5;
		sStyleStretch += '\n.stretch-' + i + '{height:' +  nHeight + 'em;}';
	}

	return sStyleStretch;
}

//Generates settings.css stylesheet based on settings held in <form name="defaults"> to output in <textarea id="codeoutput">.
// * Return:				VOID
// * EH:					onclick()
function generateSettingsStylesheetCode()
{
	//Retrieve stylesheet parameters.
	var nFontSize 			= parseInt(document.getElementById('FontSize').value, 10);
	var nColumnWidth 		= parseInt(document.getElementById('ColumnWidth').value, 10);
	var nColumnGutter 		= parseInt(document.getElementById('ColumnGutter').value, 10);
	var nColumns 			= parseInt(document.getElementById('Columns').value, 10);
	var nMaxGridHang 		= parseInt(document.getElementById('MaxGridHang').value, 10);
	var nMaxGridLift		= parseInt(document.getElementById('MaxGridLift').value, 10);
	var nMaxGridPress		= parseInt(document.getElementById('MaxGridPress').value, 10);
	var nMaxGridStretch		= parseInt(document.getElementById('MaxGridStretch').value, 10);

	//Helper values.
	var nGridUnit = nFontSize * 1.5;

	//Converted values.
	var fFontSizePercent = (nFontSize / 16) * 100000;
	fFontSizePercent = Math.round(fFontSizePercent);
	fFontSizePercent = fFontSizePercent / 1000;

	//Misc.
	var nPageWidth = (nGridUnit * nColumns * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit);
	var nMaxPaneMargins = (nColumnWidth + nColumnGutter);
	var sPaneDecoration = '';
	for (i = 0; i < nMaxPaneMargins; i++)
	{
		var nPane = i + 1;
		sPaneDecoration += ', .pane-' + nPane;
	}

	//Construct output string.
	var sStylesheet	= '/* settings.css'
					+ '\n * Modified from Blueprint v0.4'
					+ '\n * Generated by -Wireframe- v0.6'
					+ '\n *'
					+ '\n * SETTINGS:'
					+ '\n * \tFont Size \t\t= ' + nFontSize + 'px'
					+ '\n * \tGrid Unit \t\t= ' + nGridUnit + 'px'
					+ '\n * \tColumn Width \t= ' + nColumnWidth + '(' + (nColumnWidth * nGridUnit) + 'px)'
					+ '\n * \tColumn Gutter \t= ' + nColumnGutter + '(' + (nColumnGutter * nGridUnit) + 'px)'
					+ '\n * \tNo. Columns \t= ' + nColumns + '(' + nPageWidth + 'px)'
					+ '\n */'
					+ '\n\n/* Images */'
					+ '\n.container{background:url(\'' + sGridImagePath + '\');}'
					+ '\n.screen-l, .screen-r{background-color: #dfa;}'
					+ '\n.pane-0, .pane-h' + sPaneDecoration + '{border-width:0 1px;border-style:solid;border-color:#f96;background-color:#ffc;background-image:url(\'' + sFrameImagePath + '\');background-position:bottom left;background-repeat:repeat-x;}'
					+ '\n.melt{border-width:0px;background:none;}'
					+ '\n\n/* Resets */'
					+ '\nhtml,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;font-size:100%;font-weight:inherit;font-style:inherit;font-family:inherit;vertical-align:baseline;}'
					+ '\nbody{line-height:1;color:#333;background:white;}'
					+ '\ntable{border-collapse:separate;border-spacing:0;}'
					+ '\ncaption,th,td{text-align:left;font-weight:normal;}'
					+ '\nol,ul{list-style-type:none;}'
					+ '\nblockquote:before,blockquote:after,q:before,q:after{content:"";}'
					+ '\nblockquote,q{quotes:"" "";}'
					+ '\n:focus{outline:0;}'
					+ '\n\n/* Typography */'
					+ '\nbody{line-height:1.5;font-family:Verdana,"Lucida Grande",Helvetica,Arial,sans-serif;}'
					+ '\nbody{font-size:' + fFontSizePercent + '%;} /* IE */'
					+ '\nhtml > body{font-size:' + nFontSize + 'px;}'
					+ '\n.hide{display:none;}'
					+ '\nh1,h2,h3,h4,h5,h6{clear:both;font-family:Georgia,Helvetica,Arial,"Lucida Grande",Verdana,sans-serif;color:#111;}'
					+ '\nh1{font-size:3em;font-weight:normal;}'
					+ '\nh2{font-size:2em;font-weight:normal;}'
					+ '\nh3{font-size:1.5em;line-height:2;font-weight:normal;}'
					+ '\nh4{font-size:1.2em;line-height:1;font-weight:bold;}'
					+ '\nh5{font-size:1em;font-weight:bold;}'
					+ '\nh6{font-size:1em;}'
					+ '\nhr{float:none;clear:both;width:100%;height:0.1em;margin:0 0 1.4em 0;border:medium none;color:#999;background:#999;}'
					+ '\n* html hr{margin: -0.7em 0 0.9em 0;} /* IE6 */'
					+ '\np{margin:0 0 1.5em 0;text-indent:1.5em;}'
					+ '\nimg{margin:0 0 1.5em 0;}'
					+ '\np img{float:left;margin:1.5em 1.5em 1.5em 0;padding:0;}'
					+ '\np img.top{margin-top:0;}'
					+ '\np.small{font-size:0.8em;margin-bottom:1.875em;line-height:1.875em;}'
					+ '\np.large{font-size:1.2em;line-height:2.5em;}'
					+ '\np.quiet{color:#666;}'
					+ '\nul, ol{margin:0 0 1.5em 3em;}'
					+ '\ndl{margin:1.5em;}'
					+ '\ndl dt{font-weight:bold;}'
					+ '\ndd{margin-left:1.5em;margin-bottom:1.5em;text-indent:1.5em;}'
					+ '\np li, dd li{text-indent:0;}'
					+ '\na{color:#125AA7;text-decoration:underline;outline:none;}'
					+ '\na:hover{color:#f00;}'
					+ '\nblockquote{margin:1.5em 0 1.5em 1.5em;font-style:italic;color:#666;}'
					+ '\nstrong{font-weight:bold;}'
					+ '\nem{font-style:italic;}'
					+ '\npre{margin-bottom:1.3em;padding:1.5em;background:#eee;border:0.1em solid #ddd;}'
					+ '\ncode{font:0.9em Monaco, monospace;}'
					+ '\ntable{width:100%;}'
					+ '\nth,td{vertical-align:top;}'
					+ '\nth{font-weight:bold;}'
					+ '\nlabel{font-weight:bold;}'
					+ '\n\n/* Grid */'
					+ '\nbody{margin:' + nGridUnit + 'px 0;text-align:center;}'
					+ '\n.container{position:relative;width:' + nPageWidth + 'px;margin:0 auto;padding:0;text-align:left;}'
					+ '\n.screen-l{float:left;margin:0 ' + (nGridUnit / 2) + 'px;}'
					+ '\n.screen-r{float:right;margin:0 ' + (nGridUnit / 2) + 'px;}'
					+ '\n* html .container{overflow-x:hidden;} /* IE6 */'
					+ '\n* html .screen-l{display:inline;overflow-x:hidden;} /* IE6 */'
					+ '\n* html .screen-r{display:inline;overflow-x:hidden;} /* IE6 */'
					+ '\n.drop-l{clear:left;}'
					+ '\n.drop-r{clear:right;}'
					+ '\n.drop-b{clear:both;}'
					+ '\n.clear{display:inline-block;}'
					+ '\n.clear:after, .container:after{content:".";display:block;clear:both;visibility:hidden;height:0;}'
					+ '\n* html .clear{height:1%;} /* IE6 */'
					+ '\n.clear{display:block;}'
					+ '\n.hscroll{white-space:nowrap;overflow:scroll;}'
					+ '\n.vscroll{overflow:auto;}'
					+ generateStyleSpan(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
					+ '\n.pane-0{margin:0;}'
					+ '\n.pane-h{margin:0 ' + ((nColumnGutter / 2) * nGridUnit) + 'px;}'
					+ generateStylePane(nGridUnit, nColumnWidth, nColumnGutter)
					+ generateStylePush(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
					+ generateStylePull(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
					+ generateStyleAppend(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
					+ generateStylePrepend(nGridUnit, nColumnWidth, nColumnGutter, nColumns)
					+ '\n\n/* Wireframe */'
					+ '\n.text-l{text-align:left;}'
					+ '\n.text-r{text-align:right;}'
					+ '\n.text-c{text-align:center;}'
					+ '\n.text-j{text-align:justify;}'
					+ '\n.squeeze-0{padding-right:0px;padding-left:0px;}'
					+ '\n.squeeze-h{padding-right:' + (nGridUnit / 2) + 'px;padding-left:' + (nGridUnit / 2) + 'px;}'
					+ '\n.squeeze-1{padding-right:' + nGridUnit + 'px;padding-left:' + nGridUnit + 'px;}'
					+ '\n.squeeze-2{padding-right:' + (nGridUnit * 2) + 'px;padding-left:' + (nGridUnit * 2) + 'px;}'
					+ '\n.squeeze-3{padding-right:' + (nGridUnit * 3) + 'px;padding-left:' + (nGridUnit * 3) + 'px;}'
					+ generateStyleHang(nGridUnit, nMaxGridHang)
					+ generateStyleLift(nGridUnit, nMaxGridLift)
					+ generateStylePress(nGridUnit, nMaxGridPress)
					+ generateStyleStretch(nGridUnit, nMaxGridStretch);

	//Output string to code textarea.
	document.getElementById('codeoutput').value = sStylesheet;

	return;
}

//Generates layout.css stylesheet based on settings held in <form name="defaults"> to output in <textarea id="codeoutput">.
// * Return:				VOID
// * EH:					onclick()
function generateLayoutStylesheetCode()
{
	//Retrieve stylesheet parameters.
	var nFontSize 		= parseInt(document.getElementById('FontSize').value, 10);
	var nColumnWidth 	= parseInt(document.getElementById('ColumnWidth').value, 10);
	var nColumnGutter 	= parseInt(document.getElementById('ColumnGutter').value, 10);
	var nColumns 		= parseInt(document.getElementById('Columns').value, 10);

	//Additional values.
	var nNumOfClasses	= 16;
	var nStyleValues	= 13;
	var nGridUnit 		= nFontSize * 1.5;
	var nPageWidth 		= (nGridUnit * nColumns * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit);

	var sStylesheet 	= '/* layout.css'
						+ '\n * Modified from Blueprint v0.4'
						+ '\n * Generated by -Wireframe- v0.6'
						+ '\n *'
						+ '\n * SETTINGS:'
						+ '\n * \tFont Size \t\t= ' + nFontSize + 'px'
						+ '\n * \tGrid Unit \t\t= ' + nGridUnit + 'px'
						+ '\n * \tColumn Width \t= ' + nColumnWidth + '(' + (nColumnWidth * nGridUnit) + 'px)'
						+ '\n * \tColumn Gutter \t= ' + nColumnGutter + '(' + (nColumnGutter * nGridUnit) + 'px)'
						+ '\n * \tNo. Columns \t= ' + nColumns + '(' + nPageWidth + 'px)'
						+ '\n */';
	//Add wideform selectors.
	var oWideFormsTable = document.getElementById('wideforms');
	var nNumTableRows = oWideFormsTable.getElementsByTagName('tr').length;
	//must also get the span and gutter size here.
	var i = 1;
	while (nNumTableRows > 1)
	{

		var sSpan = oWideFormsTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerHTML;
		var sLabel = oWideFormsTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML;
		var sInput = oWideFormsTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML;
		var nSpan = parseInt(sSpan, 10);
		var nLabel = parseInt(sLabel, 10);
		var nInput = parseInt(sInput, 10);

		var nFormWidth = (nSpan * nGridUnit * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit) - (nGridUnit * 2);
		var nLabelWidth = (nLabel * nGridUnit * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit);
		var nInputWidth = (nInput * nGridUnit * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit);
		var nShortInputWidth = (Math.ceil(nInput / 2) * nGridUnit * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit);
		var nShortInputMargin = (Math.floor(nInput / 2) * nGridUnit * (nColumnWidth + nColumnGutter)) - (nColumnGutter * nGridUnit);

		//Add widform style declaration to stylesheet;
		sStylesheet += '\n\n/* wideform-10(Label:' + nLabel +', Input:' + nInput + ') */'
					+ '\n.wideform-' + nSpan + '{clear:both;padding-top:0px;}'
					+ '\n.wideform-' + nSpan + '{width:' + nFormWidth + 'px;padding:' + nGridUnit + 'px;font-family:verdana;background-color:none;border:0px solid #eee;border-top-width:0;}'
					+ '\n.wideform-' + nSpan + ' legend{width:100%;font-size:1.5em;line-height:2;font-weight:normal;color:#22761A;}'
					+ '\n.wideform-' + nSpan + ' legend a.icon{display:block;float:right;margin-top:0.5em;}'
					+ '\n.wideform-' + nSpan + ' ul{margin:0;}'
					+ '\n.wideform-' + nSpan + ' li{float:left;clear:both;width:' + nFormWidth + 'px;}'
					+ '\n.wideform-' + nSpan + ' li.short{height:' + (2 * nGridUnit) + 'px;}'
					+ '\n.wideform-' + nSpan + ' li.short-error{height:' + (3 * nGridUnit) + 'px;}'
					+ '\n.wideform-' + nSpan + ' li.long{height:' + (10 * nGridUnit) + 'px;}'
					+ '\n.wideform-' + nSpan + ' li.long-error{height:' + (11 * nGridUnit) + 'px;}'
					+ '\n.wideform-' + nSpan + ' li.xlong{height:' + (20 * nGridUnit) + 'px;}'
					+ '\n.wideform-' + nSpan + ' li.xlong-error{height:' + (21 * nGridUnit) + 'px;}'
					+ '\n.wideform-' + nSpan + ' input{float:left;display:block;}'
					+ '\n.wideform-' + nSpan + ' label{float:left;display:block;width:' + (nLabelWidth - nGridUnit) + 'px;margin-bottom:' + nFontSize + 'px;margin-right:' + nGridUnit + 'px;text-align:right;font-weight:normal;}'
					+ '\n.wideform-' + nSpan + ' li.icon label{width:' + (nLabelWidth - nGridUnit - 35) + 'px;}'
					+ '\n.wideform-' + nSpan + ' label:hover{cursor:pointer;color:#22761A;}'
					+ '\n.wideform-' + nSpan + ' label.chk, li.icon label.chk{float:right;width:' + (nInputWidth - (nGridUnit * 2) - 18) + 'px;text-align:left;}'
					+ '\n.wideform-' + nSpan + ' input.chk{margin-left:' + nLabelWidth + 'px;padding-right:9px;}'
					+ '\n.wideform-' + nSpan + ' li.icon input.chk{margin-left:' + (nLabelWidth - 35) + 'px;}'
					+ '\n.wideform-' + nSpan + ' label.chk:after{content:"";}'
					+ '\n.wideform-' + nSpan + ' label:after{content:":";}'
					+ '\n.wideform-' + nSpan + ' label.blank:after{content:"";}'
					+ '\n.wideform-' + nSpan + ' input.bttn{margin-left:' + nLabelWidth + 'px;}'
					+ '\n.wideform-' + nSpan + ' input.bttn:hover{cursor:pointer;}'
					+ '\n.wideform-' + nSpan + ' input.short{float:left;width:' + (nShortInputWidth - 9) + 'px;margin-right:' + nShortInputMargin + 'px;}'
					+ '\n.wideform-' + nSpan + ' input.long{width:' + (nInputWidth - nGridUnit - 9) + 'px;}'
					+ '\n.wideform-' + nSpan + ' input.upl{position:relative;}'
					+ '\n.wideform-' + nSpan + ' textarea.short{width:' + (nInputWidth - nGridUnit - 9) + 'px;height:' + ((10 * nGridUnit) - (2 * nFontSize)) +  'px;margin-bottom:' + (nGridUnit / 2) + 'px;}'
					+ '\n.wideform-' + nSpan + ' textarea.long{width:' + (nInputWidth - nGridUnit - 9) + 'px;height:' + ((20 * nGridUnit) - (2 * nFontSize)) +  'px;margin-bottom:' + (nGridUnit / 2) + 'px;}'
					+ '\n.wideform-' + nSpan + ' em{display:block;padding-bottom:0.25em;text-align:left;color:red;}'
					+ '\n.wideform-' + nSpan + ' b{clear:left;display:block;margin-left:' + nLabelWidth + 'px;color:#22761A;font-weight:normal;font-style:italic;}'
					+ '\n.wideform-' + nSpan + ' span.pre{display:block;float:left;}';

		//Iteration.
		i++;
		nNumTableRows = nNumTableRows - 1;
	}
	sStylesheet += '\n\n/* Selectors */';

	//Get indentifiers holding data.
	var oIdentifiersTable = document.getElementById('identifiers');

	var nNumTableRows = oIdentifiersTable.getElementsByTagName('tr').length;
	var i = 1;
	//Loop through each row to construct id styles.
	while (nNumTableRows > 1)
	{
		var sIdentifier = oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerHTML;

		//Initialise style values holder array.
		aStyleValues = new Array();
		for (n = 0; n < (nStyleValues + 1); n++)
		{
			aStyleValues[n] = '';
		}

		//Add .container style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML != '-1')
		{
			aStyleValues[0] = 'position:relative;';
			aStyleValues[2] = 'width:' + nPageWidth + 'px;';
			aStyleValues[4] = '0';
			aStyleValues[5] = 'auto';
			aStyleValues[6] = '0';
			aStyleValues[7] = 'auto';
			aStyleValues[8] = '0';
			aStyleValues[9] = '0';
			aStyleValues[10] = '0';
			aStyleValues[11] = '0';
			aStyleValues[12] = 'text-align:left;';
		}
		//Add .screen style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML != '-1')
		{
			var sScreen = oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML;

			var sFloat = '';
			switch (sScreen)
			{
				case 'l': sFloat = 'left'; break;
				case 'r': sFloat = 'right'; break;
			}

			aStyleValues[1] = 'float:' + sFloat + ';';
			aStyleValues[5] = (nGridUnit / 2 * nColumnGutter) + 'px';
			aStyleValues[7] = (nGridUnit / 2 * nColumnGutter) + 'px';
		}
		//Add .pane style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].innerHTML != '-1')
		{
			var sPane = oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].innerHTML;
			var nMargin = (sPane == 'h')? 0.5: parseInt(sPane, 10);
			aStyleValues[5] = (nGridUnit * nMargin) + 'px';
			aStyleValues[7] = (nGridUnit * nMargin) + 'px';
		}
		//Add .drop style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].innerHTML != '-1')
		{
			var sDrop = oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].innerHTML;

			var sClear = '';
			switch (sDrop)
			{
				case 'l': sClear = 'left'; break;
				case 'r': sClear = 'right'; break;
				case 'b': sClear = 'both'; break;
			}

			aStyleValues[13] = 'clear:' + sClear + ';';
		}
		//Add .span style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[5].innerHTML != '-1')
		{
			var nSpan = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[5].innerHTML, 10);
			aStyleValues[2] = 'width:' + ((nSpan * nGridUnit * (nColumnWidth + nColumnGutter)) - (nGridUnit * nColumnGutter)) + 'px;';
		}
		//Add .append style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[6].innerHTML != '-1')
		{
			var nAppend = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[6].innerHTML, 10);
			aStyleValues[5] = ((nAppend * nGridUnit * (nColumnWidth + nColumnGutter)) - (nGridUnit / 2 * nColumnGutter)) + 'px';
		}
		//Add .prepend style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[7].innerHTML != '-1')
		{
			var nPrepend = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[7].innerHTML, 10);
			aStyleValues[7] = ((nPrepend * nGridUnit * (nColumnWidth + nColumnGutter)) - (nGridUnit / 2 * nColumnGutter)) + 'px';
		}
		//Add .pull style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[8].innerHTML != '-1')
		{
			var nPull = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[8].innerHTML, 10);
			aStyleValues[5] = (nPull * nGridUnit * (nColumnWidth + nColumnGutter)) + 'px';
		}
		//Add .push style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[9].innerHTML != '-1')
		{
			var nPush = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[9].innerHTML, 10);
			aStyleValues[7] = (nPush * nGridUnit * (nColumnWidth + nColumnGutter)) + 'px';
		}
		//Add .text style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[10].innerHTML != '-1')
		{
			var sText = oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[10].innerHTML;

			var sTextAlign = '';
			switch (sText)
			{
				case 'l': sTextAlign = 'left'; break;
				case 'r': sTextAlign = 'right'; break;
				case 'c': sTextAlign = 'center'; break;
				case 'j': sTextAlign = 'justify'; break;
			}

			aStyleValues[12] = 'text-align:' + sTextAlign + ';';
		}
		//Add .squeeze style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[11].innerHTML != '-1')
		{
			var sSqueeze = oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[11].innerHTML;
			var nSqueeze = (sSqueeze == 'h')? 0.5: parseInt(sSqueeze, 10);
			aStyleValues[9] = (nGridUnit * nSqueeze) + 'px';
			aStyleValues[11] = (nGridUnit * nSqueeze) + 'px';
		}
		//Add .hang style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[12].innerHTML != '-1')
		{
			var nHang = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[12].innerHTML, 10);
			aStyleValues[8] = (nGridUnit * nHang) + 'px';
		}
		//Add .lift style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[13].innerHTML != '-1')
		{
			var nLift = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[13].innerHTML, 10);
			aStyleValues[10] = (nGridUnit * nLift) + 'px';
		}
		//Add .press style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[14].innerHTML != '-1')
		{
			var nPress = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[14].innerHTML, 10);
			aStyleValues[6] = (nGridUnit * nPress) + 'px';
		}
		//Add .stretch style values to holder.
		if (oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[15].innerHTML != '-1')
		{
			var nStretch = parseInt(oIdentifiersTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[15].innerHTML, 10);
			aStyleValues[3] = 'height:' + (1.5 * nStretch) + 'em;';
		}

		//Finish margin value formatting.
		var sMarginStyle = '';
		if ((aStyleValues[4] == '') && (aStyleValues[5] == '') && (aStyleValues[6] == '') && (aStyleValues[7] == ''))
		{
			sMarginStyle = '';
		}
		else if ((aStyleValues[4] == '') || (aStyleValues[5] == '') || (aStyleValues[6] == '') || (aStyleValues[7] == ''))
		{
			aStyleValues[4] = (aStyleValues[4] == '')? '': 'margin-top:' + aStyleValues[4] + ';';
			aStyleValues[5] = (aStyleValues[5] == '')? '': 'margin-right:' + aStyleValues[5] + ';';
			aStyleValues[6] = (aStyleValues[6] == '')? '': 'margin-bottom:' + aStyleValues[6] + ';';
			aStyleValues[7] = (aStyleValues[7] == '')? '': 'margin-left:' + aStyleValues[7] + ';';

			sMarginStyle = aStyleValues[4] + aStyleValues[5] + aStyleValues[6] + aStyleValues[7];
		}
		else if ((aStyleValues[4] == aStyleValues[6]) && (aStyleValues[5] == aStyleValues[7]))
		{
			if (aStyleValues[4] == aStyleValues[5])
			{
				sMarginStyle = 'margin:' + aStyleValues[4] + ';';
			}
			else
			{
				sMarginStyle = 'margin:' + aStyleValues[4] + ' ' + aStyleValues[5] + ';';
			}
		}
		else
		{
			sMarginStyle = 'margin:' + aStyleValues[4] + ' ' + aStyleValues[5] + ' ' + aStyleValues[6] + ' ' + aStyleValues[7] + ';';
		}

		//Finish padding value formatting.
		var sPaddingStyle = '';
		if ((aStyleValues[8] == '') && (aStyleValues[9] == '') && (aStyleValues[10] == '') && (aStyleValues[11] == ''))
		{
			sPaddingStyle = '';
		}
		else if ((aStyleValues[8] == '') || (aStyleValues[9] == '') || (aStyleValues[10] == '') || (aStyleValues[11] == ''))
		{
			aStyleValues[8] = (aStyleValues[8] == '')? '': 'padding-top:' + aStyleValues[8] + ';';
			aStyleValues[9] = (aStyleValues[9] == '')? '': 'padding-right:' + aStyleValues[9] + ';';
			aStyleValues[10] = (aStyleValues[10] == '')? '': 'padding-bottom:' + aStyleValues[10] + ';';
			aStyleValues[11] = (aStyleValues[11] == '')? '': 'padding-left:' + aStyleValues[11] + ';';

			sPaddingStyle = aStyleValues[8] + aStyleValues[9] + aStyleValues[10] + aStyleValues[11];
		}
		else if ((aStyleValues[8] == aStyleValues[10]) && (aStyleValues[9] == aStyleValues[11]))
		{
			if (aStyleValues[8] == aStyleValues[10])
			{
				sPaddingStyle = 'padding:' + aStyleValues[8] + ';';
			}
			else
			{
				sPaddingStyle = 'padding:' + aStyleValues[8] + ' ' + aStyleValues[10] + ';';
			}
		}
		else
		{
			sPaddingStyle = 'padding:' + aStyleValues[8] + ' ' + aStyleValues[9] + ' ' + aStyleValues[10] + ' ' + aStyleValues[11] + ';';
		}

		//Add indentifier style declaration to stylesheet;
		sStylesheet += '\n#' + sIdentifier + '{'
					+ aStyleValues[0]
					+ aStyleValues[1]
					+ aStyleValues[13]
					+ aStyleValues[2]
					+ aStyleValues[3]
					+ sMarginStyle
					+ sPaddingStyle
					+ aStyleValues[12]
					+ '}';

		//Iteration.
		i++;
		nNumTableRows = nNumTableRows - 1;
	}

	//Output string to code textarea.
	document.getElementById('codeoutput').value = sStylesheet;

	return;
}

//Generates a standard XHTML markup template to output in <textarea id="codeoutput">.
// * Return:				VOID
// * EH:					onclick()
function generateMarkupTemplateCode()
{
	var sMarkup = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
				+ '\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">'
				+ '\n<head>'
				+ '\n\t<title></title>'
				+ '\n\n<!-- Meta tags -->'
				+ '\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
				+ '\n\t<meta name="keywords" content="" />'
				+ '\n\t<meta name="description" content="" />'
				+ '\n\t<meta name="copyright" content="" />'
				+ '\n\t<meta name="author" content="" />'
				+ '\n\t<meta name="rating" content="general" />'
				+ '\n\t<meta name="robots" content="all" />'
				+ '\n\n<!-- Favicon -->'
				+ '\n\t<link rel="shortcut icon" href="favicon.ico" />'
				+ '\n\n<!-- Stylesheet -->'
				+ '\n\t<link rel="stylesheet" href="settings.css" type="text/css" media="screen, projection">'
				+ '\n\t<link rel="stylesheet" href="layout.css" type="text/css" media="screen, projection">'
				+ '\n\n<!-- Javascript -->'
				+ '\n\t<script src=".js" type="text/javascript"></script>'
				+ '\n\n</head>'
				+ '\n<body>'
				+ '\n\n<div class="container">'
				+ '\n\n\n\n</div>'
				+ '\n\n</body>'
				+ '\n</html>';

	//Output string to code textarea.
	document.getElementById('codeoutput').value = sMarkup;

	return;
}

function generateWidgetsStyleSheetCode()
{
	var sMarkup = 'ul.flat li{display:inline;}'
				+ '\ndl.flat dt{display:block;clear:left;float:left;width:auto;}'
				+ '\ndl.flat dd{display:inline;margin-left:100px:}'
				+ '\n\nul.pagination{float:right;margin:18px;}'
				+ '\nul.pagination li{display:block;float:left;margin-right:9px;}'
				+ '\nul.pagination a, ul.pagination b{display:block;padding:8px 17px;border:1px solid #ccc;font-weight:bold;background-color:#efefef;}'
				+ '\nul.pagination a{text-decoration:none;}'
				+ '\nul.pagination a:hover{background-color:#e8e8e8;}'
				+ '\nul.pagination b{color:#b4b4b4;}'
				+ '\n\ntable.zebra{border-width:1px 1px 0 1px;border-style:solid;border-color:#ccc;}'
				+ '\ntable.zebra th, table.zebra td{padding:0.5em 0;border-bottom:1px solid #ccc;}'
				+ '\ntable tr.striped td, table tr.striped th{background-color:#EEF4FB;}'
				+ '\ntable tr.highlight td{background-color:#FFFFA4;}'
				+ '\ntable.info{border-width:0px 1px 1px 1px;border-style:solid;border-color:#ccc;}'
				+ '\ntable.info th, table.info td{padding:6px;}'
				+ '\ntable.info th{padding-top:5px;padding-bottom:5px;border-width:1px 0px;border-style:solid;border-color:#ccc;background-color:#EEF4FB}'
				+ '\n\na.icon{display:block;width:22px;height:22px;border:1px solid transparent;margin:0 6px;}'
				+ '\na.icon, b.icon{float:left;display:block;width:16px;height:16px;padding:2px;border:1px solid transparent;}'
				+ '\na.icon:hover{border-color:#74A032;background-color:#E4FFBB;}'
				+ '\na.icon img{display:block;float:left;margin-bottom:0;padding-right:9px;}'
				+ '\nli a.icon{margin-top:0.5em;}'
				+ '\nform li a.icon{margin-top:0;}'
				+ '\ntd.icon{width:36px;}'
				+ '\n\nul.vmenu{width:270px;margin:0;margin-bottom:18px;border-top:1px solid #ccc;}'
				+ '\nul.vmenu a{display:block;width:216px;padding:8px 17px 9px 35px;border-width:0 1px 1px;border-style:solid;border-color:#ccc;text-decoration:none;}'
				+ '\nul.vmenu a:hover{padding:9px 17px 8px 35px;background-color:#efefef;}'
				+ '\n\nul.hmenu{float:left;width:auto;margin:0;margin-bottom:18px;border-left:1px solid #ccc;}'
				+ '\nul.hmenu li{display:block;float:left;}'
				+ '\nul.hmenu a{display:block;float:left;width:auto;padding:8px 17px 9px 17px;border-width:1px 1px 1px 0;border-style:solid;border-color:#ccc;text-decoration:none;}'
				+ '\nul.hmenu a:hover{padding:9px 17px 8px 17px;background-color:#efefef;}'
				+ '\nul.vmenu ul{width:270px;margin:0;border-top:none;}'
				+ '\nul.vmenu ul a{display:block;width:198px;padding:8px 17px 9px 53px;border-width:0 1px 1px;border-style:solid;border-color:#ccc;text-decoration:none;}'
				+ '\nul.vmenu ul a:hover{padding:9px 17px 8px 53px;background-color:#efefef;}'
				+ '\nul.hmenu-l b, ul.hmenu-r b{display:block;float:left;width:auto;padding:9px 17px 8px 17px;border-width:1px 1px 1px 0;border-style:solid;border-color:#ccc;font-weight:normal;text-decoration:none;background-color:#efefef;}'
				+ '\n\n.ui-timepicker-div .ui-widget-header{ margin-bottom: 8px; }'
				+ '\n.ui-timepicker-div dl{ text-align: left; }'
				+ '\n.ui-timepicker-div dl dt{ height: 25px; }'
				+ '\n.ui-timepicker-div dl dd{ margin: -25px 0 10px 65px; }'
				+ '\n.ui-timepicker-div td { font-size: 90%; }';

	//Output string to code textarea.
	document.getElementById('codeoutput').value = sMarkup;

	return;
}

function generateWidgetsJavascriptCode()
{
	var sMarkup = '$(document).ready(function(){'
				+ '\n\n\t//Table striping and highlight.'
				+ '\n\t$(\'table.zebra tr:even\').addClass(\'striped\');'
				+ '\n\t$(\'table.zebra tr\').mouseover(function(){$(this).addClass(\'highlight\');});'
				+ '\n\t$(\'table.zebra tr\').mouseout(function(){$(this).removeClass(\'highlight\');});'
				+ '\n\n\t//Datetime calendar.'
				+ '\n\t$(\'input.datetime\').datetimepicker({'
				+ '\n\t\tnumberOfMonths: 2,'
				+ '\n\t\tshowSecond: false,'
				+ '\n\t\thourMin: 6,'
				+ '\n\t\thourMax: 21,'
				+ '\n\t\tstepHour: 1,'
				+ '\n\t\tstepMinute: 5,'
				+ '\n\t\thourGrid: 2,'
				+ '\n\t\tminuteGrid: 15,'
				+ '\n\t\ttimeFormat: "hh:mm"'
				+ '\n\t});'
				+ '\n});';

	//Output string to code textarea.
	document.getElementById('codeoutput').value = sMarkup;

	return;
}