/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: [
		"@moix197/auth",
		"@moix197/base-ui",
		"@moix197/dashboard",
		"@moix197/db",
		"@moix197/file_explorer",
		"@moix197/forms",
		"@moix197/next-ui",
		"@moix197/notifications",
		"@moix197/validation",
	],
	images: {
		domains: ["rojdgmekxxsgaheyuzhz.supabase.co"],
	},
};

export default nextConfig;
