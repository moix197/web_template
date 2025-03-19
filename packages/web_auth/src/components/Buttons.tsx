import { signIn, signOut } from "next-auth/react";
import React from "react";

function LogInButton() {
	return (
		<button
			onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
			className="w-full bg-blue-500 text-secondary py-2 px-4 rounded-lg hover:bg-blue-600 transition"
		>
			Sign in with Gmail
		</button>
	);
}

function LogOutButton() {
	return (
		<button
			onClick={() => signOut()}
			className="w-full bg-blue-500 text-secondary py-2 px-4 rounded-lg hover:bg-blue-600 transition"
		>
			Log out
		</button>
	);
}

export { LogInButton, LogOutButton };
