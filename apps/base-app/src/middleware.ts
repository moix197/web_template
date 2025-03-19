export { default } from "@base/auth/src/middleware";

export const config = { matcher: ["/dashboard/:path*"] };
/*
import authMiddleware, {
	config as authConfig,
} from "@base/auth/src/middleware";

export default authMiddleware;
export const config = authConfig;

*/
