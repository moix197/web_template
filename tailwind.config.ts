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
				hero: "url(/images/bg/hero.jpg)",
				bg1: "url(/images/bg/bg1.jpg)",
				bg2: "url(/images/bg/bg2.jpg)",
				bg3: "url(/images/bg/bg3.jpg)",
				bg4: "url(/images/bg/bg4.jpg)",
				bg5: "url(/images/bg/bg5.jpg)",
				bg6: "url(/images/bg/bg6.jpg)",
				bg7: "url(/images/bg/bg7.jpg)",
				bg8: "url(/images/bg/bg8.jpg)",
				bg9: "url(/images/bg/bg9.jpg)",
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
