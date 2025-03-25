import { ToggleSwitch } from "flowbite-react";
import InputText from "./InputText";

function Toggle({
	value,
	setValue,
	label,
	children = null,
	disable = false,
	toolTipData = "",
}) {
	return (
		<div>
			<div className="label uppercase">
				<span className="label-text text-secondary">{label}</span>
			</div>
			<div className="flex">
				<div className="grow justify-center border border-gray-700 p-2 rounded-lg mb-6">
					<div className="form-control">
						<label className="cursor-pointer label">
							<span className="label-text">
								{value?.value ? (
									<span className="text-third">Active</span>
								) : (
									<span className="text-red-400">Deactivated</span>
								)}
							</span>
							<ToggleSwitch
								onChange={() => {
									value.value = !value.value;
									setValue(value);
								}}
								checked={value?.value}
								disabled={disable}
								className={`toggle toggle-primary  ${
									value?.value
										? "!bg-third border-third hover:bg-third"
										: "bg-red-400 border-red-400 hover:bg-red-400"
								}`}
							/>
						</label>
					</div>
					{children?.launchValue == value?.value &&
						children?.values.map((childItem) => {
							return (
								<InputText
									key={`${childItem.name}_child_val`}
									value={value}
									setValue={setValue}
									label={childItem.label}
									placeholder={childItem.placeholder}
									validation={childItem.validation}
									type={childItem.type}
									childName={childItem.name}
									isChild={true}
									toolTipData={childItem.toolTipData}
								></InputText>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default Toggle;
