import { Label } from "flowbite-react";

function FormLabel({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children && (
				<div className="mb-1">
					<Label className="text-secondary uppercase">{children}</Label>
				</div>
			)}
		</>
	);
}

export default FormLabel;
