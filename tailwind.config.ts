import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		flowbite.content(),
	],
	theme: {
		extend: {
			height: {
				screen: "100svh",
			},
			backgroundImage: {
				paperBg: "url(/images/bg/paper_bg.jpg)",
				leatherBg: "url(/images/bg/leather_bg.png)",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#0a0a0a",
				secondary: "#fff",
				third: "#10B981",
			},
		},
	},
	plugins: [
		flowbite.plugin(),
		function ({ addVariant }: { addVariant: Function }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		},
	],
};
export default config;
