import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect();

	if (req.method === "POST") {
		try {
			const { name, isActive, pagesContent } = req.body;

			// Create a new document in the "Page" collection
			const page = await Page.create({ name, isActive, pagesContent });

			res
				.status(201)
				.json({ message: "Page data saved successfully!", data: page });
		} catch (error) {
			console.error("Error saving page data:", error);
			res.status(500).json({ error: "Failed to save page data" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
