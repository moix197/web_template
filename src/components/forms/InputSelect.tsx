import { Select } from "flowbite-react";
import FormLabel from "./FormLabel";
import { useEffect, useState } from "react";
import useDashboardData from "../../Hooks/useDashboardData";

//prettier-ignore
const theme = {
	"base": "flex",
	"addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
	"field": {
	  "select": {
		"colors": {
		  "custom": "border-gray-500 bg-gray-900 text-secondary focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-secondary dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
		  "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-secondary dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
		  "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
		  "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
		  "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
		  "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
		},
		
	  }
	}
  }
function InputSelect({
	value,
	setValue,
	label = "",
	placeholder,
	children = null,
	disable = false,
	multiValue = null,
	setMultiValue = null,
	isMultiValue = false,
	toolTipData = "",
	options = [],
	keyToUseAsValue = "_id",
}) {
	const [optionsToUse, setOptionsToUse] = useState([]);

	useEffect(() => {
		if (Object.prototype.toString.call(options) === "[object Array]") {
			setOptionsToUse(options);
		}
	}, []);

	useDashboardData(options, setOptionsToUse);

	return (
		<div className="mb-1">
			{label && (
				<div>
					<FormLabel>{label}</FormLabel>
				</div>
			)}
			<div className="flex">
				<Select
					className="w-full text-secondary uppercase "
					theme={theme}
					value={value}
					color="custom"
					onChange={(e) => {
						if (isMultiValue) {
							const itemExists = multiValue.findIndex(
								(item) => item === e.target.value
							);
							if (itemExists !== -1) {
								//handleError({ message: "That address is already an admin" });
								return;
							}

							console.log("the valueee", e.target.value);
							let valAry = multiValue;
							valAry.push(e.target.value);
							setMultiValue(valAry);
							return;
						}

						setValue(e.target.value);
					}}
					disabled={disable}
				>
					<option value="default" className="!bg-gray-900" disabled>
						{placeholder}
					</option>

					{optionsToUse &&
						optionsToUse.map((item, index) => {
							return (
								<option
									value={
										item[keyToUseAsValue] ? item[keyToUseAsValue] : item.value
									}
									className="!bg-gray-900"
									key={`${item._id}_${index}`}
								>
									{item.name}
								</option>
							);
						})}
				</Select>
			</div>
		</div>
	);
}

export default InputSelect;
