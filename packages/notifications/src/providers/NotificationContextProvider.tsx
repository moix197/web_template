import { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of each notification
interface Notification {
	id: number;
	err?: boolean;
	title: string;
	message: string;
	visible: boolean;
	type: string;
	autoHideDuration: number;
}

const NotificationContext = createContext<any>(null);

export default function NotificationContainer({
	children,
}: {
	children: ReactNode;
}) {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [notificationId, setNotificationId] = useState(0);

	// Function to show a new notification
	const showNotification = (result: Notification) => {
		const { err, title, message, type, autoHideDuration = 5000 } = result;
		const id = notificationId + 1;
		setNotificationId(id);

		const newNotification: Notification = {
			id,
			title: title ? title : err ? "error" : "success",
			message,
			type: type ? type : err ? "error" : "success",
			visible: true,
			autoHideDuration,
		};

		setNotifications((prevNotifications) => [
			...prevNotifications,
			newNotification,
		]);

		// Start auto-hide timer for this notification
		setTimeout(() => {
			setNotifications((prevNotifications) =>
				prevNotifications.map((notification) =>
					notification.id === id
						? { ...notification, visible: false }
						: notification
				)
			);
		}, autoHideDuration);
	};

	// Function to dismiss a notification manually
	const dismissNotification = (id: number) => {
		setNotifications((prevNotifications) =>
			prevNotifications.map((notification) =>
				notification.id === id
					? { ...notification, visible: false }
					: notification
			)
		);
	};

	return (
		<NotificationContext.Provider
			value={{ notifications, showNotification, dismissNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
}

export { NotificationContainer, NotificationContext };

//export { NotificationContainer, NotificationContext };
