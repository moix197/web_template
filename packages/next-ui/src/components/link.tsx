import React from "react";
import { default as NextLink } from "next/link";

function Link({
	href,
	children,
	className,
}: {
	href: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<NextLink href={href} className={className}>
			{children}
		</NextLink>
	);
}

export { Link };
