import { useState } from "react";
//import { delay } from "@/utils/delay";

import {
	validateNumbers,
	validatePlainTextNumber,
	validatePlainText,
	validateDate,
	validatePrice,
	validateName,
	validateAmpleText,
	validateEmail,
} from "@base/validation";
import { TextInput } from "flowbite-react";
import FormLabel from "./FormLabel";

//prettier-ignore
const theme = {
	"base": "flex",
	"addon": "!order-last inline-flex items-center rounded-r-lg border border-l-0  border-gray-500 bg-transparent px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
	"field": {
	  "base": "relative w-full order-1",
	  "icon": {
		"base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
		"svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
	  },
	  "rightIcon": {
		"base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
		"svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
	  },
	  "input": {
		"base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
		"sizes": {
		  "sm": "p-2 sm:text-xs",
		  "md": "p-2.5 text-sm",
		  "lg": "p-4 sm:text-base"
		},
		"colors": {
		  "custom": "border-gray-500 bg-gray-900 text-secondary focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-secondary dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
		  "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-secondary dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
		  "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
		  "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
		  "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
		  "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
		},
		"withRightIcon": {
		  "on": "pr-10",
		  "off": ""
		},
		"withIcon": {
		  "on": "pl-10",
		  "off": ""
		},
		"withAddon": {
		  "on": "rounded-l-lg border-r-0 !order-last",
		  "off": "rounded-lg"
		},
		"withShadow": {
		  "on": "shadow-sm dark:shadow-sm-light",
		  "off": ""
		}
	  }
	}
  }

function InputText({
	value,
	setValue,
	label = null,
	placeholder,
	validation,
	type = "text",
	isChild = false,
	childName = null,
	multiValue = null,
	setMultiValue = null,
	isMultiValue = false,
	multiValueValidation,
	disable = false,
	toolTipData = "",
}) {
	const [error, setError] = useState();
	const [success, setSuccess] = useState(false);
	let validationFuncs = {
		//wallet: validateWalletAddress,
		//multiWallet: validateMultiWalletAddress,
		text: validatePlainText,
		number: validateNumbers,
		alphanumeric: validatePlainTextNumber,
		date: validateDate,
		price: validatePrice,
		name: validateName,
		textAllowEmptyString: validateAmpleText,
		email: validateEmail,
	};

	function validate(newValue, validationValue = validation) {
		let hasError = validationFuncs[validationValue](newValue, true);

		if (hasError.err) {
			setSuccess(false);
			handleError(hasError);
		}
		return hasError.err;
	}

	async function handleError(errorValue) {
		if (error) return;
		setError(errorValue.message);
		//await delay(3000);
		setError(null);
	}

	function selectVal(isChild) {
		return !isChild ? value : value[childName];
	}

	const clearBtn = (
		<div
			onClick={() => {
				let newVal = "";

				if (isChild) {
					newVal = value;
					newVal[childName] = "";
				}
				setValue(newVal);
			}}
			className={`uppercase flex justify-center items-center text-[10px] hover:opacity-50 w-6 h-6 cursor-pointer text-red-400 ${
				selectVal(isChild) == "" && "hidden"
			}`}
		>
			clear
		</div>
	);

	return (
		<div>
			<FormLabel>{label}</FormLabel>
			<div className="flex">
				<div
					className={`input input-bordered flex items-center gap-2 grow ${
						error ? "!border-red-400" : ""
					} ${success && "!border-third"}`}
				>
					<TextInput
						theme={theme}
						color="custom"
						className="w-full"
						addon={value != "" && clearBtn}
						placeholder={placeholder}
						value={!isChild ? value : value[childName]}
						disabled={disable}
						onChange={(e) => {
							let hasError = validate(e.target.value);
							if (hasError) return;
							let newVal = null;
							newVal = e.target.value;

							if (isChild) {
								newVal = value;
								newVal[childName] = e.target.value;
							}

							if (isMultiValue) {
								const error = validationFuncs[multiValueValidation](
									e.target.value
								).err;

								if (!error) {
									const itemExists = multiValue.findIndex(
										(item) => item === e.target.value
									);
									if (itemExists !== -1) {
										handleError({
											message: "That address is already an admin",
										});
										return;
									}

									let valAry = multiValue;
									valAry.push(newVal);
									setMultiValue(valAry);
									setValue("");
									return;
								}
							}

							if (type == "number" && newVal[newVal.length - 1] == ".") {
								newVal = parseFloat(newVal).toFixed(1);
							} else if (type == "number") {
								newVal = parseFloat(newVal);
							}

							setValue(newVal);
						}}
					></TextInput>

					{/*!disable && (
						
					)*/}
				</div>
			</div>

			<div className="label pb-0 pt-1 justify-center">
				<span className="label-text-alt text-red-400 text-[10px] h-2">
					{` ${error ? error : ""}`}
				</span>
			</div>
		</div>
	);
}

export default InputText;
