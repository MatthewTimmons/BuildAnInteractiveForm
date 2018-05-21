// $('#name').focus();
let jobRole, punsTheme, heartTheme;
jobRole = '<input type="text" id="other-title" name="user_other_title" placeholder="Your Job Role">';
punsTheme = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>';
heartTheme = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';

// When user clicks "Other" from the Job Role select menu, a new input text field appears
$('#title').on('change', function() {
	var selected_option = $('#title option:selected');
	if (selected_option.val() === 'other') {
		$('fieldset:first').append(jobRole);
	}
});

// When user clicks on shirt design, remove all non-applicable colors
$('#design').on('change', function() {
	var selected_option = $('#design option:selected');
	if (selected_option.val() === 'js puns') {
		$('#color').html(punsTheme);
	} else if (selected_option.val() === 'heart js') {
		$('#color').html(heartTheme);
	} else {
		$('#color').html(punsTheme + heartTheme);
	}
});

// Disable conflicting scheduled events and add running total
$('.activities').on('change', function() {
	let total, totalHTML, jsFrameworks, jsLibraries, express, node;
	total = 0;
	jsFrameworks = $('.activities [name="js-frameworks"]');
	jsLibraries = $('.activities [name="js-libs"]');
	express = $('.activities [name="express"]');
	node = $('.activities [name="node"]');

	// if jsFrameworks is checked, disable Express workshop
	if (jsFrameworks.is(':checked')) {
		express.parent().css({"color": "gray"});
		express.attr('disabled', true);
	} else if (!jsFrameworks.is(':checked')) {
		express.parent().css({"color": "black"});
		express.attr('disabled', false);
	}

	// if Express is checked, disable jsFrameworks workshop
	if (express.is(':checked')) {
		jsFrameworks.parent().css({"color": "gray"});
		jsFrameworks.attr('disabled', true);
	} else if (!express.is(':checked')) {
		jsFrameworks.parent().css({"color": "black"});
		jsFrameworks.attr('disabled', false);
	}

	// if jsLibraries is checked, disable Node.js workshop
	if (jsLibraries.is(':checked')) {
		node.parent().css({"color": "gray"});
		node.attr('disabled', true);
	} else if (!jsLibraries.is(':checked')) {
		node.parent().css({"color": "black"});
		node.attr('disabled', false);
	}

	// if Node.js is checked, disable jsLibraries workshop
	if (node.is(':checked')) {
		jsLibraries.parent().css({"color": "gray"});
		jsLibraries.attr('disabled', true);
	} else if (!node.is(':checked')) {
		jsLibraries.parent().css({"color": "black"});
		jsLibraries.attr('disabled', false);
	}

	// Determine the total by iterating over each item and adding the price if the item is checked
	$('.activities label').each(function() {
		let price = $(this).text().slice(-3);
		console.log($(this));
		if ($(this).children().is(':checked')) {
			total += parseInt(price);
			console.log('hello');
		}
	});

	// Add "Total" HTML element if necessary
	totalHTML = `<p>Total: $${total}</p>`;
	if ($('.activities p:last-child').length === 0) {
		$('.activities').append(totalHTML);
	} else {
		$('.activities p:last-child').html(totalHTML);
	}
});


$('#payment').on('start', 'change', function () {
	console.log('beep beep');
	$('fieldset:nth-of-type(4) div').hide();
	if($('#payment [value="credit card"').is(':selected')) {
		$('#credit-card').show();
		$('#credit-card div').show();
	} else if ($('#payment [value="paypal"').is(':selected')) {
		$('fieldset:nth-of-type(4) div:nth-of-type(2)').show();
	} else if ($('#payment [value="bitcoin"').is(':selected')) {
		$('fieldset:nth-of-type(4) div:nth-of-type(3)').show();
	}
});

// Select Credit Card by default and display the proper info
$('fieldset:nth-of-type(4) div').hide();
$('#payment [value="credit card"').attr('selected', true);
$('#credit-card').show();
$('#credit-card div').show();
