import React from "react";
import { Spinner } from "flowbite-react";

interface LoadingContProps {
	children?: React.ReactNode;
	isLoading: boolean;
	size?: "xs" | "sm" | "md" | "lg";
}

function LoadingCont({
	children,
	isLoading = false,
	size = "md",
}: LoadingContProps) {
	return (
		<>
			{isLoading ? (
				<Spinner aria-label="Loading Button" size={size}></Spinner>
			) : (
				children && children
			)}
		</>
	);
}

export { LoadingCont };
