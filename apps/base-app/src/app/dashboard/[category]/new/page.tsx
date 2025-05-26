"use client";
import { BasicForm } from "@moix197/forms";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import { postCall } from "@moix197/base-ui";
import { useNotifications } from "@moix197/notifications";
import { DashboardDataContext } from "@moix197/dashboard";

function Dashboard() {
	const { category } = useParams() as {
		category: string;
	};
	const { showNotification } = useNotifications();
	const { config, attachItemToFrontData } = useContext(DashboardDataContext);

	async function createNew(formItem: object) {
		const postItem = {
			category,
			data: formItem,
		};

		const result = await postCall("/api/create", postItem);
		showNotification(result);

		if (!result.err) {
			attachItemToFrontData(category, result.value._id, formItem, result.err);
		}
	}

	return (
		<div>
			{config[category].forms && (
				<main className="flex-1  p-6 ">
					<BasicForm
						formValues={config[category].forms["new"]}
						title={`Create New ${config[category].data.singularName}`}
						btnText={"Create"}
						cb={async (item: any) => {
							await createNew(item);
						}}
					></BasicForm>
				</main>
			)}
		</div>
	);
}

export default Dashboard;
