import { MainWithTabs } from "../tabs/MainWithTabs";
import { ArrayList } from "./ArrayList";
import { postCall } from "@moix197/base-ui";
import { SolidButton } from "@moix197/base-ui";
import { useNotifications } from "@moix197/notifications";

interface RelatedItemWithListProps {
	existingValues: any;
	category: string;
	config: any;
	updateCb: any;
	relatedItemsAry: any[];
	arrayListItems: any[];
	itemId: string;
	relatedItem: any;
	parentId: string;
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

	async function createNew(formItem: object, category: string) {
		let tempObj = { ...formItem } as Record<string, any>;
		tempObj[relatedItem.relatedValue] = parentId;

		const postItem = { data: tempObj, category };
		const result = await postCall("/api/create", postItem);
		showNotification(result);
		reloadData();
	}

	async function createRelatedItem() {
		let tempObj = {} as Record<string, any>;
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
				onClick={async () => {
					await createRelatedItem();
				}}
			>
				Create {relatedItem.name}
			</SolidButton>
		</div>
	);
}

export { RelatedItemWithList };
