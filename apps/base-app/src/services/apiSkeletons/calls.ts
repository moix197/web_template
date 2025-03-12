async function getCall(url: string, params: Record<string, any> | null = null) {
	let queryString = "";

	if (params) {
		queryString = new URLSearchParams(params).toString();
		queryString = `?${queryString}`;
	}
	try {
		let response = await fetch(url + queryString);
		let data = await response.json();
		return data;
	} catch (error) {
		return {
			err: true,
			error: "We couldn't proceed the call to the api",
		};
	}
}

async function postCall(
	url: string,
	content: Record<string, any>,
	type = "json",
	contentType = { "Content-Type": "application/json" }
) {
	try {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				...contentType,
			},
			body: type == "json" ? JSON.stringify(content) : content,
		});

		let data = await response.json();
		return data;
	} catch (error) {
		return {
			err: true,
			error: "We couldn't complete the call to the api",
		};
	}
}

export { getCall, postCall };
