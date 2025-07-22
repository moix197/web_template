//import FileSystemModel from "../../../src/data/models/FileSystem.model";
import path from "path";
import { getSupabaseClient, getFileExplorerConfig } from "../../config";
import fs from "fs";
const config = getFileExplorerConfig();

async function getRelatedPaths(parentId: string, name: string, dbItem = null) {
	let itemPath = `${name}`; //Root folder
	let parentFolderPath = "";

	if (parentId) {
		const parentDbItem = dbItem
			? dbItem
			: await config.fileSystemModel.findById(parentId);
		if (!parentDbItem || !parentDbItem.isDirectory) {
			throw new Error(
				"We couldn't proceed with the request at the moment, please try again later"
			);
		}
		//This one is the route without the base path
		parentFolderPath = parentDbItem.path;
		itemPath = `${parentDbItem.path}/${name}`;
	}

	let fullItemPath, fullParentFolderPath;

	if (process.env.STORAGE_ENVIROMENT == "supabase") {
		fullItemPath = `${process.env.UPLOADS_ROOT_PATH}/${itemPath}`;
		fullParentFolderPath = `${process.env.UPLOADS_ROOT_PATH}/${parentFolderPath}`;
	} else {
		//this one adds the BASE route in
		fullItemPath = path.resolve(
			process.env.UPLOADS_ROOT_PATH as string,
			itemPath
		);
		fullParentFolderPath = path.resolve(
			process.env.UPLOADS_ROOT_PATH as string,
			parentFolderPath
		);
	}

	return { itemPath, fullItemPath, parentFolderPath, fullParentFolderPath };
}

async function getParentObjFromDb(
	name: string,
	path: string,
	parentId: string | null = null,
	rootName: string | null = null
) {
	const contentObj = {
		name: name,
		isDirectory: true,
		parentId: parentId,
		path: path,
		rootName: rootName,
	};

	console.log("fileSystemModel from config:", config.fileSystemModel);

	const result = await config.findOrCreateDocument(
		config.fileSystemModel,
		contentObj,
		contentObj
	);
	return result;
}

async function getOrCreateParentFolder(
	parentCategory: string,
	parentFolderId: string
) {
	let rootParent = await getParentObjFromDb(parentCategory, parentCategory);

	if (parentFolderId) {
		const parentUsingId = await getParentObjFromDb(
			parentFolderId,
			`${parentCategory}/${parentFolderId}`,
			rootParent?._id ? rootParent?._id : null,
			parentCategory
		);

		rootParent = parentUsingId;
	}

	return rootParent;
}

const updateChildrenPathRecursive = async (item: any) => {
	const children = await config.fileSystemModel?.find({ parentId: item._id });

	for (const child of children) {
		child.path = `${item.path}/${child.name}`;
		await child.save({ timestamps: false });

		if (child.isDirectory) updateChildrenPathRecursive(child);
	}
};

export async function renameLocal(item: any, newName: string) {
	const { itemPath: newItemPath, fullItemPath: newItemFullPath } =
		await getRelatedPaths(item.parentId, newName);
	const { fullItemPath: oldFullPath } = await getRelatedPaths(
		item.parentId,
		item.name
	);

	if (fs.existsSync(newItemFullPath)) {
		throw new Error("A file or folder with that name already exists!");
	}

	await fs.promises.rename(oldFullPath, newItemFullPath);

	return newItemPath;
}

export async function renameSupabase(
	item: any,
	newName: string
): Promise<string> {
	const supabase = getSupabaseClient();
	const { itemPath: newItemPath } = await getRelatedPaths(
		item.parentId,
		newName
	);
	const { itemPath: oldItemPath } = await getRelatedPaths(
		item.parentId,
		item.name
	);

	// Check if new path already exists
	const { data: exists, error: headError } = await supabase.storage
		.from(config.bucketName)
		.list(newItemPath, { limit: 1 });

	if (exists && exists.length > 0) {
		throw new Error("A file or folder with that name already exists!");
	}

	// Move (rename)
	const { error: moveError } = await supabase.storage
		.from(config.bucketName)
		.move(oldItemPath, newItemPath);

	if (moveError) {
		throw new Error("We couldn't rename the file in Supabase storage.");
	}

	return newItemPath;
}

export {
	getRelatedPaths,
	getParentObjFromDb,
	getOrCreateParentFolder,
	updateChildrenPathRecursive,
};
