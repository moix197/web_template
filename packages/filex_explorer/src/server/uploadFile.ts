import path from "path";
import fs from "fs";
import { getOrCreateParentFolder, getRelatedPaths } from "../utils/helpers";
import { getFileExplorerConfig } from "../../config";
import { getSupabaseClient } from "../../config";
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

	const { enviroment, fileSystemModel, insertDocument } =
		getFileExplorerConfig();

	const rootParent = await getOrCreateParentFolder(
		imageCategory,
		parentFolderId
	);

	const { itemPath, fullItemPath, parentFolderPath, fullParentFolderPath } =
		await getRelatedPaths(
			!parentId ? rootParent?._id : parentId,
			//rootParent?._id ? rootParent?._id : parentId,
			file.name,
			parentId ? null : rootParent
		);

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

	if (enviroment == "supabase") {
		await uploadFileToSupabase({ filePath: fullItemPath, file });
	} else {
		await uploadFiletoFileSystem({
			fullParentFolderPath,
			file,
		});
	}
}

async function uploadFileToSupabase({ filePath, file }) {
	const supabase = getSupabaseClient();

	const buffer = Buffer.from(await file.arrayBuffer());

	const { error: uploadError } = await supabase.storage
		.from("lovebook")
		.upload(filePath, buffer, {
			contentType: file.mimetype,
			upsert: false, // prevent overwrite
		});

	if (uploadError) {
		throw new Error("Upload to storage failed");
	}
}

async function uploadFiletoFileSystem({ fullParentFolderPath, file }) {
	if (!fs.existsSync(fullParentFolderPath)) {
		await fs.promises.mkdir(fullParentFolderPath, { recursive: true });
	}

	const buffer = Buffer.from(await file.arrayBuffer());

	fs.writeFileSync(path.resolve(fullParentFolderPath, file.name), buffer);
}

export { uploadFile };
