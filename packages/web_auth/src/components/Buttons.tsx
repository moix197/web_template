import { signIn, signOut } from "next-auth/react";
import React from "react";
import { SolidButton } from "@moix197/base-ui";

function LogInButton() {
	return (
		<SolidButton
			onClick={async () => {
				await signIn("google", { callbackUrl: "/dashboard" });
			}}
		>
			Sign in with Gmail
		</SolidButton>
	);
}

function LogOutButton() {
	return (
		<SolidButton onClick={async () => await signOut()}>Log out</SolidButton>
	);
}

export { LogInButton, LogOutButton };
