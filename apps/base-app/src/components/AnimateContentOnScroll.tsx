import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useEffect } from "react";

export default function AnimateContentOnScroll({
	children = <div></div>,
	contentid = "",
	vertical = false,
	fromRight = null,
	scrub = 1,
	extraClass = "",
	innerClass = null,
	pin = null,
	start = "center bottom",
	end = "+=450",
	autoAlpha = 0,
	x = -100,
}) {
	useEffect(() => {
		//gsap.registerPlugin(ScrollTrigger);
	}, []);
	//const container = useRef();
	const container = useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			// gsap code here...

			gsap.from(typeof pin == "string" ? pin : "#" + contentid, {
				scrollTrigger: {
					trigger: "#" + contentid + "_parent",
					scrub: !scrub ? false : scrub,
					start,
					end,
					pin: pin,
				},
				x: fromRight ? 100 : vertical ? "auto" : x,
				y: vertical ? 100 : "auto",
				autoAlpha,
				duration: 1,
			});
		},
		{ scope: container }
	);

	return (
		<div ref={container} className={extraClass}>
			<div id={`${contentid}_parent`} className={`w-full h-full ${innerClass}`}>
				<div id={contentid} className={`w-full h-full ${innerClass}`}>
					{children && children}
				</div>
			</div>
		</div>
	);
}
