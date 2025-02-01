// src/pages/dashboard.tsx
"use client";
import { getCall, postCall } from "@/services/apiSkeletons/calls";
import Link from "next/link";
import React, { useState } from "react";

function Dashboard() {
	function doThis() {
		getCall("/api/launchdb", { airdropName: "twitter_airdrop" }).then((res) => {
			console.log(res);
		});
	}
	return (
		<div>
			<main className="flex-1  p-6 ">
				<h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
				<button
					onClick={doThis}
					className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700"
				>
					Do this
				</button>
			</main>
		</div>
	);
}

export default Dashboard;
