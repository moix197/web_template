"use client";

import { useNotifications } from "@moix197/notifications";
import { MainWithTabs } from "@moix197/dashboard";
import { postCall } from "@moix197/base-ui";
import { TitleXl } from "@moix197/base-ui";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { useDashboardData } from "@moix197/dashboard";
import { DashboardDataContext } from "@moix197/dashboard";

function Dashboard() {
	const { category, itemId } = useParams();
	const [existingValues, setExistingValues] = useState({});
	const { showNotification } = useNotifications();
	const { config, updateFrontData } = useContext(DashboardDataContext);

	useDashboardData(category, setExistingValues, itemId);

	async function update(formItem: object, cat, item_id) {
		const postItem = {
			data: formItem,
			category: cat,
			id: item_id ? item_id : itemId,
		};
		const result = await postCall("/api/update", postItem);
		showNotification(result);
		updateFrontData(category, itemId, formItem, result.err);
	}

	return (
		<div>
			{existingValues && (
				<main className="flex-1  py-6 p-0 md:p-6 flex flex-wrap">
					<div className="w-full text-center mb-8">
						<TitleXl>Update {config[category].data.singularName}</TitleXl>
					</div>
					<MainWithTabs
						existingValues={existingValues}
						category={category}
						itemId={itemId}
						updateCb={update}
						config={config}
						relatedItemsAry={config[category]["forms"]["update"]["related"]}
						arrayListItems={config[category]["forms"]["update"]["arrayList"]}
					></MainWithTabs>
				</main>
			)}
		</div>
	);
}

export default Dashboard;
