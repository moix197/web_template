// src/pages/dashboard.tsx
"use client";
import BasicForm from "../../../components/forms/BasicForm";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import { postCall } from "../../../services/apiSkeletons/calls";
import useNotifications from "../../../Hooks/useNotifications";
import { DashboardDataContext } from "../../../contexts/DashboardDataContextProvider";

function Dashboard() {
	const { category } = useParams();
	const { showNotification } = useNotifications();
	const { config, attachItemToFrontData } = useContext(DashboardDataContext);

	async function createNew(formItem: object) {
		const postItem = { data: formItem, category };
		const result = await postCall("/api/create", postItem);
		showNotification(result);
		attachItemToFrontData(category, result.value._id, formItem, result.err);
	}

	return (
		<div>
			{config[category].forms && (
				<main className="flex-1  p-6 ">
					<BasicForm
						formValues={config[category].forms["new"]}
						title={`Create New ${config[category].data.singularName}`}
						btnText={"Create"}
						cb={async (item) => {
							await createNew(item);
						}}
					></BasicForm>
				</main>
			)}
		</div>
	);
}

export default Dashboard;
