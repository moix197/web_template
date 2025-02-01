// src/pages/dashboard.tsx
"use client";
import Link from "next/link";
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
		<div className="flex h-screen">
			{/* Sidebar */}
			<aside
				className={`fixed z-20 inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform md:relative md:translate-x-0`}
			>
				<div className="flex flex-col h-full">
					<div className="p-4 text-xl font-bold">Dashboard</div>
					<nav className="flex-1">
						<ul className="space-y-2 p-4">
							<li>
								<Link
									href="/dashboard"
									className="block px-4 py-2 rounded hover:bg-gray-700"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard/new"
									className="block px-4 py-2 rounded hover:bg-gray-700"
								>
									Create New Item
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="block px-4 py-2 rounded hover:bg-gray-700"
								>
									See Items
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="block px-4 py-2 rounded hover:bg-gray-700"
								>
									Manage Users
								</Link>
							</li>
						</ul>
					</nav>
					{/* Logout Button */}
					<div className="p-4">
						<button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700">
							Log Out
						</button>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 bg-gray-900 p-6 ">{children}</main>

			{/* Overlay for mobile when sidebar is open */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
					onClick={toggleSidebar}
				></div>
			)}
			<button
				onClick={toggleSidebar}
				className="md:hidden mb-4 px-4 py-2 bg-gray-800 text-white rounded"
			>
				{isSidebarOpen ? "Close Menu" : "Open Menu"}
			</button>
		</div>
	);
}
