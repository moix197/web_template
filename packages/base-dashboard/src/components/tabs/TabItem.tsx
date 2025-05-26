import { TabItem as FlowbiteTabItem, TabItemProps } from "flowbite-react";
import { ReactNode } from "react";

export interface CustomTabItemProps extends TabItemProps {
	children: ReactNode;
	className?: string;
}

export const TabItem = ({
	children,
	className = "",
	...props
}: CustomTabItemProps) => {
	return (
		<FlowbiteTabItem className={className} {...props}>
			{children}
		</FlowbiteTabItem>
	);
};
