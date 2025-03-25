import { useContext, useEffect, useState } from "react";
import { getCall, postCall } from "../../services/apiSkeletons/calls";
import { SolidButton } from "../buttons/Buttons";
import FormDrawer from "./FormDrawer";
import useNotifications from "../../Hooks/useNotifications";
import { DashboardDataContext } from "../../contexts/DashboardDataContextProvider";
import LoadingCont from "../base/loaders/LoadingCont";

function RelatedItem({ item, category, btnText = "" }) {
	const { showNotification } = useNotifications();
	const [isLoading, setIsLoading] = useState();
	const [itemDbData, setItemDbData] = useState();
	const { config } = useContext(DashboardDataContext);

	useEffect(() => {
		getItemValues();
	}, []);

	async function createRelatedItem() {
		const postItem = { data: item, category };
		const result = await postCall("/api/create", postItem);
		showNotification(result);
	}

	async function getItemValues() {
		setIsLoading(true);
		const response = await getCall("/api/getData", {
			category,
			data: JSON.stringify(item),
		});
		setItemDbData(response.result.value[0]);
		setIsLoading(false);
	}

	async function update(formItem: object) {
		const postItem = { data: formItem, category, id: itemDbData._id };
		const result = await postCall("/api/update", postItem);
		showNotification(result);
	}

	return (
		<LoadingCont isLoading={isLoading} size="lg">
			{!itemDbData ? (
				<SolidButton
					onClick={() => {
						createRelatedItem();
					}}
				>
					{btnText ? btnText : "Create"}
				</SolidButton>
			) : (
				<FormDrawer
					triggerBtnText={"Manage"}
					item={itemDbData}
					cb={async (item) => {
						await update(item);
					}}
					updateValues={config[category]["forms"].update}
					title={category}
				></FormDrawer>
			)}
		</LoadingCont>
	);
}

export default RelatedItem;
