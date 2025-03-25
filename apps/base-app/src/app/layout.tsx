import type { Metadata } from "next";
import "./globals.css";
import { metaData } from "@/data/general";
import { AuthProvider } from "@base/auth";

export const metadata: Metadata = metaData;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={``}>
				<AuthProvider> {children}</AuthProvider>
			</body>
		</html>
	);
}
