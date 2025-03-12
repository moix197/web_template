import SectionBorder from "../SectionBorder";
import SimpleToggle from "../../forms/SimpleToggle";
import BasicForm from "../../forms/BasicForm";
import SimpleToggleList from "../../forms/SimpleToggleList";
import { useEffect } from "react";

function GeneralTab({
	existingValues,
	activationToggle,
	category,
	config,
	updateCb,
	formValues,
	activationList,
	btnText = "update",
}) {
	useEffect(() => {
		console.log("formValues", formValues);
	}, []);
	return (
		<div className="flex flex-wrap">
			{activationToggle && (
				<SectionBorder className="w-full">
					<SimpleToggle
						value={existingValues?.isActive}
						keyToToggle={"isActive"}
						cb={async (item) => {
							await updateCb(
								item,
								category,
								existingValues?._id && existingValues?._id
							);
						}}
					></SimpleToggle>
				</SectionBorder>
			)}

			<SectionBorder className="flex-auto">
				{
					<BasicForm
						formValues={formValues}
						existingValues={existingValues}
						btnText={btnText}
						cb={async (item) => {
							await updateCb(
								item,
								category,
								existingValues?._id && existingValues?._id
							);
						}}
					></BasicForm>
				}
			</SectionBorder>

			{activationList?.length > 0 &&
				activationList.map((item, index) => {
					return (
						<SimpleToggleList
							key={`${item}_List_${index}`}
							categoryName={item}
							className="flex-1"
							cb={async (item) => {
								await updateCb(
									item,
									category,
									existingValues?._id && existingValues?._id
								);
							}}
							title={`Update ${config[item]?.data?.pluralName} for  ${existingValues.name} ${config[category]?.data?.singularName}`}
							existingValues={
								existingValues[item]?.length > 0 ? existingValues[item] : []
							}
							valueToUpdate="_id"
						></SimpleToggleList>
					);
				})}
		</div>
	);
}

export default GeneralTab;
