import { MainWithTabs } from "../tabs/MainWithTabs";
import { ArrayList } from "./ArrayList";
import { postCall } from "@base/base-ui";
import { SolidButton } from "@base/base-ui";
import { useNotifications } from "@base/notifications";

function RelatedItemWithList({
	existingValues,
	category,
	config,
	updateCb,
	relatedItemsAry,
	arrayListItems,
	itemId,
	relatedItem,
	parentId,
	reloadData,
}) {
	const { showNotification } = useNotifications();

	async function createNew(formItem: object, category: string, itemId) {
		let tempObj = { ...formItem };
		tempObj[relatedItem.relatedValue] = parentId;

		const postItem = { data: tempObj, category };
		const result = await postCall("/api/create", postItem);
		showNotification(result);
		reloadData();
	}

	async function createRelatedItem() {
		let tempObj = {};
		tempObj[relatedItem.relatedValue] = parentId;

		const postItem = { data: tempObj, category };
		const result = await postCall("/api/create", postItem);
		showNotification(result);
		reloadData();
	}

	return relatedItem?.showAsArrayList ? (
		<ArrayList
			category={category}
			existingValues={relatedItem.values}
			arrayListItem={relatedItem}
			useDrawerToUpdate={relatedItem.useDrawerToUpdate}
			formValues={config[category]?.forms?.update?.values}
			isRelated={true}
			newItemCb={createNew}
		></ArrayList>
	) : relatedItem?.values?.length > 0 ? (
		<MainWithTabs
			existingValues={existingValues}
			category={category}
			itemId={itemId}
			updateCb={updateCb}
			config={config}
			relatedItemsAry={relatedItemsAry}
			arrayListItems={arrayListItems}
			variant={relatedItemsAry?.length > 0 ? "fullWidthSmall" : "hiddenHeader"}
		></MainWithTabs>
	) : (
		<div className="w-full">
			<SolidButton
				onClick={() => {
					createRelatedItem();
				}}
			>
				Create {relatedItem.name}
			</SolidButton>
		</div>
	);
}

export { RelatedItemWithList };
