"use client";

import { Drawer } from "flowbite-react";
import { useEffect, useState } from "react";

function DrawerBasic({
	className,
	openDrawer,
	setOpenDrawer,
	children,
	requireConfirmation,
	title = "",
	position = "right",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => {
		if (requireConfirmation && confirm("Are you sure you")) {
			setIsOpen(false);
			setOpenDrawer(false);
		} else if (!requireConfirmation) {
			setIsOpen(false);
			setOpenDrawer(false);
		}
	};

	useEffect(() => {
		if (openDrawer != isOpen) {
			setIsOpen(openDrawer);
		}
	}, [openDrawer]);

	return (
		<>
			<Drawer
				className={`${
					isOpen && "shadow-black"
				} bg-gray-900 h-[100vh] ${className}`}
				open={isOpen}
				onClose={handleClose}
				position={position}
			>
				<Drawer.Header className="uppercase mb-0" title={title} />
				<Drawer.Items>{children}</Drawer.Items>
			</Drawer>
		</>
	);
}

export default DrawerBasic;
