import { getOrCreateParentFolder, getRelatedPaths } from "../utils/helpers";
import { getFileExplorerConfig } from "../../config";
import fs from "fs";

async function createFolder({
	name,
	parentId,
	parentCategory,
	parentFolderId,
}) {
	const { fileSystemModel, insertDocument } = getFileExplorerConfig();

	console.log("fileSystemModel", fileSystemModel);
	console.log("insertDocument", insertDocument);

	const rootParent = await getOrCreateParentFolder(
		parentCategory,
		parentFolderId
	);

	if (!parentId && !rootParent) {
		throw new Error("We couldn't create the folder, please try again later");
	}

	let { itemPath, fullItemPath } = await getRelatedPaths(
		!parentId ? rootParent?._id : parentId,
		name,
		parentId ? null : rootParent
	);

	if (!fs.existsSync(fullItemPath)) {
		await fs.promises.mkdir(fullItemPath, { recursive: true });
	} else {
		throw new Error("Folder Already exists");
	}

	const newDoc = insertDocument(fileSystemModel, {
		name,
		isDirectory: true,
		path: itemPath,
		parentId: parentId || (rootParent?._id && rootParent?._id),
		rootName: rootParent.name,
	});

	if (!newDoc) {
		throw new Error("We couldn't create the folder, please try again later");
	}
}

export { createFolder };
