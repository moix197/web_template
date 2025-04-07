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

function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
	const merged = { ...obj2 };

	for (const key in obj1) {
		if (!(key in obj2)) {
			merged[key] = obj1[key];
		}
	}

	return merged;
}

function delay(time: number = 0): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

function debounce(valueWhenChecked, valueNow, delay = 300, cb) {
	debounce.timeoutId = clearTimeout(debounce.timeoutId);

	valueWhenChecked.current = valueNow;

	debounce.timeoutId = setTimeout(function () {
		if (valueNow == "" || parseFloat(valueNow) == 0) return;
		if (valueNow == valueWhenChecked.current) {
			cb();
		}
	}, delay);
}

export { getCall, postCall, mergeObjects, delay, debounce };
