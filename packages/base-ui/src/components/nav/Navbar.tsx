"use client";
import Link from "next/link";
import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function WebNavBar({ navItems = [], brand = {} }) {
	const [pathName, setPathName] = useState("");
	const path = usePathname();

	useEffect(() => {
		setPathName(path);
	}, [path]);

	return (
		<Navbar className={`fixed top-0 w-full bg-secondary z-30 p-0`}>
			<NavbarBrand as={Link} href={brand.href}>
				{/*<img
					src="/favicon.svg"
					className="mr-3 h-6 sm:h-9"
					alt="Flowbite React Logo"
    />*/}

				<span
					className={`self-center whitespace-nowrap text-xl font-semibold text-primary `}
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
							className={` !p-4  uppercase ${
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

export { WebNavBar };
