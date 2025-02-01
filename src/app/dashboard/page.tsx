// src/pages/dashboard.tsx
"use client";
import Link from "next/link";
import React, { useState } from "react";

function Dashboard() {
	return (
		<div>
			<main className="flex-1  p-6 ">
				<h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
				<p className="mt-4">
					Select an option from the sidebar to get started.
				</p>
			</main>
		</div>
	);
}

export default Dashboard;
