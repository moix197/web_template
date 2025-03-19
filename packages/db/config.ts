let dbName: string | null = process.env.DB_NAME || null;

export function setDatabaseConfig(name: string) {
	if (!name) throw new Error("Database name must be provided!");
	dbName = name;
}

export function getDatabaseConfig() {
	if (!dbName) throw new Error("Database name has not been set!");
	return dbName;
}
