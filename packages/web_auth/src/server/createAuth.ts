import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export function createAuth({
	basicModels,
	usersModelName,
	findOrCreateDocument,
	env,
}: {
	basicModels: any;
	usersModelName: string;
	findOrCreateDocument: any;
	env: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string };
}) {
	const authOptions: NextAuthOptions = {
		providers: [
			GoogleProvider({
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
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

	return { authHandler: handler, authOptions };
}
