import path from "path";
import fs from "fs";
import { apiHandler } from "../../../base-app/utils/api/handler";
import FileSystemModel from "../../data/models/FileSystem.model";
import { insertDocument } from "../../../base-app/utils/db/crud";
import {
	getOrCreateParentFolder,
	getRelatedPaths,
} from "../../../base-app/utils/fileSystem/helpers";

async function uploadFile(req: Request): Promise<any> {
	try {
		const formData = await req.formData();
		const body = Object.fromEntries(formData);
		const file = body.file;
		const { parentId, imageCategory, parentFolderId } = body;

		if (!file) {
			throw new Error("Couldn't upload the file");
		}

		const rootParent = await getOrCreateParentFolder(
			imageCategory,
			parentFolderId
		);

		const { itemPath, fullParentFolderPath } = await getRelatedPaths(
			!parentId ? rootParent?._id : parentId,
			//rootParent?._id ? rootParent?._id : parentId,
			file.name,
			parentId ? null : rootParent
		);

		console.log("formData", formData);

		if (!fs.existsSync(fullParentFolderPath)) {
			await fs.promises.mkdir(fullParentFolderPath, { recursive: true });
		}

		await insertDocument(
			FileSystemModel,
			{
				name: file.name,
				isDirectory: false,
				path: itemPath,
				parentId: parentId ? parentId : rootParent?._id,
				size: file.size,
				rootName: rootParent.name,
				mimeType: file.mimetype,
			},
			"We couldn't upload the file, please try again later"
		);

		const buffer = Buffer.from(await file.arrayBuffer());

		fs.writeFileSync(path.resolve(fullParentFolderPath, file.name), buffer);

		return {
			err: false,
			message: `Image uploaded successfully`,
			//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
		};
	} catch (error: any) {
		console.log("error", error);
		return {
			err: true,
			message: error.message
				? error.message
				: "An error occurred, please try again later",
			error: error,
		};
	}
}

export const POST = apiHandler({ POST: uploadFile });
