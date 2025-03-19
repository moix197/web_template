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

/*export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	pages: {
		signIn: "/login",
		signOut: "/",
	},
	callbacks: {
		async session({ session }) {
			const sessionUser = await basicModels["users"].findOne({
				email: session.user.email,
			});
			session.user.id = sessionUser?._id;
			session.user.role = sessionUser?.role;

			return session;
		},
		async signIn({ account, user, profile }) {
			// Ensure only Gmail accounts can log in
			const emailDomain = profile?.email?.split("@")[1];

			if (emailDomain !== "gmail.com") return;

			const userDbData = await findOrCreateDocument(
				basicModels["users"],
				{
					email: profile?.email,
				},
				{
					email: profile?.email,
					name: profile?.name,
					image: profile?.picture,
				}
			);

			if (userDbData.role == "owner") {
				return true;
			}

			return false;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
*/
