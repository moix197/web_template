"use client";

import React from "react";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useEffect, useState } from "react";

//prettier-ignore
const theme = {
	"root": {
	  "base": "fixed z-40 overflow-y-auto bg-white p-4 transition-transform !bg-primary dark:bg-gray-800",
	  "backdrop": "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
	  "edge": "bottom-16",
	  "position": {
		"top": {
		  "on": "left-0 right-0 top-0 w-full transform-none",
		  "off": "left-0 right-0 top-0 w-full -translate-y-full"
		},
		"right": {
		  "on": "right-0 top-0 h-screen w-80 transform-none",
		  "off": "right-0 top-0 h-screen w-80 translate-x-full"
		},
		"bottom": {
		  "on": "bottom-0 left-0 right-0 w-full transform-none",
		  "off": "bottom-0 left-0 right-0 w-full translate-y-full"
		},
		"left": {
		  "on": "left-0 top-0 h-screen w-80 transform-none",
		  "off": "left-0 top-0 h-screen w-80 -translate-x-full"
		}
	  }
	},
	"header": {
	  "inner": {
		"closeButton": "cursor-pointer absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
		"closeIcon": "h-8 w-8" ,
		"titleIcon": "me-2.5 h-4 w-4",
		"titleText": "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
	  },
	  "collapsed": {
		"on": "hidden",
		"off": "block"
	  }
	},
	"items": {
	  "base": ""
	}
  }

interface DrawerBasicProps {
	className?: string;
	openDrawer: boolean;
	setOpenDrawer: (open: boolean) => void;
	children: React.ReactNode;
	requireConfirmation?: boolean;
	title?: string;
	position?: "right" | "top" | "bottom" | "left";
}

function DrawerBasic({
	className,
	openDrawer,
	setOpenDrawer,
	children,
	requireConfirmation = false,
	title = "",
	position = "right",
}: DrawerBasicProps) {
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
		console.log("openDrawer", openDrawer);
		if (openDrawer != isOpen) {
			setIsOpen(openDrawer);
		}
	}, [openDrawer]);

	return (
		<>
			<Drawer
				theme={theme}
				className={`${
					isOpen ? "shadow-black" : ""
				} bg-gray-900 h-[100vh] ${className}`}
				open={isOpen}
				onClose={handleClose}
				position={position}
			>
				<DrawerHeader className="uppercase mb-0" title={title} />
				<DrawerItems>{children}</DrawerItems>
			</Drawer>
		</>
	);
}

export { DrawerBasic };
