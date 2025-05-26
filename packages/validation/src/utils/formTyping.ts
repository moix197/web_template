//import { PublicKey } from "@solana/web3.js";

function validatePlainText(value: string) {
	// Regular expression to match only letters
	const textRegex = /^[a-zA-Z]+$/;
	let isValid = textRegex.test(value);
	return { err: !isValid, message: isValid ? "" : "only letters are allowed" };
}

function validateAmpleText(value: string) {
	// Regular expression to match letters, numbers, and "-_.,@"
	//also allow empty strings when the value is empty

	if (value == "") {
		return {
			err: false,
		};
	}

	const textRegex = /^[a-zA-Z0-9-_.,/@\s]+$/;
	let isValid = textRegex.test(value);
	return {
		err: !isValid,
		message: isValid ? "" : "only letters, numbers, and -_.,@ are allowed",
	};
}

function validateNumbers(value: string) {
	// Regular expression to match only numbers
	const numbersRegex = /^[0-9]*$/;
	let isValid = numbersRegex.test(value);
	return { err: !isValid, message: isValid ? "" : "only numbers are allowed" };
}

function validatePrice(value: string) {
	const numbersRegex = /^[0-9.]*$/;
	let isValid = numbersRegex.test(value);
	return {
		err: !isValid,
		message: isValid
			? ""
			: "Price format is incorrect, please only use numbers and .",
	};
}

function validateName(value: string) {
	const alphaNumericRegex = /^[a-zA-Z0-9\s]*$/;
	let isValid = alphaNumericRegex.test(value);
	return {
		err: !isValid,
		message: isValid
			? ""
			: "only numbers, letters and blank spaces are allowed",
	};
}

function validatePlainTextNumber(value: string) {
	// Regular expression to match only letters and numbers
	const alphaNumericRegex = /^[a-zA-Z0-9]*$/;
	let isValid = alphaNumericRegex.test(value);
	return {
		err: !isValid,
		message: isValid ? "" : "only letters or numbers are allowed",
	};
}

//add a function to validate URLs
function validateURL(value: string) {
	const urlRegex = /^(http|https):\/\/[^ "]+$/;
	let isValid = urlRegex.test(value);
	return {
		err: !isValid,
		message: isValid ? "" : "please enter a valid URL",
	};
}

//add a function to validate emails
function validateEmail(value: string) {
	//	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;

	let isValid = emailRegex.test(value);
	return {
		err: !isValid,
		message: isValid ? "" : "please enter a valid email",
	};
}

function validateRelativeURL(value: string) {
	const urlRegex = /^(\/?[^ "]+)$/;
	let isValid = urlRegex.test(value);

	return {
		err: !isValid,
		message: isValid ? "" : "Please enter a valid relative URL",
	};
}

/*function validateWalletAddress(value, isTyping = false) {
	if (isTyping && value == "") {
		return {
			err: false,
		};
	}

	let address;

	try {
		address = new PublicKey(value);
	} catch (error) {
		return {
			err: true,
			message: "Please enter a valid wallet address",
		};
	}

	if (PublicKey.isOnCurve(address)) {
		return {
			err: false,
		};
	}

	return {
		err: true,
		message: "Please check the address",
	};
}

function validateMultiWalletAddress(ary) {
	if (ary.length == 0) {
		return {
			err: true,
			message: "field cannot be empty",
		};
	}

	for (const item of ary) {
		let result = validateWalletAddress(item);
		if (result.err) {
			return {
				err: true,
				message: `${item} wallet address not valid`,
			};
		}
	}

	return {
		err: false,
	};
}*/

function validateDateIsCompleted(value: string) {
	let isValid = value.length == 8;
	return {
		err: !isValid,
		message: isValid
			? ""
			: "please introduce a date with the format DD/MM/YYYY",
	};
}

function validateDate(value: string) {
	// Define the regular expressions for each part of the date
	const monthRegex = /^([0-1]|1[0-2]|0[1-9]|)\/?$/; // Allowing leading zeros but not only 0
	const dayRegex = /^([0-3]|3[0-1]|2[0-9]|1[0-9]|0[1-9]|)$/; // Allowing leading zeros but not only 0
	const yearRegex = /^(\d{0}|[2]|2[4-9])$/;
	let parts = ["", "", ""];

	let isValid;
	// Split the input value into parts based on '/'
	parts = value.split("/");

	if (
		parts.length >= 2 &&
		parts[parts.length - 1] == "" &&
		(parts[parts.length - 2] == "" || parts[parts.length - 2].length == 1)
	) {
		return {
			err: !isValid,
			message: "please introduce a date with the format MM/DD/YY",
		};
	}

	// Check each part of the date
	if (parts.length === 1 || (parts.length === 2 && parts[1] == "")) {
		// When only month is entered (no '/'), allow up to 2 digits and validate range
		let newPart = parts[0]; //.length == 2 ? parts[0] + "/" : parts[0];
		/*if (value[3] == "/") {
			newPart = parts[0] + "/";
		}*/
		isValid = monthRegex.test(newPart) && parts[0].length <= 2;

		if (!isValid) {
			return {
				err: !isValid,
				message: "please introduce a date with the format MM/DD/YY",
			};
		}
	}

	if (parts.length === 2 && parts[1] != "") {
		// When both month and day are entered (with '/'), validate month, day, and '/'
		isValid = monthRegex.test(parts[0]) && dayRegex.test(parts[1]);
	} else if (parts.length === 3) {
		// When month, day, and year are entered (with '/'), validate all parts
		isValid =
			monthRegex.test(parts[0]) &&
			dayRegex.test(parts[1]) &&
			yearRegex.test(parts[2]);
	}

	return {
		err: !isValid,
		message: isValid ? "" : "please introduce a date with the format MM/DD/YY",
	};
}

function validateEmptyString(value: string) {
	let error = false;

	//I need to validate that the string is not empty but allow values like 0

	if (value.length === 0) {
		return {
			err: true,
			message: "value is empty",
		};
	}

	return {
		err: error,
	};
}

export {
	validatePlainText,
	validateAmpleText,
	validateNumbers,
	validatePlainTextNumber,
	//validateWalletAddress,
	//validateMultiWalletAddress,
	validateDate,
	validateDateIsCompleted,
	validateEmptyString,
	validatePrice,
	validateName,
	validateURL,
	validateEmail,
	validateRelativeURL,
};
