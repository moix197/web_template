import MainWithTabs from "../base/Tabs/MainWithTabs";
import ArrayList from "./ArrayList";
import { postCall } from "../../services/apiSkeletons/calls";
import { SolidButton } from "../buttons/Buttons";
import { useNotifications } from "@moix197/notifications";

interface RelatedItemWithListProps {
	existingValues: any;
	category: string;
	config: any;
	updateCb: any;
	relatedItemsAry: any[];
	arrayListItems: any[];
	itemId: any;
	relatedItem: any;
	parentId: any;
	reloadData: any;
}
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
}: RelatedItemWithListProps) {
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

export default RelatedItemWithList;
