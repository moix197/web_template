import { SimpleToggleList } from "@moix197/forms";
import { SimpleToggle } from "@moix197/forms";
import { BasicForm } from "@moix197/forms";
import { SectionBorder } from "@moix197/base-ui";
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

export { GeneralTab };
