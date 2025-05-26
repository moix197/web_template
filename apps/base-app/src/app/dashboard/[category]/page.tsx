"use client";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useDashboardData } from "@moix197/dashboard";
import { DashboardDataContext } from "@moix197/dashboard";
import { ListSkeleton } from "@moix197/base-ui";
import { SolidButton } from "@moix197/base-ui";
import { TableHover } from "@moix197/base-ui";

const CategoryPage = () => {
	const { category } = useParams() as {
		category: string;
	};
	const [data, setData] = useState<{ result: { value: any[] } } | null>(null);
	const { config, isLoading } = useContext(DashboardDataContext);
	useDashboardData(category, setData, false, null);

	return (
		<>
			<div>
				<div className="text-center uppercase mb-8">
					<h1 className="text-2xl">{config[category]?.data?.pluralName}</h1>
				</div>
				{category != "usersData" &&
					config[category]?.forms?.new?.length > 0 && (
						<div className="text-center mb-4 flex justify-end">
							<SolidButton
								className="!w-full md:!w-auto self-end"
								href={`/dashboard/${category}/new`}
							>
								<span className="flex justify-center items-center">
									<span className="mr-2">
										Create new {config[category]?.data?.singularName}
									</span>{" "}
									<FaPlus className="w-4 h-4"></FaPlus>
								</span>
							</SolidButton>
						</div>
					)}
				{!isLoading ? (
					<TableHover
						data={data}
						valuesToUse={config[category]?.itemsTable?.values}
						itemUrl={`/dashboard/${category}/`}
					></TableHover>
				) : (
					<ListSkeleton></ListSkeleton>
				)}
			</div>
		</>
	);
};

export default CategoryPage;
