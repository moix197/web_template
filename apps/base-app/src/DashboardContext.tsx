import { NotificationContainer } from "@moix197/notifications";
import { UserSessionDataContainer } from "@moix197/auth";
import { DashboardDataContainer } from "@moix197/dashboard";

import paymentsMethodsConfig from "@/data/config/paymentMethods";
import booksConfig from "@/data/config/books";
import transactionsConfig from "@/data/config/transactions";
import usersConfig from "@/data/config/users";
import packagesConfig from "@/data/config/packages";
import paymentsConfig from "@/data/config/payments";

const dashboardConfig = {
	categories: [
		{
			name: "paymentMethods",
			config: paymentsMethodsConfig,
		},
		{
			name: "books",
			config: booksConfig,
		},
		{
			name: "transactions",
			config: transactionsConfig,
		},
		{
			name: "users",
			config: usersConfig,
		},
		{
			name: "packages",
			config: packagesConfig,
		},
		{
			name: "payments",
			config: paymentsConfig,
		},
		// Add more categories as needed
	],
	apiEndpoints: {
		getData: "/api/getData",
	},
};

function DashboardContext({ children }: { children: React.ReactNode }) {
	return (
		<NotificationContainer>
			<UserSessionDataContainer>
				<DashboardDataContainer config={dashboardConfig}>
					{children}
				</DashboardDataContainer>
			</UserSessionDataContainer>
		</NotificationContainer>
	);
}
export { DashboardContext };
