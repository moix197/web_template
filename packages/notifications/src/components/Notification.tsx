"use client";

import { Toast } from "flowbite-react";
import { HiCheck, HiInformationCircle } from "react-icons/hi";
import { useContext } from "react";
import { NotificationContext } from "../providers/NotificationContextProvider";

//prettier-ignore
const theme = {
	"root": {
	  "base": "flex w-full max-w-xs items-center rounded-lg bg-primary p-4 text-gray-500 shadow dark:bg-gray-900 dark:text-white",
	  "closed": "opacity-0 ease-out"
	},
	"toggle": {
	  "base": "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-primary p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
	  "icon": "h-5 w-5 shrink-0"
	}
  }

function Notification() {
	const { notifications, dismissNotification } =
		useContext(NotificationContext);

	return (
		<div className="fixed flex flex-col bottom-4 right-4 z-50">
			{notifications
				.filter((notification: any) => notification.visible) // Only show visible notifications
				.map((notification: any) => (
					<Toast
						theme={theme}
						key={notification.id}
						className={`shadow-xl min-w-[350px] border ${
							notification.type == "error" ? "border-error" : "border-success"
						}  flex mb-2 transition-all duration-300 ease-in-out transform ${
							notification.visible
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						<div
							className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
								notification.type == "error"
									? "!bg-error !text-errorStrong"
									: "!bg-success !text-successStrong"
							} mr-3`}
						>
							{notification.type === "error" && (
								<HiInformationCircle className="font-bold text-primary" />
							)}
							{notification.type === "success" && (
								<HiCheck className="font-bold text-primary" />
							)}
						</div>
						<div className="ml-3 text-md font-normal">
							{notification.title && (
								<div
									className={`text-md font-bold uppercase ${
										notification.type == "error"
											? "text-errorStrong"
											: "!text-successStrong"
									}`}
								>
									<span>{notification.title}</span>
								</div>
							)}
							{notification.message}
						</div>
						<button
							type="button"
							className="cursor-pointer absolute right-2 top-1 rounded-lg p-1.5 text-error font-bold hover:text-gray-900"
							onClick={() => dismissNotification(notification.id)}
						>
							✕
						</button>
					</Toast>
				))}
		</div>
	);
}

export { Notification };
