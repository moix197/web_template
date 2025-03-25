"use client";

import { LogInButton } from "@moix197/auth";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full bg-secondary p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center mb-6">Login</h1>
				<LogInButton></LogInButton>
			</div>
		</div>
	);
}
