import {
	findOrCreateDocument as defaultFindOrCreateDocument,
	insertDocument as defaultInsertDocument,
} from "@moix197/db";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export const config: any = {
	findOrCreateDocument: defaultFindOrCreateDocument,
	fileSystemModel: null,
	insertDocument: defaultInsertDocument,
};

interface FileExplorerConfig {
	customFindOrCreate?: typeof defaultFindOrCreateDocument;
	customFileSystemModel?: any;
	customInsertDocument?: typeof defaultInsertDocument;
	enviroment?: string;
	bucketName?: string;
}

export function setFileExplorerConfig({
	customFindOrCreate,
	customFileSystemModel,
	customInsertDocument,
	enviroment,
	bucketName,
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
	if (enviroment) {
		config.enviroment = enviroment;
	}
	if (bucketName) {
		config.bucketName = bucketName;
	}
}

export function initSupabaseClient({
	url,
	anonKey,
}: {
	url: string;
	anonKey: string;
}) {
	supabase = createClient(url, anonKey);
}

export function getFileExplorerConfig() {
	return config as any;
}

export function getSupabaseClient(): SupabaseClient {
	if (!supabase) {
		throw new Error("Supabase client has not been initialized.");
	}
	return supabase;
}
