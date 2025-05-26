import {
	findOrCreateDocument as defaultFindOrCreateDocument,
	insertDocument as defaultInsertDocument,
} from "@moix197/db";

export const config: any = {
	findOrCreateDocument: defaultFindOrCreateDocument,
	fileSystemModel: null,
	insertDocument: defaultInsertDocument,
};

interface FileExplorerConfig {
	customFindOrCreate?: typeof defaultFindOrCreateDocument;
	customFileSystemModel?: any;
	customInsertDocument?: typeof defaultInsertDocument;
}

export function setFileExplorerConfig({
	customFindOrCreate,
	customFileSystemModel,
	customInsertDocument,
}: FileExplorerConfig) {
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
	return config as any;
}
