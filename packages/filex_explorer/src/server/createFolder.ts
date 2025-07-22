import { getOrCreateParentFolder, getRelatedPaths } from "../utils/helpers";
import { getFileExplorerConfig } from "../../config";
import fs from "fs";

interface CreateFolderProps {
	name: string;
	parentId?: string;
	parentCategory?: string;
	parentFolderId?: string;
}

async function createFolder({
	name,
	parentId,
	parentCategory = "",
	parentFolderId = "",
}: CreateFolderProps) {
	const { fileSystemModel, insertDocument, enviroment } =
		getFileExplorerConfig();

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

	if (enviroment !== "supabase") {
		if (!fs.existsSync(fullItemPath)) {
			await fs.promises.mkdir(fullItemPath, { recursive: true });
		} else {
			throw new Error("Folder Already exists");
		}
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
