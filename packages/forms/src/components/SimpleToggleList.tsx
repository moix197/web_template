import { useEffect, useState } from "react";
import { SimpleToggle } from "@moix197/forms";
import { TitleLg } from "@moix197/base-ui";
import { SectionBorder } from "@moix197/base-ui";
import { useDashboardData } from "@moix197/dashboard";

function SimpleToggleList({
	title = "",
	categoryName = "",
	cb = null,
	existingValues = [],
	valueToUpdate = "",
	className,
}) {
	const [availableValues, setAvailableValues] = useState([]);
	const [updatedValue, setUpdatedValue] = useState([]);

	useDashboardData(categoryName, setAvailableValues, null, null);

	useEffect(() => {
		// Set the updatedValue only when existingValues change
		setUpdatedValue(existingValues);
	}, [existingValues]);

	const handleToggleChange = async (item, val) => {
		const newVal = val
			? [...updatedValue, item[valueToUpdate]]
			: updatedValue.filter((i) => i !== item[valueToUpdate]);

		setUpdatedValue(newVal);

		// Avoid triggering `cb` if it's causing unnecessary state changes
		if (cb) {
			let tempObj = {};
			tempObj[categoryName] = newVal;
			await cb(tempObj); // Make sure this does not trigger infinite loops
		}
	};

	return (
		<SectionBorder className={className}>
			<div className="flex w-full flex-col gap-6">
				{title && (
					<div>
						<TitleLg>{title}</TitleLg>
					</div>
				)}
				{availableValues?.length > 0 &&
					availableValues.map((item, index) => {
						return (
							<div
								key={`${categoryName}_${index}_toggle_cont`}
								className="border-b border-gray-700"
							>
								<div className="mb-2">
									<SimpleToggle
										name={item.name}
										value={existingValues.includes(item[valueToUpdate])}
										cb={(itemName, val) => handleToggleChange(item, val)} // Call the helper function
									/>
								</div>
							</div>
						);
					})}
			</div>
		</SectionBorder>
	);
}

export { SimpleToggleList };
