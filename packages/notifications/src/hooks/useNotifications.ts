import { useContext } from "react";
import { NotificationContext } from "../providers/NotificationContextProvider";

const useNotifications = () => {
	const context = useContext(NotificationContext);

	const { showNotification, dismissNotification } = context;
	return { showNotification, dismissNotification };
};

export { useNotifications };
