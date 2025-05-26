// filepath: /path/to/handler.ts
import { NextResponse } from "next/server";

type HandlerFunction = (req: Request) => Promise<any>;

interface Handlers {
	GET?: HandlerFunction;
	POST?: HandlerFunction;
	PUT?: HandlerFunction;
	DELETE?: HandlerFunction;
}

function apiHandler(handlers: Handlers) {
	return async function (req: Request) {
		const method = req.method as keyof Handlers;

		if (!handlers[method]) {
			return NextResponse.json(
				{
					err: true,
					message: "Method Not Allowed",
					error: new Error("Method Not Allowed"),
				},
				{ status: 405 }
			);
		}

		try {
			const result = await handlers[method]!(req);
			return NextResponse.json({
				err: false,
				...result,
			});
		} catch (error) {
			const err = error as Error;
			return NextResponse.json(
				{
					err: true,
					message: err.message
						? err.message
						: "An error occurred, please try again later",
					error: err,
				},
				{ status: 500 }
			);
		}
	};
}

export { apiHandler };
