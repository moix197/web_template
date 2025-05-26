import { TabStyles as FlowbiteTabStyles } from "flowbite-react";

export type CustomTabStyles =
	| "default"
	| "fullWidth"
	| "pills"
	| "underline"
	| "fullWidthSmall"
	| "hiddenHeader";

declare module "flowbite-react" {
	interface TabStyles extends FlowbiteTabStyles {
		fullWidthSmall: string;
		hiddenHeader: string;
	}

	interface TabsProps {
		variant?: CustomTabStyles;
	}
}
