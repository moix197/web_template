import {
	//validateWalletAddress,
	//validateMultiWalletAddress,
	validateNumbers,
	validatePlainTextNumber,
	validatePlainText,
	validateAmpleText,
	validateDate,
	validateDateIsCompleted,
	validateEmptyString,
	validatePrice,
	validateName,
	validateRelativeURL,
	validateEmail,
} from "./formTyping";

import { checkDateIsAfterToday } from "./checkTimePassed";

interface ValidationResponse {
	err: boolean;
	message?: string;
}

const validationsPerField: any = {
	name: [validateEmptyString, validateName],
	logo: [validateEmptyString, validateAmpleText],
	accountName: [validateEmptyString, validateAmpleText],
	totalAmount: [validateEmptyString, validatePrice],
	amount: [validateEmptyString, validatePrice],
	integer: [validateEmptyString, validateNumbers],
	text: [validateEmptyString, validateAmpleText],
	textAllowEmptyString: [validateAmpleText],
	parts: [validateEmptyString, validateNumbers],
	number: [validateEmptyString, validateNumbers],
	letters: [validateEmptyString, validatePlainText],
	relativeURL: [validateRelativeURL],
	email: [validateEmptyString, validateEmail],
	launch: [
		validateEmptyString,
		validateDateIsCompleted,
		validateDate,
		validateDateIsAfterToday,
	],
	end: [
		validateEmptyString,
		validateDateIsCompleted,
		validateDate,
		validateEndDate,
		validateDateIsAfterToday,
	],
	paymentMethods: [],
	title: [validateEmptyString],
	//admins: [validateMultiWalletAddress],
	//walletsAry: [validateMultiWalletAddress],
	redeem: [validateRedemType],
	price: [validateEmptyString, validatePrice],
	discount: [validateEmptyString, validatePrice],
	target: [validateTargetData],
	tiers: [validateEmptyString],
	vault: [validateEmptyString],
	type: [validateEmptyString],
	vesting: [validateVesting],
	content: [validateEmptyString],
	//walletAddress: [validateEmptyString, validateWalletAddress],
	//tokenMintAddress: [validateEmptyString, validateWalletAddress],
	initialAmount: [validateEmptyString, validatePrice],
	teamId: [validateEmptyString],
	vaultId: [validateEmptyString],
	objectId: [validateEmptyString, checkObjectId],
	availableAmount: [validateEmptyString, validateNumbers],
	toBuyAmount: [validateEmptyString, validatePrice],
	lockedAmount: [validateEmptyString, validatePrice],
	//participants: [validateEmptyString, validateMultiWalletAddress],
	status: [validateEmptyString, validateUserStatus],
};

function bulkValidate(itemsObj: any, validationValues: any) {
	let errorsNow = [];
	for (let key in itemsObj) {
		let result = validate(key, itemsObj[key], itemsObj, validationValues);
		if (result.err) {
			errorsNow.push(result);
		}
	}

	return errorsNow;
}

function validate(key: any, value: any, items: any, validationValues: any) {
	let obj: { err: boolean; name: string; result: ValidationResponse[] } = {
		err: false,
		name: key,
		result: [],
	};

	//let validResult = validationsPerField[key](value);
	for (const itemFunc of validationsPerField[validationValues[key]]) {
		if (!itemFunc) continue;
		let response: any = itemFunc(value, items);
		if (response?.err) {
			obj.err = true;
			obj.result.push(response);
		}
	}

	return obj;
}

function validateSaleType(value: any) {
	let error = true;
	let airdropValues = ["regular", "presale"];

	if (airdropValues.includes(value.value)) {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check the sale type",
	};
}

function validatePriceData(value: any) {
	let error = true;

	if (value.value == "market") {
		if (
			validateEmptyString(value.extra).err == false &&
			validatePrice(value.extra).err == false
		) {
			return {
				err: false,
			};
		}
	} else if (value.value != "fixed") {
		return {
			err: true,
			message: 'The price value should be "market" or "fixed',
		};
	}

	if (
		validateEmptyString(value.amount).err == false &&
		validatePrice(value.amount).err == false
	) {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check your price strategy",
	};
}

function validateTargetData(value: any) {
	let error = true;

	if (value.value == "private" || value.value == "open") {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check your sale target",
	};
}

function validateRedemType(value: any) {
	let error = true;
	let airdropValues = ["airdrop", "claim", "claimableAirdrop"];

	if (airdropValues.includes(value.value)) {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check how your user get the funds",
	};
}

function validateVesting(value: any, items: any) {
	if (value.value == false) {
		return {
			err: false,
		};
	}

	if (
		validateEmptyString(value.parts).err ||
		validateNumbers(value.parts).err
	) {
		return {
			err: true,
			message: "Please check the vesting parts",
		};
	}

	if (
		validateEmptyString(value.interval).err ||
		validateNumbers(value.interval).err
	) {
		return {
			err: true,
			message: "Please check the vesting interval",
		};
	}

	if (
		validateEmptyString(value.nextDate).err ||
		validateDate(value.nextDate).err ||
		validateDateIsCompleted(value.nextDate).err ||
		validateDateIsAfterToday(value.nextDate).err
	) {
		return {
			err: true,
			message: "Please check the vesting date",
		};
	}

	return {
		err: false,
		message: "Please check your vesting strategy",
	};
}

function validateEndDate(value: any, items: any) {
	/*let result = checkSecondDateComesAfter(items.launch, value);

	if (!result) {
		return {
			err: true,
			message:
				"The end date cannot be closer than the Launch date, please update and try again",
		};
	}*/

	return {
		err: true,
	};
}

function validateDateIsAfterToday(value: any) {
	let result = checkDateIsAfterToday(value);
	if (result) {
		return {
			err: false,
		};
	}

	return {
		err: true,
		message:
			"the date cannot be set prior to today, please update and try again",
	};
}

function validateUserStatus(value: any) {
	let statusValues = ["active", "inactive", "hold", "revision"];
	if (statusValues.indexOf(value) != -1) {
		return {
			err: false,
		};
	}

	return {
		err: true,
		message: "Invalid status value, please check and try again",
	};
}

function checkObjectId(value: any) {
	const objectIdPattern = /^[0-9a-fA-F]{24}$/;

	if (!objectIdPattern.test(value)) {
		return {
			err: true,
			message: "Invalid item Id",
		};
	}

	return {
		err: false,
	};
}

export { validate, bulkValidate, validationsPerField };
