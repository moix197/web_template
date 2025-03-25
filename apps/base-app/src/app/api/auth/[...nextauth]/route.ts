import { basicModels } from "@/data/models/models";
import { createAuth } from "@moix197/auth";
import { findOrCreateDocument } from "@moix197/db";

const { authHandler, authOptions } = createAuth({
	basicModels,
	findOrCreateDocument,
	env: {
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
	},
});

export { authHandler as GET, authHandler as POST };
