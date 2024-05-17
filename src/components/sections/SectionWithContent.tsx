import { SolidButton } from "@/components/buttons/Buttons";
import TitleSection from "@/components/Titles/TitleSection";
import SectionLayout from "./SectionLayout";

interface Props {
	children?: React.ReactNode;
	className?: string | undefined;
	useImageSmoother?: boolean;
	position?: string;
	textAlign?: string;
	titleAlign?: string;
	titleText?: string;
	contentText?: string;
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

const SectionWithContent = ({
	children,
	className = "",
	useImageSmoother = false,
	position = "center",
	textAlign = "center",
	titleAlign = "center",
	titleText = "",
	contentText = "",
	dividers = null,
	button = {
		text: "",
		position: "center",
		href: "",
		className: "",
		color: "",
		onClick: undefined,
	},
}: Props) => {
	function getPositionStyles(value: string) {
		switch (value) {
			case "left":
				return "sm:items-start";

			case "right":
				return "sm:items-end";

			default:
				return "sm:items-center";
		}
	}

	return (
		<SectionLayout
			className={className}
			dividers={dividers}
			useImageSmoother={useImageSmoother}
		>
			<div
				className={`w-full max-w-screen-2xl flex flex-col items-center ${getPositionStyles(
					position
				)}`}
			>
				{children && children}
				{(titleText || contentText || button?.text) && (
					<div className={`max-w-lg z-20`}>
						{titleText && (
							<div className={`z-20 relative mb-6 items-center ${titleAlign}`}>
								<TitleSection>{titleText}</TitleSection>
							</div>
						)}
						{contentText && (
							<div className={`${textAlign} text-xl`}>
								<p>{contentText}</p>
							</div>
						)}
						{button?.text && (
							<div
								className={`relative w-full mt-8 flex z-20 ${button?.position}`}
							>
								<SolidButton
									href={button?.href}
									className={button?.className}
									color={button?.color}
									onClick={button.onClick}
								>
									{button.text}
								</SolidButton>
							</div>
						)}
					</div>
				)}
			</div>
		</SectionLayout>
	);
};

export default SectionWithContent;
