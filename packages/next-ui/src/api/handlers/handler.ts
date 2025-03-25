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
				{ error: "Method Not Allowed" },
				{ status: 405 }
			);
		}

		try {
			const result = await handlers[method]!(req);
			return NextResponse.json(result);
		} catch (error) {
			if (error instanceof Error) {
				return NextResponse.json({ error: error.message }, { status: 500 });
			} else {
				return NextResponse.json({ error: "Unknown error" }, { status: 500 });
			}
		}
	};
}

export { apiHandler };
