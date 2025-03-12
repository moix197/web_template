"use client";
import TableHover from "@/components/dashboard/tables/TableHover";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import useDashboardData from "@/Hooks/useDashboardData";
import { DashboardDataContext } from "@/contexts/DashboardDataContextProvider";
import ListSkeleton from "@/components/base/skeletons/ListSkeleton";
import { SolidButton } from "@/components/buttons/Buttons";

const CategoryPage = () => {
	const { category } = useParams();
	const [data, setData] = useState<{ result: { value: any[] } } | null>(null);
	const { config, isLoading } = useContext(DashboardDataContext);
	useDashboardData(category, setData);

	return (
		<>
			<div>
				<div className="text-center uppercase mb-8">
					<h1 className="text-2xl">{config[category]?.data?.pluralName}</h1>
				</div>
				{category != "usersData" &&
					config[category]?.forms?.new?.length > 0 && (
						<div className="text-center mb-4 flex justify-end">
							<Link
								href="/dashboard/[category]/new"
								as={`/dashboard/${category}/new`}
							>
								<SolidButton
									className="!w-full md:!w-auto self-end"
									onClick={() => {}}
								>
									<span className="flex justify-center items-center">
										<span className="mr-2">
											Create new {config[category]?.data?.singularName}
										</span>{" "}
										<FaPlus className="w-4 h-4"></FaPlus>
									</span>
								</SolidButton>
							</Link>
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
