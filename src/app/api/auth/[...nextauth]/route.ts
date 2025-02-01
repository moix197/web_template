/*import dbConnect from "@/lib/db";
import Pages from "@/models/Pages";

export async function POST(req) {
	try {
		await dbConnect();
		const { name, pagesContent, paymentId, isActive } = await req.json();

		if (!name || !pagesContent || !paymentId) {
			return new Response(
				JSON.stringify({ error: "Required fields missing" }),
				{ status: 400 }
			);
		}

		const pageData = new Pages({ name, pagesContent, paymentId, isActive });
		await pageData.save();

		return new Response(
			JSON.stringify({ message: "Page created successfully" }),
			{
				status: 201,
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: "Internal server error",
				details: error.message,
			}),
			{ status: 500 }
		);
	}
}*/

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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
	callbacks: {
		async signIn({ account }) {
			// Ensure only Gmail accounts can log in
			const emailDomain = account?.email?.split("@")[1];
			return emailDomain === "gmail.com";
		},
		async redirect({ url, baseUrl }) {
			return baseUrl; // Redirect to the homepage after login
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
