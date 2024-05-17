function getThemeColors(value: string) {
	return {
		bg: `bg-${value}`,
		txt: value == "primary" ? "text-secondary" : "text-primary",
	};
}

export { getThemeColors };
