"use client";

import { SolidButton } from "../buttons/GeneralButtons";
import {
	Sidebar,
	SidebarLogo,
	SidebarItems,
	SidebarItemGroup,
	SidebarItem,
	Avatar,
} from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { LogOutButton } from "@moix197/auth";

//prettier-ignore
const theme = {
    "root": {
      "base": "h-full w-full",
      "collapsed": {
        "on": "",
        "off": ""
      },
      "inner": "flex flex-col h-full w-full bg-gray-800 overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-gray-800"
    },
    "collapse": {
      "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      "icon": {
        "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        "open": {
          "off": "",
          "on": "text-gray-900"
        }
      },
      "label": {
        "base": "ml-3 flex-1 whitespace-nowrap text-left",
        "icon": {
          "base": "h-6 w-6 transition delay-0 ease-in-out",
          "open": {
            "on": "rotate-180",
            "off": ""
          }
        }
      },
      "list": "space-y-2 py-2"
    },
    "cta": {
      "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700 justify-self-end",
      "color": {
        "blue": "bg-cyan-50 dark:bg-cyan-900",
        "dark": "bg-dark-50 dark:bg-dark-900",
        "failure": "bg-red-50 dark:bg-red-900",
        "gray": "bg-alternative-50 dark:bg-alternative-900",
        "green": "bg-green-50 dark:bg-green-900",
        "light": "bg-light-50 dark:bg-light-900",
        "red": "bg-red-50 dark:bg-red-900",
        "purple": "bg-purple-50 dark:bg-purple-900",
        "success": "bg-green-50 dark:bg-green-900",
        "yellow": "bg-yellow-50 dark:bg-yellow-900",
        "warning": "bg-yellow-50 dark:bg-yellow-900"
      }
    },
    "item": {
      "base": "flex  uppercase items-center justify-center rounded-lg p-2 text-base font-medium text-secondary hover:bg-gray-900 dark:text-white dark:hover:bg-gray-700",
      "active": "bg-gray-400 dark:bg-gray-700",
      "collapsed": {
        "insideCollapse": "group w-full pl-8 transition duration-75",
        "noIcon": "font-bold"
      },
      "content": {
        "base": "flex-1 whitespace-nowrap px-3"
      },
      "icon": {
        "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        "active": "text-gray-700 dark:text-gray-100"
      },
      "label": "",
      "listItem": ""
    },
    "items": {
      "base": ""
    },
    "itemGroup": {
      "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
    },
    "logo": {
      "base": "mb-5 flex items-center pl-2.5",
      "collapsed": {
        "on": "hidden",
        "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      },
      "img": "mr-3 h-6 sm:h-7"
    }
  }

type NavItem = {
	href: string;
	label: string;
};

type SideNavProps = {
	navItems: NavItem[];
	title?: string;
	user?: {
		name: string;
		role: string;
		image: string;
	};
	logo?: {
		src: string;
		alt: string;
	};
};

function SideNav({
	navItems = [],
	user,
	title = "",
	logo = { src: "", alt: "" },
	className = "",
}: SideNavProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<SolidButton
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden fixed bottom-4 right-4 z-50 w-auto p-3 rounded-full"
			>
				<IoIosArrowBack
					className={`w-8 h-8 !p-0 transition-transform duration-500 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</SolidButton>

			<Sidebar
				theme={theme}
				aria-label="Sidebar with logo branding example"
				className={`h-full fixed top-0 left-0 z-20 w-64 bg-gray-50 transition-transform transition-duration-300 dark:bg-gray-800 overflow-y-auto overflow-x-hidden rounded  ${className} ${
					!isOpen ? "-translate-x-full md:translate-x-0" : ""
				}`}
			>
				{logo?.src && (
					<SidebarLogo href="#" img={logo.src} imgAlt={logo.alt}>
						{title && <div>{title}</div>}
					</SidebarLogo>
				)}
				<SidebarItems>
					<SidebarItemGroup>
						{navItems.map((item, index) =>
							item?.href ? (
								<SidebarItem
									as={Link}
									href={item.href}
									key={`nav-item-${index}`}
								>
									{item.label}
								</SidebarItem>
							) : (
								<SidebarItem
									className="!cursor-pointer"
									onClick={() => item?.onClick()}
									key={`nav-item-${index}`}
								>
									{item.label}
								</SidebarItem>
							)
						)}
					</SidebarItemGroup>
				</SidebarItems>
				{user && (
					<div className="flex-auto gap-4 flex-grow flex flex-col justify-end">
						<div className="flex gap-2 uppercase">
							<div>
								<Avatar rounded img={user.image}></Avatar>
							</div>
							<div>
								<div className="text-sm font-medium">
									{user.name.split(" ")[0]}
								</div>
								<div className="text-xs font-thin">{user.role}</div>
							</div>
						</div>
						<div className="w-full">
							<LogOutButton></LogOutButton>
						</div>
					</div>
				)}
			</Sidebar>
		</>
	);
}

export { SideNav };
