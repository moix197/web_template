import type { Config } from "tailwindcss";
import baseConfig from "../../tailwind.config";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	presets: [baseConfig],
};

export default config;
