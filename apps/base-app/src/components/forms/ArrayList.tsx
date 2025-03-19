import { useContext, useEffect, useState } from "react";
import { SolidButton } from "../buttons/Buttons";
import { TitleXl } from "../Titles/TitlesDashboard";
import { FaPlus } from "react-icons/fa";
import { postCall } from "../../services/apiSkeletons/calls";
import TableHover from "../dashboard/tables/TableHover";
import FormDrawer from "./FormDrawer";
import { mergeObjects } from "@/utils/base/convert";
import FormModal from "./FormModal";
import { DashboardDataContext } from "../../contexts/DashboardDataContextProvider";
import { useNotifications } from "@base/notifications";

function ArrayList({
	items = [],
	arrayListItem = {},
	existingValues = {},
	formValues = [],
	category = "",
	className = "",
	isRelated = false,
	newItemCb = null,
	useDrawerToUpdate = false,
}) {
	const { showNotification } = useNotifications();
	const [componentValues, setComponentValues] = useState(existingValues);
	const [drawerValues, setDrawerValues] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { config } = useContext(DashboardDataContext);

	useEffect(() => {
		setComponentValues(existingValues);
	}, [existingValues]);

	async function addNewItem(parentName, newItem) {
		setIsLoading(true);
		const newValue = { ...componentValues };
		newValue[parentName].push(newItem);

		const postItem = {
			data: newValue,
			category,
			id: newValue._id,
		};

		const result = await postCall("/api/update", postItem);

		showNotification(result);

		if (!result?.err) {
			setComponentValues(newValue);
		}
		setIsLoading(false);
	}

	function setActiveItemCb(item, index) {
		let tempItem = { ...drawerValues };
		tempItem[arrayListItem.name] = tempItem[arrayListItem.name] ?? {}; // Ensure that arrayListItem.name exists

		tempItem[arrayListItem.name].activeItemValues = item; // Set activeItemValues
		tempItem[arrayListItem.name].activeItemIndex = index; // Set activeItemIndex
		setDrawerValues(tempItem);
	}

	return (
		<div className="w-full">
			<div className="w-full flex justify-between items-center mb-4">
				{!arrayListItem?.newItem ? (
					<FormModal
						itemValues={formValues}
						category={category}
						itemName={
							arrayListItem?.sectionTitleSingular
								? arrayListItem.sectionTitleSingular
								: config[category]?.data?.singularName
						}
						cb={(newItem) => {
							newItemCb
								? newItemCb(newItem, category)
								: addNewItem(arrayListItem.name, newItem);
						}}
					></FormModal>
				) : (
					<SolidButton
						className="self-end"
						isLoading={isLoading}
						onClick={() => {
							newItemCb
								? newItemCb(arrayListItem.newItem, category)
								: addNewItem(arrayListItem.name, arrayListItem.newItem);
						}}
					>
						<span className="flex justify-center items-center">
							<span className="mr-2">Add New</span>{" "}
							<FaPlus className="w-4 h-4"></FaPlus>
						</span>
					</SolidButton>
				)}
			</div>
			<TableHover
				data={
					componentValues[arrayListItem.name]
						? componentValues[arrayListItem.name]
						: componentValues
				}
				arrayListActiveItem={drawerValues[arrayListItem.name]?.activeItemValues}
				indexValueName={arrayListItem?.itemsTable?.indexValueName}
				valuesToUse={arrayListItem?.itemsTable?.values}
				cb={setActiveItemCb}
			></TableHover>
			{useDrawerToUpdate && (
				<FormDrawer
					updateValues={arrayListItem}
					category={category}
					item={drawerValues[arrayListItem.name]?.activeItemValues}
					resetValues={() => setDrawerValues({})}
					cb={async (newItem) => {
						const tempAry = componentValues[arrayListItem.name]
							? componentValues[arrayListItem.name]
							: componentValues;

						tempAry[drawerValues[arrayListItem.name].activeItemIndex] =
							mergeObjects(
								tempAry[drawerValues[arrayListItem.name].activeItemIndex],
								newItem
							);
						let tempObj = {};
						tempObj[arrayListItem.name] = tempAry;

						const postItem = {
							data: isRelated ? newItem : tempObj,
							category,
							id: drawerValues[category]?.activeItemValues?._id
								? drawerValues[category]?.activeItemValues?._id
								: componentValues._id,
						};

						const result = await postCall("/api/update", postItem);
						showNotification(result);
					}}
				></FormDrawer>
			)}
		</div>
	);
}

export default ArrayList;
