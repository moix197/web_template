import FileSystemModel from "../../../src/data/models/FileSystem.model";
import path from "path";
import { findOrCreateDocument } from "../db/crud";

async function getRelatedPaths(parentId, name, dbItem = null) {
	let itemPath = `${name}`; //Root folder
	let parentFolderPath = "";

	if (parentId) {
		const parentDbItem = dbItem
			? dbItem
			: await FileSystemModel.findById(parentId);
		if (!parentDbItem || !parentDbItem.isDirectory) {
			throw new Error(
				"We couldn't proceed with the request at the moment, please try again later"
			);
		}
		//This one is the route without the base path
		parentFolderPath = parentDbItem.path;
		itemPath = `${parentDbItem.path}/${name}`;
	}
	//this one adds the BASE route in
	const fullItemPath = path.resolve(process.env.UPLOADS_ROOT_PATH, itemPath);
	const fullParentFolderPath = path.resolve(
		process.env.UPLOADS_ROOT_PATH,
		parentFolderPath
	);

	return { itemPath, fullItemPath, parentFolderPath, fullParentFolderPath };
}

async function getParentObjFromDb(
	name,
	path,
	parentId = null,
	rootName = null
) {
	const contentObj = {
		name: name,
		isDirectory: true,
		parentId: parentId,
		path: path,
		rootName: rootName,
	};
	const result = await findOrCreateDocument(
		FileSystemModel,
		contentObj,
		contentObj
	);
	return result;
}

async function getOrCreateParentFolder(parentCategory, parentFolderId) {
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

export { getRelatedPaths, getParentObjFromDb, getOrCreateParentFolder };
