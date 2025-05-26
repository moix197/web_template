import path from "path";
import fs from "fs";
import { getOrCreateParentFolder, getRelatedPaths } from "../utils/helpers";
import { getFileExplorerConfig } from "../../config";
//import { insertDocument, fileSystemModel } from "../../index";

interface UploadFileProps {
	file: any;
	parentId?: string;
	imageCategory?: string;
	parentFolderId?: string;
}

async function uploadFile({
	file,
	parentId,
	imageCategory = "",
	parentFolderId = "",
}: UploadFileProps) {
	if (!file) {
		throw new Error("Couldn't upload the file");
	}

	const { fileSystemModel, insertDocument } = getFileExplorerConfig();

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

	if (!fs.existsSync(fullParentFolderPath)) {
		await fs.promises.mkdir(fullParentFolderPath, { recursive: true });
	}

	await insertDocument(
		fileSystemModel,
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
}

export { uploadFile };
