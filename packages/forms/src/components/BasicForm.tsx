import { useEffect, useState, useMemo } from "react";
//import { delay } from "@/utils/delay";
import { TitleXl } from "@moix197/base-ui";
import InputText from "./InputText";
import RadioButton from "./RadioButon";
import Toggle from "./Toggle";
import { bulkValidate } from "@moix197/validation";
import InputMultiValue from "./InputMultiValue";
import InputSelect from "./InputSelect";
import InputTextArea from "./InputTextArea";
import SingleInputParent from "./SingleInputParent";
import FormLabel from "./FormLabel";
import dynamic from "next/dynamic";
import { useNotifications } from "@moix197/notifications";
import { SolidButton } from "@moix197/base-ui";
import React from "react";

const TextEditor = dynamic(
	() => import("@moix197/text-editor").then((mod) => mod.TextEditor),
	{ ssr: false, loading: () => <div>Loading...</div> }
);

const ModalFileExplorer = dynamic(
	() =>
		import("@moix197/file_explorer/client").then(
			(mod) => mod.ModalFileExplorer
		),
	{ ssr: false }
);

interface BasicFormProps {
	formValues: any[];
	title?: string;
	btnText?: string;
	existingValues?: any;
	cb?: any;
	disabled?: boolean;
	importantText?: string;
}

function BasicForm({
	formValues,
	title = "",
	btnText = "",
	existingValues = {},
	cb,
	disabled = false,
	importantText = "",
}: BasicFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorsAry, setErrorsAry] = useState([]);
	const [validationValues, setValidationValues] = useState({});
	const [formFields, setFormFields] = useState(formValues || []);
	const { showNotification } = useNotifications();

	// Move setters into useMemo
	const setters = useMemo(() => {
		const settersObj: any = {};
		formFields.forEach((item) => {
			settersObj[item.name] = (value: any) =>
				setState((prevState: any) => ({ ...prevState, [item.name]: value }));
		});
		return settersObj;
	}, [formFields]);

	const [state, setState] = useState(() => {
		const initialState: any = {};
		formFields.forEach((item) => {
			initialState[item?.name] = item.defaultValue ? item.defaultValue : "";
		});
		return initialState;
	});

	useEffect(() => {
		setFormFields(formValues || []);
	}, [formValues]);

	useEffect(() => {
		let newTempObj: any = { ...validationValues };
		formFields.forEach((item) => {
			if (item.defaultValue) {
				setters[item.name](item.defaultValue);
			}
			newTempObj[item.name] = item.validation;
		});
		setValidationValues(newTempObj);
	}, [formFields, setters]);

	useEffect(() => {
		for (let key in existingValues) {
			if (setters[key]) {
				setters[key](existingValues[key]);
			}
		}
	}, [existingValues]);

	async function checkValidation(errResult: any) {
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
		let errResult: any = bulkValidate(state, validationValues);
		setErrorsAry(errResult);
		////await delay(1000);
		await checkValidation(errResult);
		setIsLoading(false);
	}

	return (
		<div>
			{title && (
				<div className="mb-6 ">
					<TitleXl>{title}</TitleXl>
				</div>
			)}
			{importantText && (
				<div className="text-red-400 uppercase tracking-wider text-xs flex justify-center">
					<div className="w-12/12 md:w-6/12">
						<div>{importantText}</div>
					</div>
				</div>
			)}
			<div className="flex flex-wrap gap-4 items-center justify-center">
				{formFields.map((item) => {
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
								<FormLabel>{item.label}</FormLabel>
								<TextEditor
									value={state[item.name]}
									setValue={setters[item.name]}
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
									isOpenModal={item.isOpenModal}
									useItemIdAsImageParent={item.useItemIdAsImageParent}
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

export { BasicForm };
