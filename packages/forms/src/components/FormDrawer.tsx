"use client";

import { useContext, useEffect, useState } from "react";
import { DrawerBasic } from "@moix197/base-ui";
import { SolidButton } from "@moix197/base-ui";
import { GeneralTab } from "@moix197/dashboard";
import { DashboardDataContext } from "@moix197/dashboard";

interface FormDrawerProps {
	triggerBtnText?: string;
	item?: any;
	category?: string;
	cb?: (newItem: any) => void;
	updateValues?: any;
	resetValues?: () => void;
	title?: string;
}

function FormDrawer({
	triggerBtnText,
	item,
	category,
	cb,
	updateValues,
	resetValues,
	title = "",
}: FormDrawerProps) {
	const [openDrawer, setOpenDrawer] = useState(false);
	const { config } = useContext(DashboardDataContext);

	useEffect(() => {
		if (!item || triggerBtnText) return;

		setOpenDrawer(true);
	}, [item, triggerBtnText]);

	return (
		<>
			{triggerBtnText && (
				<SolidButton onClick={() => setOpenDrawer(true)}>
					{triggerBtnText}
				</SolidButton>
			)}
			<DrawerBasic
				className="max-w-[700px] w-full b border-l border-third"
				openDrawer={openDrawer}
				setOpenDrawer={() => {
					setOpenDrawer(false);
					resetValues && resetValues();
				}}
				title={title}
			>
				<GeneralTab
					btnText="Save"
					formValues={
						config[updateValues?.name]
							? config[updateValues?.name]?.forms?.update?.values
							: updateValues?.values
					}
					activationToggle={updateValues?.hasSepareteActivationToggle}
					activationList={updateValues?.activationList}
					existingValues={item}
					updateCb={(newItem: any) => {
						cb && cb(newItem);
					}}
				></GeneralTab>
			</DrawerBasic>
		</>
	);
}

export default FormDrawer;
