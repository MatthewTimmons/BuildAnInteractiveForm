// Upon loading page, set focus to name field and hide fields
$('#name').focus();
$('#other-title').hide();
$('#colors-js-puns').hide();

// Initialize variables that will be used later
let punsTheme, heartTheme;
punsTheme = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>';
heartTheme = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';


// Create all functions for the app
	function validateName() {
		let $name = $('#name').val() 
		if ($name === '') {
			return 'Name must be entered';
		} else {
			return 0;
		}
	}

	function validateMail() {
		let $mail = $('#mail').val();
		let indexOfAtSymbol = $mail.indexOf('@');
		let errorMessages = [];
		if ($mail === '') {
			errorMessages.push('Nothing entered for email address');
		} else {
			if (indexOfAtSymbol === $mail.length -1) {
				errorMessages.push('Email must contain domain. Ex: yahoo.com, gmail.com');
			} 
			if (indexOfAtSymbol === 0) {
				errorMessages.push('First character cannot be @');
			} 
			if (indexOfAtSymbol === -1) {
				errorMessages.push('No @ detected');
			} 
			if ($mail.slice(($mail.length - 4), $mail.length) !== '.com' && $mail.slice(($mail.length - 4), $mail.length) !== '.net') {
				errorMessages.push('Email address must end in .com or .net');
			}	
		}
		return errorMessages;
	}

	// Create function that generates border around fields that need to be fixed
	function setAlert(input) {
		input.css('border', 'solid 2px red');
		input.css('border-radius', '5px');
		input.css('display', 'block');
	}

// When user clicks "Other" from the Job Role select menu, a new input text field appears
$('#title').on('change', function() {
	var selected_option = $('#title option:selected');
	if (selected_option.val() === 'other') {
		$('#other-title').show();
	}
});

// When user clicks on shirt design, remove all non-applicable colors
$('#design').on('change', function() {
	var selected_option = $('#design option:selected');
	$('#design option:contains("Select Theme")').remove();
	$('#colors-js-puns').show();
	if (selected_option.val() === 'js puns') {
		$('#color').html(punsTheme);
	} else if (selected_option.val() === 'heart js') {
		$('#color').html(heartTheme);
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
		if ($(this).children().is(':checked')) {
			total += parseInt(price);
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

// User should not be able to select the "Select Payment Method" option
$('#payment [value="select_method"]').remove();

// Only display appropriate div according to payment method
$('#payment').on('change', function () {
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

// Generate and display real-time error messages

	// Real-time messages for Name
	$('<p style="color:red" id="nameErrors" hidden>Error messages:</p>').insertAfter('#name');
	$('#name').on('click keyup', () => {
		let errorMessages = [];
		if (validateName() !== 0) {
			errorMessages.push(validateName);
			$('#nameErrors').html('Error messages: ');
			$('#nameErrors').append(errorMessages);
			$('#nameErrors').css('color', 'red');
			$('#nameErrors').css('background-color', 'white');
			$('#nameErrors').css('border-radius', '2px');
			$('#nameErrors').css('padding', '5px');
		} else {
			$('#nameErrors').html('Name field is valid');
			$('#nameErrors').css('color', 'green');
		}
		$('#nameErrors').show();
	});
	$('#name').on('blur', () => {
		$('#nameErrors').hide();
	});

	// Real-time messages for Email
	$('<p style="color:red" id="mailErrors" hidden>Error messages:</p>').insertAfter('#mail');
	$('#mail').on('focus click keyup', () => {
		let errorMessages = [];
		errorMessages = validateMail();
		console.log(errorMessages);
		if (errorMessages.length !== 0) {
			$('#mailErrors').html('Error messages: ');
			for (let i=0; i<errorMessages.length; i++) {
				$('#mailErrors').append('<br>' + errorMessages[i]);
			}
			$('#mailErrors').css('color', 'red');
			$('#mailErrors').css('background-color', 'white');
			$('#mailErrors').css('border-radius', '2px');
			$('#mailErrors').css('padding', '5px');
		} else {
			console.log('success');
			$('#mailErrors').html('Mail field is valid');
			$('#mailErrors').css('color', 'green');
		}
		$('#mailErrors').show();
	});
	$('#mail').on('blur', () => {
		$('#mailErrors').hide();
	});

// Prevent default if form is not filled out and give user error message describing why
$('button').on('click', (e) => {
	// Clear all possible red borders
	$('*').css('border', 'none');

	// Validate name field
	let $name = $('#name').val() 
	if ($name === '') {
		e.preventDefault();
		setAlert($('#name'));
		alert('Name must be entered');
		$('#name').focus();
	} 

	// Validate email field
	let $mail = $('#mail').val();
	let indexOfAtSymbol = $mail.indexOf('@');

	if ($mail === '') {
		e.preventDefault();
		setAlert($('#mail'));
		alert('Nothing entered for email address');
		$('#mail').focus();
	} else {
		if (indexOfAtSymbol === $mail.length -1) {
			e.preventDefault();
			setAlert($('#mail'));
			alert('email must contain domain. ex: yahoo.com, gmail.com');
			$('#mail').focus();
		} 
		if (indexOfAtSymbol === 0) {
			e.preventDefault();
			setAlert($('#mail'));
			alert('first character cannot be @');
		} 
		if (indexOfAtSymbol === -1) {
			e.preventDefault();
			setAlert($('#mail'));
			alert('No @ detected');
		} 
	}

	// Verify at least one activity is checked
	let $isBoxChecked = $('.activities p');

	if ($isBoxChecked.length === 0 || $isBoxChecked.html().indexOf('$') === ($isBoxChecked.html().length - 6)) {
		e.preventDefault();
		setAlert($('.activities'));
		alert('At least one activity must be checked');
	}

	// Validate CC fields if CC is selected
	if ($('#payment [value="credit card"]').is(':selected')) {
		
		// Validate Card Number
		let cardNumber = $('#cc-num').val();
		if (!cardNumber.match(/^\d+$/)) {
			e.preventDefault();
			setAlert($('#cc-num'));
			alert('Card Number must contain only numbers');
		}
		if (cardNumber.length < 13) {
			e.preventDefault();
			setAlert($('#cc-num'));
			alert('Card Number must be at least 13 digits');
		}
		if (cardNumber.length > 16) {
			e.preventDefault();
			setAlert($('#cc-num'));
			alert('Card number must be 16 digits or fewer');
		}

		// Validate Zip Code
		let zipCode = $('#zip').val();
		if (!zipCode.match(/^\d+$/)) {
			e.preventDefault();
			setAlert($('#zip'));
			alert('Zip code must contain only numbers');
		}
		if (zipCode.length != 5) {
			e.preventDefault();
			setAlert($('#zip'));
			alert('Zip code must be exactly 5 digits');
		}

		// Validate CVV
		let cvv = $('#cvv').val();
		if (!cvv.match(/^\d+$/)) {
			e.preventDefault();
			setAlert($('#cvv'));
			alert('CVV must contain only numbers');
		}
		if (cvv.length != 3) {
			e.preventDefault();
			setAlert($('#cvv'));
			alert('CVV must be exactly 3 digits');
		}	
	}
});