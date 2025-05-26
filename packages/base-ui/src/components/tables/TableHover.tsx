"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { TrueFalseWithIcons } from "../others/TrueFalseWithIcons";

interface TableProps {
	data: any;
	valuesToUse: string[];
	indexValueName?: string;
	itemUrl?: string;
	cb?: (item: any, index: number) => void;
	arrayListActiveItem?: any;
}

const TableHover = ({
	data,
	valuesToUse,
	indexValueName,
	itemUrl,
	cb,
	arrayListActiveItem,
}: TableProps) => {
	const router = useRouter();
	const [headKeys, setHeadKeys] = useState(valuesToUse);
	const [activeItemIndex, setActiveItemIndex] = useState(null as number | null);

	function handleRowClick(item: any, index: number) {
		setActiveItemIndex(index);
		itemUrl && router.push(`${itemUrl}${item._id}`);
		cb && cb(item, index);
	}

	const gridColumns = useMemo(() => {
		if (!headKeys) return "";
		const colCount = headKeys.length;
		switch (colCount) {
			case 1:
				return "sm:grid-cols-1";
			case 2:
				return "sm:grid-cols-2";
			case 3:
				return "sm:grid-cols-3";
			case 4:
				return "sm:grid-cols-4";
			case 5:
				return "sm:grid-cols-5";
			case 6:
				return "sm:grid-cols-6";
			default:
				return ""; // fallback or maximum value
		}
	}, [headKeys]);

	useEffect(() => {
		if (!arrayListActiveItem) {
			setActiveItemIndex(null);
		}
	}, [arrayListActiveItem]);

	useEffect(() => {
		if (indexValueName) {
			setHeadKeys([...valuesToUse, indexValueName]);
		}
	}, [indexValueName]);

	return (
		<>
			{data?.length > 0 ? (
				<div className="w-full">
					<div
						className={`hidden sm:grid ${gridColumns} px-4 py-2 border-b border-gray-600`}
					>
						{headKeys.map((value, index) => {
							return (
								<div
									className="bg-gray-900 text-secondary uppercase font-bold"
									key={`table_head_${index}`}
								>
									{value == "isActive" ? "is active" : value}
								</div>
							);
						})}
						<div className="bg-gray-900 text-secondary">
							<span className="sr-only">Edit</span>
						</div>
					</div>
					<div className="flex flex-col  ">
						{data?.length > 0 &&
							data.map((item: any, index: number) => {
								return (
									<div
										key={`table_items_${index}`}
										className={`p-3 sm:p-0 !bg-gray-900 sm:grid ${gridColumns}   ${
											activeItemIndex == index && "bg-blue-500"
										} border-b border-gray-900 color-black dark:border-gray-600 dark:bg-gray-800 cursor-pointer hover:bg-gray-600 dark:hover:bg-gray-700`}
										onClick={() => handleRowClick(item, index)}
									>
										{headKeys.map((value, i) => {
											return (
												<div
													key={`table_items_inner_${index}_${i}`}
													className="flex justify-between px-4 py-3 uppercase whitespace-nowrap font-medium text-secondary"
												>
													<div className="flex sm:hidden items-center text-xs opacity-70">
														{headKeys[i]}
													</div>
													{value == indexValueName
														? `${indexValueName} #${index + 1}`
														: item[value]}
													{value == "isActive" && (
														<TrueFalseWithIcons
															value={item[value]}
														></TrueFalseWithIcons>
													)}
												</div>
											);
										})}
									</div>
								);
							})}
					</div>
				</div>
			) : (
				<div className="w-full text-center">There's no Item to show here</div>
			)}
		</>
	);
};

export { TableHover };
