function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
	const merged = { ...obj2 };

	for (const key in obj1) {
		if (!(key in obj2)) {
			merged[key] = obj1[key];
		}
	}

	return merged;
}

export { mergeObjects };
