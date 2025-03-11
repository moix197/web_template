"use client";
import SideNav from "@/components/base/navigation/SideNav";
import { Notification } from "@/components/notifications/Notification";
import DashboardDataContainer from "@/contexts/DashboardDataContextProvider";
import NotificationContainer from "@/contexts/NotificationContextProvider";
import UserSessionDataContainer from "@/contexts/UserSessionContextProvider";
import React, { useState } from "react";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
		<NotificationContainer>
			<UserSessionDataContainer>
				<DashboardDataContainer>
					<div className="flex h-screen bg-primary">
						{/* Sidebar */}

						<SideNav></SideNav>
						{/* Main Content */}
						<main className="md:relative w-full bg-gray-900 p-2 w-full md:w-[calc(100%-250px)] md:left-[250px] md:p-6">
							{children}
						</main>
					</div>
					<Notification></Notification>
				</DashboardDataContainer>
			</UserSessionDataContainer>
		</NotificationContainer>
	);
}
