import { basicModels } from "@/data/models/models";
import { createAuth } from "@base/auth";
import { findOrCreateDocument } from "@base/db";

const { authHandler, authOptions } = createAuth({
	basicModels,
	findOrCreateDocument,
	env: {
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
	},
});

export { authHandler as GET, authHandler as POST };
