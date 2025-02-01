function delay(time: number = 0): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

export { delay };
