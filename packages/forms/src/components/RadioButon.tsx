import { Label, Radio } from "flowbite-react";
import InputText from "./InputText";

function RadioButton({
	value,
	setValue,
	label,
	options,
	children = [],
	disabled = false,
	toolTipData = "",
}) {
	return (
		<div>
			<div className="text-secondary">
				<div className="label uppercase">
					<span className="label-text text-secondary">{label}</span>
				</div>
				<div className="flex">
					<div className=" grow justify-center border border-gray-700 p-2 rounded-lg mb-4">
						<div className="flex row gap-6 px-4 py-2">
							{options.map((item, index) => {
								return (
									<div key={`${item.name}_radio_option_${index}`}>
										<Radio
											id={item.name}
											name={label}
											value={item.name}
											defaultChecked={value?.value === item.value}
											onChange={() => {
												//value.value = item.value;
												value.value = item.value;
												setValue(value);
											}}
											disabled={disabled}
											className="cursor-pointer"
										/>
										<Label className="text-secondary ml-2 uppercase">
											{item.name}
										</Label>
									</div>
								);
							})}
						</div>
						{children.length > 0 &&
							children.map(
								(item) =>
									item?.launchValue == value?.value &&
									item?.values.map((childItem) => {
										return (
											<div key={`${childItem.name}_child_val`}>
												<InputText
													value={value}
													setValue={setValue}
													label={childItem.label}
													placeholder={childItem.placeholder}
													validation={childItem.validation}
													type={childItem.type}
													childName={childItem.name}
													isChild={true}
													disable={disabled}
													toolTipData={childItem.toolTipData}
												></InputText>
											</div>
										);
									})
							)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RadioButton;
