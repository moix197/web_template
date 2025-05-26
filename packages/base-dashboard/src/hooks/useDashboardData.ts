import { useContext, useEffect } from "react";
import { DashboardDataContext } from "../providers/DashboardDataContextProvider";

const useDashboardData = async (
	category: any,
	setData: any,
	individualItem: any = false,
	individualFilter: any = null
) => {
	const context = useContext(DashboardDataContext);

	useEffect(() => {
		if (typeof category !== "string") return;
		//to set single item data
		if (individualItem && context[category]) {
			const item = context[category].find(
				(item: any) => item._id === individualItem
			);
			if (item) {
				setData(item);
				return;
			}
		}

		setData(context[category]);

		if (!context[category] /*context[category]?.length == 0*/) {
			getAndSetData(setData, category);
		} else if (!context[category]) {
			fetchData();
		}
	}, [context, category, individualItem, individualFilter]); // Add category and fetchData as dependencies

	async function getAndSetData(setData: any, category: string) {
		const newData = await context.getAllItems(category);
		setData(newData);
	}

	const fetchData = async () => {
		const res = await fetch(`/api/getData?category=${category}`);
		const apiData = await res.json();
		setData(apiData.result.value);
	};
};

export { useDashboardData };
