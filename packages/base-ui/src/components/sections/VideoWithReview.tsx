"use client";
import { FaCirclePlay } from "react-icons/fa6";
import { ImageSmoother } from "../images/ImageSmoother";
import { useState } from "react";

interface Props {
	className?: string | undefined;
	title?: string | undefined;
	text?: string | undefined;
	href?: string | undefined;
}

const VideoWithReview = ({ className, title, text, href }: Props) => {
	const [showVideo, setShowVideo] = useState(false);
	function runVideo() {
		if (showVideo) return;
		setShowVideo(true);
	}

	return (
		<section
			className={`relative flex justify-center py-16 bg-primary text-secondary ${className}`}
		>
			<div className="relative w-full max-w-screen-2xl">
				<div className="bg-bg2 bg-cover">
					<div className="relative">
						<div
							onClick={() => {
								runVideo();
							}}
							className={`absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer ${
								showVideo ? "z-0" : "z-10"
							}`}
						>
							<ImageSmoother className="opacity-40"></ImageSmoother>
							<FaCirclePlay className="w-16 h-16 md:w-48 md:h-48 z-10 hover:scale-110 transition-all"></FaCirclePlay>
						</div>
						<div className="flex relative pb-[42.55%] pt-0 h-0 justify-center items-center">
							{showVideo && (
								<iframe
									className="absolute top-0 left-0 w-full h-full"
									allowFullScreen
									src={href}
								></iframe>
							)}
						</div>
					</div>
				</div>
				<div
					className={`lg:absolute lg:bottom-16 lg:right-6 lg:max-w-[400px] p-4 pointer-events-none ${
						showVideo && "lg:hidden"
					}`}
				>
					<div className="hidden lg:block absolute w-full h-full left-0 top-0 bg-primary opacity-80 rounded-lg z-10"></div>
					<div className="relative z-20">
						{text && (
							<div className="text-center lg:text-left lg:text-sm mb-4">
								<p>{text}</p>
							</div>
						)}
						{title && (
							<div className="text-right text-lg lg:text-right uppercase">
								<h5>{title}</h5>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export { VideoWithReview };
