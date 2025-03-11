import ImageSmoother from "../ImageSmoother";
import SectionDivider from "../dividers/SectionDivider";

interface Props {
	children: React.ReactNode;
	className?: string | undefined;
	useImageSmoother?: boolean;
	dividers?: {
		top?: {
			type?: string;
			className?: string | undefined;
		};
		bottom?: {
			type?: string;
			className?: string | undefined;
		};
	} | null;
}

const SectionLayout = ({
	children,
	className = "",
	useImageSmoother = false,
	dividers = null,
}: Props) => {
	return (
		<section
			className={`py-28 px-5 sm:px-5 md:px-10 flex bg-no-repeat bg-center bg-cover justify-center ${className} relative bg-primary`}
		>
			{dividers?.top?.type && (
				<SectionDivider
					type={dividers?.top?.type}
					className={dividers?.top?.className}
				></SectionDivider>
			)}
			{dividers?.bottom?.type && (
				<SectionDivider
					className={dividers?.bottom?.className}
					type={dividers?.bottom?.type}
					position="bottom"
				></SectionDivider>
			)}
			{useImageSmoother && <ImageSmoother></ImageSmoother>}
			{children}
		</section>
	);
};

export default SectionLayout;
