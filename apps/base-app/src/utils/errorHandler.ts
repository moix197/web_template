export function handleApiError(error: unknown) {
	const err = error as Error;
	console.log("error", err);
	return {
		err: true,
		message: err.message
			? err.message
			: "An error occurred, please try again later",
		error: err,
	};
}
