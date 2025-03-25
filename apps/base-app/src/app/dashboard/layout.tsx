"use client";
import React, { useContext, useState } from "react";
import { SideNav } from "@moix197/base-ui";
import { Notification } from "@moix197/notifications";
import { DashboardDataContext } from "@moix197/dashboard";
import { DashboardContext } from "@/DashboardContext";
import { UserSessionDataContext } from "@moix197/auth";

function DashboardContent({ children }: { children: React.ReactNode }) {
	const { config } = useContext(DashboardDataContext);
	const { session } = useContext(UserSessionDataContext);

	const navItems = [
		{ href: "/dashboard", label: "Home" },
		...Object.entries(config)
			.filter(([_, value]) => !value.data.hideFromNav)
			.map(([key, value]) => ({
				href: `/dashboard/${key}`,
				label: value.data.pluralName || key,
			})),
	];

	return (
		<div className="flex h-screen bg-primary">
			<SideNav
				navItems={navItems}
				user={
					session?.user
						? {
								name: session.user.name,
								role: session.user.role,
								image: session.user.image,
						  }
						: undefined
				}
				title="LoveBook"
			/>
			<main className="md:relative w-full bg-gray-900 p-2 w-full md:w-[calc(100%-250px)] md:left-[250px] md:p-6">
				{children}
			</main>
			<Notification />
		</div>
	);
}

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<DashboardContext>
			<DashboardContent>{children}</DashboardContent>
		</DashboardContext>
	);
}
