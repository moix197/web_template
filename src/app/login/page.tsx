"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center mb-6">Login</h1>
				<button
					onClick={() => signIn("google")}
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
				>
					Sign in with Gmail
				</button>
			</div>
		</div>
	);
}
