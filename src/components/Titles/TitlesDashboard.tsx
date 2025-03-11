import { ReactNode } from "react";

function TitleXl({ children }: { children: ReactNode }) {
	return (
		<div className="w-full text-secondary text-2xl font-bold uppercase">
			<div>{children}</div>
		</div>
	);
}

function TitleLg({ children }: { children: ReactNode }) {
	return (
		<div className="w-full text-center text-lg uppercase text-secondary font-bold">
			<div>{children}</div>
		</div>
	);
}

export { TitleXl, TitleLg };
