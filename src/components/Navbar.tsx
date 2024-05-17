"use client";
import Link from "next/link";
import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from "flowbite-react";
import { styles, brand, navItems } from "@/data/nav";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function WebNavBar() {
	const [pathName, setPathName] = useState("");
	const path = usePathname();

	useEffect(() => {
		console.log(path);
		setPathName(path);
	}, [path]);

	return (
		<Navbar className={`fixed top-0 w-full bg-secondary z-30 p-0 ${styles.bg}`}>
			<NavbarBrand as={Link} href={brand.href}>
				{/*<img
					src="/favicon.svg"
					className="mr-3 h-6 sm:h-9"
					alt="Flowbite React Logo"
    />*/}

				<span
					className={`self-center whitespace-nowrap text-xl font-semibold text-primary ${styles.text}`}
				>
					{brand.name}
				</span>
			</NavbarBrand>
			<NavbarToggle />
			<NavbarCollapse className="[&>ul>li]:!ml-0">
				{navItems &&
					navItems.map((item, index) => (
						<NavbarLink
							as={Link}
							key={`nav_item_${index}`}
							href={item.href}
							className={`${styles.text} !p-4  uppercase ${
								pathName == item.href && "bg-secondary text-primary"
							}`}
						>
							{item.name}
						</NavbarLink>
					))}
			</NavbarCollapse>
		</Navbar>
	);
}

export default WebNavBar;
