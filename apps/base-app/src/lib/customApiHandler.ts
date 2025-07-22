// lib/apiHandlerWithSetup.ts
import { setupAllModules } from "@/config/setupAllModules";
import { apiHandler } from "@moix197/next-ui";

type HandlerFunction = (req: Request) => Promise<any>;

interface Handlers {
	GET?: HandlerFunction;
	POST?: HandlerFunction;
	PUT?: HandlerFunction;
	DELETE?: HandlerFunction;
}

function customApiHandler(handlers: Handlers) {
	// Run setup just once per Lambda / cold start
	setupAllModules();

	// Return the original handler
	return apiHandler(handlers);
}

export { customApiHandler };
