import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./packages/**/*.{js,ts,jsx,tsx}",
		".flowbite-react\\class-list.json",
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
				primary: "#111827",
				secondary: "#fff",
				third: "#1D4ED8",
				thirdDark: "#1E3A8A",
				errorStrong: "#B91C1C",
				success: "#A7F3D0",
				successStrong: "#064E3B",
			},
			boxShadow: {
				black: "0px -1px 20px 10px rgba(0,0,0,1)",
				third: "0px -1px 12px -4px rgba(10,133,92,1)",
				red: "0px -1px 12px -4px rgba(248,113,113,1)",
			},
		},
	},
	plugins: [
		function ({ addVariant }: { addVariant: Function }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		},
	],
};
export default config;
