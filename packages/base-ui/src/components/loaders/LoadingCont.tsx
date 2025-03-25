import React from "react";
import { Spinner } from "flowbite-react";

function LoadingCont({ children, isLoading = false, size = "md" }) {
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
