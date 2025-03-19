import { ObjectId } from "mongodb";

function transformObjectIds(obj: any): void {
	const objectIdRegex = /^[0-9a-fA-F]{24}$/;

	for (const key in obj) {
		if (typeof obj[key] === "string" && objectIdRegex.test(obj[key])) {
			obj[key] = new ObjectId(obj[key]);
		} else if (
			obj[key] &&
			typeof obj[key] === "object" &&
			!Array.isArray(obj[key])
		) {
			transformObjectIds(obj[key]);
		}
	}
}

export { transformObjectIds };
