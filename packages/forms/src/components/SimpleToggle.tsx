import { useEffect, useState } from "react";
import { LoadingCont } from "@base/base-ui";
import { TrueFalseWithIcons } from "@base/base-ui";
import { ToggleSwitch } from "flowbite-react";

//prettier-ignore
const theme = {
	"root": {
	  "base": "group flex rounded-lg focus:outline-none",
	  "active": {
		"on": "cursor-pointer",
		"off": "cursor-not-allowed opacity-50"
	  },
	  "label": "ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300"
	},
	"toggle": {
	  "base": "relative rounded-full border after:absolute after:rounded-full after:bg-secondary after:transition-all group-focus:ring-4 group-focus:ring-cyan-500/25",
	  "checked": {
		"on": "after:translate-x-full  after:border-white rtl:after:-translate-x-full",
		"off": "border-gray-600 bg-gray-600 dark:border-gray-600 dark:bg-gray-700",
		"color": {
		  "third": "border-third bg-third",
		  "blue": "border-cyan-700 bg-cyan-700",
		  "dark": "bg-dark-700 border-dark-900",
		  "failure": "border-red-900 bg-red-700",
		  "gray": "border-gray-600 bg-gray-500",
		  "green": "border-green-700 bg-green-600",
		  "light": "bg-light-700 border-light-900",
		  "red": "border-red-900 bg-red-700",
		  "purple": "border-purple-900 bg-purple-700",
		  "success": "border-green-500 bg-green-500",
		  "yellow": "border-yellow-400 bg-yellow-400",
		  "warning": "border-yellow-600 bg-yellow-600",
		  "cyan": "border-cyan-500 bg-cyan-500",
		  "lime": "border-lime-400 bg-lime-400",
		  "indigo": "border-indigo-400 bg-indigo-400",
		  "teal": "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4",
		  "info": "border-cyan-600 bg-cyan-600",
		  "pink": "border-pink-600 bg-pink-600"
		}
	  },
	  "sizes": {
		"sm": "h-5 w-9 min-w-9 after:left-px after:top-px after:h-4 after:w-4 rtl:after:right-px",
		"md": "h-6 w-11 min-w-11 after:left-px after:top-px after:h-5 after:w-5 rtl:after:right-px",
		"lg": "h-7 w-14 min-w-14 after:left-1 after:top-0.5 after:h-6 after:w-6 rtl:after:right-1"
	  }
	}
  }
function SimpleToggle({
	label = ["active", "inactive"],
	value = false,
	name = "",
	keyToToggle,
	valueToUpdate,
	cb = null,
}) {
	const [status, setStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setStatus(value);
	}, [value]);

	async function fireToggleAction(givenValue: boolean) {
		setIsLoading(true);
		if (isLoading) return;
		let tempObj = {};
		await executeCb(givenValue);
		setStatus(givenValue);
		setIsLoading(false);
	}

	async function executeCb(val) {
		if (!keyToToggle) {
			cb && (await cb(name, val));
		} else {
			let newValue = {};
			newValue[keyToToggle] = val;
			cb && (await cb(newValue));
		}
	}

	return (
		<div className="flex justify-between w-full">
			<div className="flex">
				<div className="mr-2">
					<TrueFalseWithIcons value={status}></TrueFalseWithIcons>
				</div>
				{name ? (
					<div className="mr-4 uppercase font-bold">
						<div>{name}</div>
					</div>
				) : (
					<div className="uppercase font-bold">
						{status ? label[0] : label[1]}
					</div>
				)}
			</div>
			<div className="flex">
				<div className="mr-2">
					<LoadingCont isLoading={isLoading} size={"xs"}></LoadingCont>
				</div>
				<ToggleSwitch
					theme={theme}
					checked={status}
					disabled={isLoading}
					color="third"
					onChange={(e) => {
						fireToggleAction(e);
					}}
				></ToggleSwitch>
			</div>
		</div>
	);
}

export { SimpleToggle };
