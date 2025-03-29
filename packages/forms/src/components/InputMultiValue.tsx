import { useEffect, useState } from "react";
import InputText from "./InputText";
import { IoCloseCircle } from "react-icons/io5";
import InputSelect from "./InputSelect";
import FormLabel from "./FormLabel";

function InputMultiValue({
	value,
	setValue,
	label,
	placeholder,
	validation,
	options = [],
	getOptions = "",
	multiValueValidation,
}) {
	const [inpuTextValue, setInputTextValue] = useState("");
	const [optionsData, setOptionsData] = useState([]);

	useEffect(() => {
		fetchOptionsData();
	}, []);

	const fetchOptionsData = async () => {
		const res = await fetch(`/api/getData?category=${getOptions}`);
		const apiData = await res.json();
		setOptionsData(apiData);
	};

	function removeFromValues(address) {
		const indexToRemove = value.findIndex((item) => item === address);

		if (indexToRemove !== -1) {
			let clonedAry = [...value];
			clonedAry.splice(indexToRemove, 1);
			setValue(clonedAry);
		}
	}

	return (
		<div>
			{label && <FormLabel>{label}</FormLabel>}
			{value?.length > 0 && (
				<div className="flex gap-2 flex-wrap mb-2">
					{value.map((item) => {
						return (
							<div
								key={`${item}_admin_wallet`}
								className=" uppercase tracking-wide bg-gray-600 rounded-xl px-2 transition-transform duration-100 hover:bg-gray-800 hover:scale-95"
								onClick={() => {
									removeFromValues(item);
								}}
							>
								<div className="p-2 bg-fourth rounded-full flex items-center cursor-pointer hover:opacity-50">
									<span className="!text-xs tracking-wider text-fourth ">
										{item}
									</span>
									<IoCloseCircle className="w-6 h-6 text-red-400"></IoCloseCircle>
								</div>
							</div>
						);
					})}
				</div>
			)}

			<InputText
				value={inpuTextValue}
				setValue={setInputTextValue}
				placeholder={placeholder}
				validation={validation}
				multiValueValidation={multiValueValidation}
				multiValue={value}
				setMultiValue={setValue}
				isMultiValue={true}
			></InputText>
			{/*options && typeof options == "string" ? (
				<InputText
					value={inpuTextValue}
					setValue={setInputTextValue}
					placeholder={placeholder}
					validation={validation}
					multiValue={value}
					setMultiValue={setValue}
					isMultiValue={true}
				></InputText>
			) : (
				<InputSelect
					value={inpuTextValue}
					setValue={setInputTextValue}
					placeholder={placeholder}
					multiValue={value}
					setMultiValue={setValue}
					isMultiValue={true}
					options={options}
					keyToUseAsValue="name"
				></InputSelect>
			)*/}
		</div>
	);
}

export default InputMultiValue;
