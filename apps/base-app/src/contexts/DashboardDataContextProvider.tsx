import paymentsConfig from "@/data/config/payments";
import paymentsMethodsConfig from "@/data/config/paymentMethods";
import booksConfig from "@/data/config/books";
import packagesConfig from "@/data/config/packages";
import transactionsConfig from "@/data/config/transactions";
import usersConfig from "@/data/config/users";
import { getCall } from "@/services/apiSkeletons/calls";
import { createContext, useState, useEffect, ReactNode } from "react";
import { mergeObjects } from "@/utils/base/convert";

const DashboardDataContext = createContext<any>(null);

export default function DashboardDataContainer({
	children,
}: {
	children: ReactNode;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [paymentMethods, setPaymentMethods] = useState(null);
	const [packages, setPackages] = useState(null);
	const [books, setBooks] = useState(null);
	const [fileSystem, setFileSystem] = useState(null);
	const [users, setUsers] = useState(null);
	const catsAry = {
		data: {
			paymentMethods,
			packages,
			books,
			fileSystem,
			users,
		},
		sets: {
			paymentMethods: setPaymentMethods,
			packages: setPackages,
			books: setBooks,
			fileSystem: setFileSystem,
			users: setUsers,
		},
	};

	const config = {
		payments: paymentsConfig,
		paymentMethods: paymentsMethodsConfig,
		books: booksConfig,
		packages: packagesConfig,
		transactions: transactionsConfig,
		users: usersConfig,
	};

	/*useEffect(() => {
		initContext();
	}, []);*/

	async function getAllItems(category, data = null) {
		if (!category) return;
		const response = await getCall("/api/getData", { category, data });
		catsAry?.sets[category](response?.result?.value);
		return response?.result?.value;
	}

	function updateFrontData(category, id, data, isError) {
		if (isError) return;

		const newTempAry = [...catsAry.data[category]];

		catsAry.data[category].map((item, index) => {
			if (item._id == id) {
				const updatedObj = mergeObjects(item, data);
				newTempAry[index] = updatedObj;
				catsAry?.sets[category](newTempAry);
			}
		});
	}

	function attachItemToFrontData(category, id, data, isError) {
		if (isError) return;
		data._id = id;
		const newTempAry = [...catsAry.data[category]];
		newTempAry.unshift(data);
		catsAry?.sets[category](newTempAry);
	}

	return (
		<DashboardDataContext.Provider
			value={{
				fileSystem,
				paymentMethods,
				packages,
				books,
				users,
				config,
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

export { DashboardDataContainer, DashboardDataContext };
