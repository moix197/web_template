import { getCall } from "@moix197/base-ui";
import { ReactNode } from "react";
import { createContext, useState } from "react";
import { mergeObjects } from "@moix197/base-ui";

const DashboardDataContext = createContext<any>(null);

export type DashboardConfig = {
	categories: {
		name: string;
		config: any; // You can make this more specific
	}[];
	apiEndpoints?: {
		getData?: string;
		// other endpoints
	};
};

function DashboardDataContainer({
	children,
	config,
}: //customGetCall,
{
	children: ReactNode;
	config: DashboardConfig;
	//customGetCall?: (endpoint: string, params: any) => Promise<any>;
}) {
	const [isLoading, setIsLoading] = useState(false);

	// Create state and setters for each category
	const [categoryStates, setCategoryStates] = useState<Record<string, any>>({});
	const categorySetters: Record<string, any> = {};

	// Initialize states and setters for each category
	config.categories.forEach((cat) => {
		const [state, setState] = useState(null);
		categoryStates[cat.name] = state;
		categorySetters[cat.name] = setState;
	});

	// Recreate your catsAry structure
	const catsAry = {
		data: categoryStates,
		sets: categorySetters,
	};

	async function getAllItems(category: string, data = null) {
		if (!category) return;
		const response = await getCall("/api/getData", { category, data });
		/* (customGetCall || defaultGetCall)(
			config.apiEndpoints?.getData || "/api/getData",
			{ category, data }
		);*/
		catsAry.sets[category](response?.result?.value);
		return response?.result?.value;
	}

	function updateFrontData(
		category: string,
		id: string,
		data: any,
		isError: boolean
	) {
		if (isError) return;

		const newTempAry = [...catsAry.data[category]];

		catsAry.data[category].map((item: any, index: number) => {
			if (item._id == id) {
				const updatedObj = mergeObjects(item, data);
				newTempAry[index] = updatedObj;
				catsAry.sets[category](newTempAry);
			}
		});
	}

	function attachItemToFrontData(
		category: string,
		id: string,
		data: any,
		isError: boolean
	) {
		if (isError) return;
		data._id = id;

		// Initialize the array if it doesn't exist
		if (!catsAry.data[category]) {
			catsAry.sets[category]([]);
		}

		const newTempAry = catsAry.data[category]
			? [...catsAry.data[category]]
			: [];
		newTempAry.unshift(data);
		catsAry.sets[category](newTempAry);
	}

	return (
		<DashboardDataContext.Provider
			value={{
				...catsAry.data, // Spread all category data
				config: config.categories.reduce((acc: Record<string, any>, cat) => {
					acc[cat.name] = cat.config;
					return acc;
				}, {}),
				updateFrontData,
				attachItemToFrontData,
				isLoading,
				getAllItems,
			}}
		>
			{children}
		</DashboardDataContext.Provider>
	);
}

export { DashboardDataContext, DashboardDataContainer };
