//import FileSystemModel from "../../../src/data/models/FileSystem.model";
import path from "path";
import { config } from "../../config";

async function getRelatedPaths(parentId, name, dbItem = null) {
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
	console.log("name", name);
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

const updateChildernPathRecursive = async (item) => {
	const children = await FileSystemModel.find({ parentId: item._id });

	for (const child of children) {
		child.path = `${item.path}/${child.name}`;
		await child.save({ timestamps: false });

		if (child.isDirectory) updateChildernPathRecursive(child);
	}
};

export {
	getRelatedPaths,
	getParentObjFromDb,
	getOrCreateParentFolder,
	updateChildernPathRecursive,
};
