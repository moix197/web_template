import { SectionWithContent } from "./SectionWithContent";

interface Props {
	children?: React.ReactNode;
	title?: string;

	contentText?: string;
	className?: string;
	titleAlign?: string;
	textAlign?: string;
	position?: string;
	dividers?: {} | null;
	button?:
		| {
				text?: string;
				position?: string;
				href: string;
				className?: string;
				color?: string;
				onClick?: () => void;
		  }
		| undefined;
}

const Hero = ({
	title,
	contentText,
	children,
	className,
	titleAlign,
	textAlign,
	position,
	button,
	dividers,
}: Props) => {
	return (
		<SectionWithContent
			className={`min-h-[calc(50vh-45px)] md:min-h-[calc(50vh-52px)] items-center bg-hero bg-no-repeat bg-cover bg-center ${className} mt-[45px] md:mt-[52px]`}
			textAlign={textAlign}
			position={position}
			dividers={dividers}
			contentText={contentText}
			useImageSmoother
			button={button}
		>
			<div
				className={`text-5xl font-bold mb-6 z-20 z-20 relative ${titleAlign}`}
			>
				<h1>{title}</h1>
			</div>
		</SectionWithContent>
	);
};

export { Hero };
