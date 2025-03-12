"use client";

import { SolidButton } from "../../buttons/Buttons";
import { DashboardDataContext } from "../../../contexts/DashboardDataContextProvider";
import { UserSessionDataContext } from "../../../contexts/UserSessionContextProvider";
import { Avatar, Sidebar } from "flowbite-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

//prettier-ignore
const theme = {
    "root": {
      "base": "!h-full w-3/4 md:w-full ",
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

function SideNav() {
	const [isOpen, setIsOpen] = useState(false);
	const { config } = useContext(DashboardDataContext);
	const { session } = useContext(UserSessionDataContext);

	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			className={`fixed z-40 h-full w-full md:w-[250px]  ${
				!isOpen && "-translate-x-full"
			} md:translate-x-0 transition-transform duration-500`}
		>
			<SolidButton
				onClick={() => setIsOpen(!isOpen)}
				className={`child:p-0 md:hidden rotate-0 right-4 ${
					!isOpen && "rotate-180 -right-16"
				}  transition-all duration-500 absolute bottom-4 z-50  w-auto p-3 rounded-full !bg-gray-700  w-auto h-auto`}
			>
				<IoIosArrowBack className="w-8 h-8 !p-0" />
			</SolidButton>
			<Sidebar theme={theme} aria-label="Sidebar with logo branding example">
				<Sidebar.Logo href="#" img="/favicon.svg" imgAlt="SystemLogo">
					<div>System</div>
				</Sidebar.Logo>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item as={Link} href="/dashboard">
							Home
						</Sidebar.Item>

						{Object.entries(config).map(([key, value]) => {
							if (value.data.hideFromNav) return null;
							return (
								<Sidebar.Item as={Link} href={`/dashboard/${key}`} key={key}>
									{value.data.pluralName || key}
								</Sidebar.Item>
							);
						})}
					</Sidebar.ItemGroup>
				</Sidebar.Items>
				<div className="flex-auto gap-4 flex-grow flex flex-col justify-end">
					<div className="flex gap-2 uppercase">
						<div>
							<Avatar rounded img={session?.user?.image}></Avatar>
						</div>
						<div>
							<div className="text-sm font-medium">
								{session?.user?.name.split(" ")[0]}
							</div>
							<div className="text-xs font-thin">{session?.user?.role}</div>
						</div>
					</div>
					<div className="w-full">
						<SolidButton
							onClick={() => {
								signOut({ callbackUrl: "/" });
							}}
						>
							Log out
						</SolidButton>
					</div>
				</div>
			</Sidebar>
		</div>
	);
}

export default SideNav;
