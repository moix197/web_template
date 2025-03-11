import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContextProvider";

const useNotifications = () => {
	const context = useContext(NotificationContext);

	const { showNotification, dismissNotification } = context;
	return { showNotification, dismissNotification };
};

export default useNotifications;
