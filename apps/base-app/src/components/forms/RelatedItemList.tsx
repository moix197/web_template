import { useMemo } from "react";
import SectionBorder from "../base/SectionBorder";
import { TitleXl } from "../Titles/TitlesDashboard";
import RelatedItem from "./RelatedItem";

function RelatedItemList({
	parentId,
	relatedItemsAry = [],
	btnText = "",
	className,
}) {
	const getRelatedItemValues = (relatedItem) => {
		let newTempObj = {};
		newTempObj[relatedItem.relatedValue] = parentId;
		return newTempObj;
	};

	const relatedItems = useMemo(() => {
		if (relatedItemsAry.length <= 0) return [];

		return relatedItemsAry.map((item) => ({
			...item,
			values: getRelatedItemValues(item),
		}));
	}, [relatedItemsAry, parentId]);

	return (
		<>
			{relatedItems.map((item, index) => (
				<SectionBorder key={`related_item_${index}`} className={className}>
					<div className="w-full flex justify-between items-center">
						<TitleXl>{item.name}</TitleXl>
						<RelatedItem item={item.values} category={item.name} />
					</div>
				</SectionBorder>
			))}
		</>
	);
}

export default RelatedItemList;
