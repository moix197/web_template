"use client";
import { useSession } from "next-auth/react";
import { createContext, useState, useEffect, ReactNode } from "react";

const UserSessionDataContext = createContext<any>(null);

export default function UserSessionDataContainer({
	children,
}: {
	children: ReactNode;
}) {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (status === "loading") {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status]);

	return (
		<UserSessionDataContext.Provider value={{ session, isLoading }}>
			{children}
		</UserSessionDataContext.Provider>
	);
}

export { UserSessionDataContainer, UserSessionDataContext };
