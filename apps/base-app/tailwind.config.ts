import type { Config } from "tailwindcss";
import baseConfig from "../../tailwind.config";

const config: Config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"../../packages/*/src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	presets: [baseConfig],
};

export default config;
