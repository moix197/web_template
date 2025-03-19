import { getRelatedPaths, updateChildernPathRecursive } from "../utils/helpers";
import fs from "fs";
import { getFileExplorerConfig } from "../../config";

async function rename({ newName, id }) {
	const { fileSystemModel } = getFileExplorerConfig();

	const item = await fileSystemModel.findById(id);

	if (!item) {
		throw new Error(
			"We couldn't proceed with the update, please try again later"
		);
	}

	let { itemPath, fullItemPath } = await getRelatedPaths(
		item.parentId,
		newName
	);
	const newItemPath = itemPath;
	const newItemFullPath = fullItemPath;

	const oldPaths = await getRelatedPaths(item.parentId, item.name);
	const oldFullPath = oldPaths.fullItemPath;

	if (fs.existsSync(newItemFullPath)) {
		throw new Error("A file or folder with that name already exists!");
	}

	await fs.promises.rename(oldFullPath, newItemFullPath);

	item.name = newName;
	item.path = newItemPath;

	const result = await item.save();

	if (item.isDirectory) {
		await updateChildernPathRecursive(item);
	}
}

export { rename };
