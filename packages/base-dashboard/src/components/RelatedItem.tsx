import { useContext, useEffect, useState } from "react";
import { getCall, postCall } from "@moix197/base-ui";
import { SolidButton } from "@moix197/base-ui";
import FormDrawer from "@moix197/forms/src/components/FormDrawer";
import { DashboardDataContext } from "@moix197/dashboard/src/providers/DashboardDataContextProvider";
import { LoadingCont } from "@moix197/base-ui";
import { useNotifications } from "@moix197/notifications";

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

export { RelatedItem };
