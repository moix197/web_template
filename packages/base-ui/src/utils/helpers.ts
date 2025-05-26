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
	content: Record<string, any> | string,
	type = "json",
	contentType = { "Content-Type": "application/json" }
) {
	try {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				...contentType,
			},
			body: type === "json" ? JSON.stringify(content) : String(content),
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

function mergeObjects<T extends object, U extends object>(
	obj1: T,
	obj2: U
): T & U {
	const merged = { ...obj2 } as T & U;

	for (const key in obj1) {
		if (!(key in obj2)) {
			(merged as any)[key] = obj1[key as keyof T];
		}
	}

	return merged;
}

function delay(time: number = 0): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

function debounce(
	valueWhenChecked: any,
	valueNow: any,
	delay = 300,
	cb: any,
	prevDebounce: any
) {
	prevDebounce.timeoutId = clearTimeout(prevDebounce.timeoutId);

	valueWhenChecked.current = valueNow;

	prevDebounce.timeoutId = setTimeout(function () {
		if (valueNow == "" || parseFloat(valueNow) == 0) return;
		if (valueNow == valueWhenChecked.current) {
			cb();
		}
	}, delay);
}

export { getCall, postCall, mergeObjects, delay, debounce };
