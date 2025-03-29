import { Label, Textarea } from "flowbite-react";
import { useState } from "react";
import FormLabel from "./FormLabel";

//prettier-ignore
const theme = {
	"base": "block w-full rounded-lg border text-sm disabled:cursor-not-allowed disabled:opacity-50",
	"colors": {
	  "custom": "border-gray-500 !bg-primary text-secondary focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-secondary dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
	  "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-secondary dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
	  "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
	  "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
	  "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
	  "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
	},
	"withShadow": {
	  "on": "shadow-sm dark:shadow-sm-light",
	  "off": ""
	}
  }
function InputTextArea({ value, setValue, label, placeholder }) {
	const [textValue, setTextValue] = useState("");

	return (
		<div>
			<FormLabel>{label}</FormLabel>
			<div className="flex">
				<Textarea
					theme={theme}
					color="custom"
					onChange={(e) => {
						/*let result = e.target.value
						.split("\n")
						.filter((item) => item !== "");
					*/ setValue(e.target.value);
					}}
					value={value}
					placeholder={placeholder}
				></Textarea>
			</div>
		</div>
	);
}

export default InputTextArea;
