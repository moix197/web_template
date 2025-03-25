import {
	findOrCreateDocument as defaultFindOrCreateDocument,
	insertDocument as defaultInsertDocument,
} from "@moix197/db";

export const config = {
	findOrCreateDocument: defaultFindOrCreateDocument,
	fileSystemModel: null,
	insertDocument: defaultInsertDocument,
};

export function setFileExplorerConfig({
	customFindOrCreate,
	customFileSystemModel,
	customInsertDocument,
} = {}) {
	if (customFindOrCreate) {
		config.findOrCreateDocument = customFindOrCreate;
	}
	if (customFileSystemModel) {
		config.fileSystemModel = customFileSystemModel;
	}
	if (customInsertDocument) {
		config.insertDocument = customInsertDocument;
	}
}

export function getFileExplorerConfig() {
	return config;
}
