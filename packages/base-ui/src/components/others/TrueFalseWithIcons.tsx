import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

function TrueFalseWithIcons({ value = false }) {
	return (
		<div>
			{value ? (
				<FaCheckCircle className="w-6 h-6 text-green-500"></FaCheckCircle>
			) : (
				<FaCircleXmark className="w-6 h-6 text-red-500"></FaCircleXmark>
			)}
		</div>
	);
}

export { TrueFalseWithIcons };
