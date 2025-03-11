import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WebNavBar from "./components/Navbar";
import WebFooter from "./components/sections/WebFooter";
import "./globals.css";
import { brand, navItems } from "./data/nav";
import { legal, socials, metaData } from "@/data/general";
import FooterCompact from "./components/sections/FooterCompact";
import Providers from "../app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = metaData;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={``}>
				{/*<WebNavBar></WebNavBar>*/}
				<Providers>{children}</Providers>
				{/*<FooterCompact
					brand={brand}
					legal={legal}
					socials={socials}
					items={navItems}
				></FooterCompact>*/}
			</body>
		</html>
	);
}

/*
<WebFooter
					colorSchema="primary"
					brand={brand}
					legal={legal}
					items={
						[
							/*
						{
							title: "Footer Item 1",
							children: [
								{ name: "item1", href: "#" },
								{ name: "item1-2", href: "#" },
							],
						},
						{
							title: "Footer Item 2",
							children: [
								{ name: "item2", href: "#" },
								{ name: "item2-2", href: "#" },
							],
						},
					*/
/*]
			}
			socials={socials}
		></WebFooter>
*/
