import { Tabs, TabItem, TabsProps } from "flowbite-react";
import { CustomTabStyles } from "../../types/flowbite";
import { useEffect, useState, ReactNode } from "react";
import { ArrayList } from "@moix197/dashboard";
import { getCall } from "@moix197/base-ui";
import { RelatedItemWithList } from "../lists/RelatedItemWithList";
import { GeneralTab } from "./GeneralTab";

//prettier-ignore
const theme = {
	"base": "flex flex-col gap-2",
	"tablist": {
	  "base": "flex text-center",
	  "variant": {
		"default": "flex-wrap border-b border-gray-200 dark:border-gray-700",
		"underline": "-mb-px flex-wrap border-b  border-gray-200 dark:border-gray-700",
		"pills": "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
		"fullWidth": "w-full flex flex-row flex-wrap gap-1 outline-none border-none  rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
		"fullWidthSmall": "w-full flex flex-row flex-wrap gap-1 px-0 md:px-20 mt-0 pt-0 outline-none border-none rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400"
	  },
	  "tabitem": {
		"base": "!cursor-pointer !border-r-0 text-md flex-1 flex items-center justify-center rounded-t-lg p-4 font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
		"variant": {
		  "default": {
			"base": "rounded-t-lg ",
			"active": {
			  "on": "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
			  "off": "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
			}
		  },
		  "hiddenHeader":{
			"base": "hidden",
			"active": {
							  "on": "hidden",
			  "off": "hidden"
			}
		  },
		  "underline": {
			"base": "rounded-t-lg",
			"active": {
			  "on": "active rounded-t-lg border-b-2 border-cyan-600 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500",
			  "off": "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
			}
		  },
		  "pills": {
			"base": "",
			"active": {
			  "on": "rounded-lg bg-cyan-600 text-secondary",
			  "off": "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-secondary"
			}
		  },
		  "fullWidth": {
			"base": "ml-0 py-4 px-3 flex w-full first:ml-0 uppercase ring-0  border-b-2 !border-gray-600",
			"active": {
			  "on": "!ring-0 rounded-none bg-thirdDark text-secondary dark:bg-gray-700 dark:text-secondary",
			  "off": "!ring-0 rounded-none bg-gray-800 hover:bg-gray-700  dark:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-secondary"
			}
		  },
		  "fullWidthSmall": {
			"base": "h-10 text-xs md:text-md ml-0 flex w-full first:ml-0 uppercase ring-0 border-b-2 !border-gray-600",
			"active": {
			  "on": " !ring-0 rounded-none bg-thirdDark p-4 text-secondary dark:bg-gray-700 dark:text-secondary",
			  "off": "!ring-0 rounded-none bg-gray-800 hover:bg-gray-700  dark:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-secondary"
			}
		  }
		},
		"icon": "mr-2 h-5 w-5"
	  }
	},
	"tabitemcontainer": {
	  "base": "",
	  "variant": {
		"default": "",
		"underline": "",
		"pills": "",
		"fullWidth": "",
		"fullWidthSmall": "px-0 sm:px-20"
	  }
	},
	"tabpanel": "py-0"
  }

interface MainWithTabsProps extends Omit<TabsProps, "children"> {
	children?: ReactNode;
	variant?: CustomTabStyles;
	className?: string;
	existingValues: any;
	category: string;
	config: any;
	updateCb: any;
	relatedItemsAry: any[];
	arrayListItems: any[];
	itemId: string;
}

function MainWithTabs({
	children,
	variant = "default",
	className = "",
	existingValues,
	category,
	config,
	updateCb,
	relatedItemsAry = [],
	arrayListItems = [],
	itemId,
	...props
}: MainWithTabsProps) {
	const [relatedItems, setRelatedItems] = useState([] as any[]);

	const getRelatedItemObj = (relatedItem: any) => {
		let newTempObj = {} as Record<string, any>;
		newTempObj[relatedItem.relatedValue] = itemId;
		return newTempObj;
	};

	useEffect(() => {
		if (!relatedItemsAry || relatedItemsAry?.length <= 0) return;
		setItems();
	}, [relatedItemsAry]);

	async function setItems() {
		const newTempAry = await Promise.all(
			relatedItemsAry?.map(async (item) => {
				const newVal = await getItemValuesFromDb(item, item.name);
				return {
					...item,
					values: newVal, //,
				};
			})
		);
		setRelatedItems(newTempAry);
	}

	async function getItemValuesFromDb(item: any, cat: string) {
		//setIsLoading(true);
		const response = await getCall("/api/getData", {
			category: cat,
			data: JSON.stringify(getRelatedItemObj(item)),
		});
		return response?.result?.value ? response.result.value : {};
		//setIsLoading(false);
	}

	return (
		<Tabs
			theme={theme}
			aria-label="Tabs with underline"
			variant={
				arrayListItems.length == 0 && relatedItemsAry.length == 0
					? "hiddenHeader"
					: variant
			}
			className={`!w-full ${className}`}
			{...props}
		>
			<TabItem active title="General">
				<GeneralTab
					existingValues={existingValues}
					activationToggle={
						config[category]?.forms?.update?.hasSepareteActivationToggle
					}
					formValues={config[category]?.forms?.update?.["values"]}
					activationList={config[category]?.forms?.update?.["activationLists"]}
					category={category}
					config={config}
					updateCb={updateCb}
				/>
			</TabItem>

			{arrayListItems?.map((item, index) => {
				return (
					<TabItem
						className="!w-full"
						title={item.sectionTitle}
						key={`$array_list_item_${index}`}
					>
						<ArrayList
							arrayListItem={item}
							category={category}
							formValues={item.values}
							existingValues={existingValues}
							useDrawerToUpdate={item.useDrawerToUpdate}
						></ArrayList>
					</TabItem>
				);
			})}

			{relatedItems?.length > 0 &&
				relatedItems.map((item, index) => {
					return (
						<TabItem
							className="!w-full"
							title={item.name}
							key={`related_item${item.name}_${index}`}
						>
							<div className="w-full flex justify-between items-center">
								<RelatedItemWithList
									existingValues={
										item?.showAsArrayList ? item?.values : item?.values[0]
									}
									category={item?.name}
									itemId={item?.values[0]?._id}
									updateCb={updateCb}
									config={config}
									relatedItemsAry={
										config[item.name]?.forms?.update?.related || []
									}
									arrayListItems={
										config[item.name]?.forms?.update?.arrayList || []
									}
									relatedItem={item}
									parentId={itemId}
									reloadData={setItems}
								></RelatedItemWithList>
								{/*<RelatedItem item={item.values} category={item.name} />*/}
							</div>
						</TabItem>
					);
				})}
		</Tabs>
	);
}

export { MainWithTabs };
