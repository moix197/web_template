interface Props {
	position?: string;
	className?: string;
	type?: string;
}

const SectionDivider = ({
	position = "top",
	className = "",
	type = "tilt",
}: Props) => {
	const dividerType: {
		[key: string]: string;
		tilt: string;
		wave: string;
		curve: string;
		triangle: string;
		arrow: string;
		split: string;
		book: string;
	} = {
		tilt: "M1200 120L0 16.48 0 0 1200 0 1200 120z",
		wave: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
		curve: "M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z",
		triangle: "M1200 0L0 0 598.97 114.72 1200 0z",
		arrow: "M649.97 0L550.03 0 599.91 54.12 649.97 0z",
		split:
			"M0,0V3.6H580.08c11,0,19.92,5.09,19.92,13.2,0-8.14,8.88-13.2,19.92-13.2H1200V0Z",
		book: "M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z",
	};

	return (
		<div
			className={`custom-shape-divider-top-1715822498 z-20 absolute top-0 left-0 w-full overflow-hidden ${
				position == "bottom" ? "!top-[auto] bottom-0 rotate-180 " : ""
			}`}
		>
			<div className={`w-[200%] md:w-full`}>
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path d={dividerType[type]} className={`${className}`}></path>
				</svg>
			</div>
		</div>
	);
};

export { SectionDivider };
