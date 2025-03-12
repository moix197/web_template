import { apiHandler } from "../../../../base-app/utils/api/handler";
import fs from "fs";
import FileSystemModel from "../../../data/models/FileSystem.model";
import { insertDocument } from "../../../../base-app/utils/db/crud";
import {
	getOrCreateParentFolder,
	getRelatedPaths,
} from "../../../../base-app/utils/fileSystem/helpers";

async function createFolder(req: Request): Promise<any> {
	try {
		const body = await req.json();
		const { name, parentId, parentCategory, parentFolderId } = body;

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

		const newDoc = insertDocument(FileSystemModel, {
			name,
			isDirectory: true,
			path: itemPath,
			parentId: parentId || (rootParent?._id && rootParent?._id),
			rootName: rootParent.name,
		});

		if (!newDoc) {
			throw new Error("We couldn't create the folder, please try again later");
		}

		return {
			err: false,
			message: `Folder created successfully`,
			//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
		};
	} catch (error) {
		return {
			err: true,
			message: error.message
				? error.message
				: "An error occurred, please try again later",
			error: error,
		};
	}
}

export const POST = apiHandler({ POST: createFolder });
