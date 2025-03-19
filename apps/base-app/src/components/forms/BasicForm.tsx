import { useEffect, useState } from "react";
import { delay } from "@/utils/delay";
import { TitleXl } from "../Titles/TitlesDashboard";
import InputText from "./InputText";
import { BasicButton } from "../buttons/Basic";
import RadioButton from "./RadioButon";
import Toggle from "./Toggle";
import { bulkValidate } from "@/utils/validation/formSubmission";
import InputMultiValue from "./InputMultiValue";
import InputSelect from "./InputSelect";
import InputTextArea from "./InputTextArea";
import SingleInputParent from "./SingleInputParent";
import dynamic from "next/dynamic";
import { SolidButton } from "../buttons/Buttons";
import { useNotifications } from "@base/notifications";
import { ModalFileExplorer } from "@base/file_explorer";

const TextEditor = dynamic(() => import("./TextEditor"), {
	ssr: false, // This will disable server-side rendering for this component
});

/*const ModalFileExplorer = dynamic(
	() => import("@base/file_explorer"),
	{
		ssr: false, // This will disable server-side rendering for this component
	}
);*/

function BasicForm({
	formValues,
	title = null,
	btnText = "",
	existingValues = {},
	cb,
	disabled = false,
	importantText = "",
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorsAry, setErrorsAry] = useState([]);
	const [validationValues, setValidationValues] = useState({});

	const { showNotification } = useNotifications();

	// Dynamically create state variables and setters

	const [state, setState] = useState(() => {
		const initialState = {};
		for (const item of formValues) {
			initialState[item?.name] = item.defaultValue ? item.defaultValue : "";
		}
		return initialState;
	});

	// Dynamically generate setter functions
	const setters = {};

	for (const item of formValues) {
		setters[item.name] = (value) =>
			setState((prevState) => ({ ...prevState, [item?.name]: value }));
	}

	useEffect(() => {
		let newTempObj = { ...validationValues };
		for (const item of formValues) {
			if (item.defaultValue) {
				setters[item.name](item.defaultValue);
			}
			newTempObj[item.name] = item.validation;
		}
		setValidationValues({ ...newTempObj });
	}, [formValues]);

	useEffect(() => {
		for (let key in existingValues) {
			if (setters[key]) {
				setters[key](existingValues[key]);
			}
		}
	}, [existingValues]);

	async function checkValidation(errResult) {
		if (errResult && errResult.length == 0 && cb) {
			let response = await cb(state);
			return response;
		}

		let messageToShow = [];

		for (const item of errResult) {
			if (errResult[0].err) {
				messageToShow.push(`- ${item.name} ${item.result[0].message}\n`);
			}
		}

		showNotification({
			err: true,
			message: messageToShow.join(""),
			title: "Validation Error",
		});
	}

	async function launchAction() {
		if (isLoading) return;
		setIsLoading(true);
		let errResult = bulkValidate(state, validationValues);
		setErrorsAry(errResult);
		await delay(1000);
		await checkValidation(errResult);
		setIsLoading(false);
	}

	return (
		<div>
			<div className="mb-6 ">
				<TitleXl>{title}</TitleXl>
			</div>
			{importantText && (
				<div className="text-red-400 uppercase tracking-wider text-xs flex justify-center">
					<div className="w-12/12 md:w-6/12">
						<div>{importantText}</div>
					</div>
				</div>
			)}
			<div className="flex flex-wrap gap-4 items-center justify-center">
				{formValues.map((item) => {
					if (item.type == "text" || item.type == "number") {
						return (
							<SingleInputParent key={item.name}>
								<InputText
									value={state[item.name]}
									setValue={setters[item.name]}
									label={item.label}
									placeholder={item.placeholder}
									validation={item.validation}
									type={item.type}
									disable={disabled}
								></InputText>
							</SingleInputParent>
						);
					} else if (item.type == "radio") {
						return (
							<SingleInputParent key={item.name}>
								<RadioButton
									value={state[item.name]}
									setValue={setters[item.name]}
									label={item.label}
									options={item.options}
									children={item.children}
									disabled={disabled}
								></RadioButton>
							</SingleInputParent>
						);
					} else if (item.type == "toggle") {
						return (
							<SingleInputParent key={item.name}>
								<Toggle
									value={state[item.name]}
									setValue={setters[item.name]}
									label={item.label}
									children={item.children}
									disable={disabled}
								></Toggle>
							</SingleInputParent>
						);
					} else if (item.type == "select") {
						return (
							<SingleInputParent key={item.name}>
								<InputSelect
									value={state[item.name]}
									setValue={setters[item.name]}
									label={item.label}
									placeholder={item.placeholder}
									options={item.options}
									disable={disabled}
								></InputSelect>
							</SingleInputParent>
						);
					} else if (item.type == "multiValue") {
						return (
							<SingleInputParent className="w-full" key={item.name}>
								<InputMultiValue
									value={state[item.name]}
									setValue={setters[item.name]}
									label={item.label}
									placeholder={item.placeholder}
									validation={item.validation}
									options={item.options}
									getOptions={item.getOptions}
									multiValueValidation={item.multiValueValidation}
								></InputMultiValue>
							</SingleInputParent>
						);
					} else if (item.type == "textarea") {
						return (
							<SingleInputParent className="!w-full" key={item.name}>
								<InputTextArea
									value={state[item.name]}
									setValue={setters[item.name]}
									label={item.label}
									placeholder={item.placeholder}
								></InputTextArea>
							</SingleInputParent>
						);
					} else if (item.type == "texteditor") {
						return (
							<SingleInputParent key={item.name}>
								<TextEditor
									value={state[item.name]}
									setValue={setters[item.name]}
									label={item.label}
									imageCategory={item.imageCategory}
									useItemIdAsImageParent={item.useItemIdAsImageParent}
								></TextEditor>
							</SingleInputParent>
						);
					} else if (item.type == "image") {
						return (
							<SingleInputParent key={item.name}>
								<ModalFileExplorer
									value={state[item.name]}
									setValue={setters[item.name]}
									showImageSet
									imageCategory={item.imageCategory}
								></ModalFileExplorer>
							</SingleInputParent>
						);
					}
				})}
			</div>
			{!disabled && (
				<SolidButton
					className="mt-6"
					onClick={() => {
						launchAction();
					}}
					isLoading={isLoading}
				>
					{btnText}
				</SolidButton>
			)}
		</div>
	);
}

export default BasicForm;
