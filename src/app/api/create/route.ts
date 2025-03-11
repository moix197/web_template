import { apiHandler } from "@/utils/api/handler";
import { insertDocument } from "@/utils/db/crud";
import paymentMethodsFormValues from "@/data/config/paymentMethods";
import packagesFormValues from "@/data/config/packages";
import booksFormValues from "@/data/config/books";
import { basicModels } from "@/data/models/models";

async function create(req: Request): Promise<any> {
	try {
		const defaultValues = {
			paymentMethodsFormValues,
			packagesFormValues,
			booksFormValues,
		};

		const body = await req.json();

		const postData = {
			...body.data,
			//...defaultValues[`${body.category}FormValues`]["defaultValues"],
		};

		const insertItem = await insertDocument(
			basicModels[body.category],
			postData
		);

		if (!insertItem) {
			throw new Error("Failed to create the item.");
		}

		return {
			err: false,
			message: `New ${body.category} item created successfully`,
			value: insertItem,
		};
	} catch (error) {
		console.log("error", error);
		return {
			err: true,
			message: error.message
				? error.message
				: "An error occurred, please try again later",
			error: error,
		};
	}
}

export const POST = apiHandler({ POST: create });
