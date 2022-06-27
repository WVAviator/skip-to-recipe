(() => {
	/**
	 * Websites that the standard class/id search for ingredients does not work for.
	 */
	const cookingWebsiteExceptions = {
		"https://www.epicurious.com/": () =>
			findRecipeElementWithAttribute("data-testid", "ingredients"),
		"https://www.aspicyperspective.com/": () =>
			findRecipeElementWithAttribute("id", "recipe-container"),
		"https://www.the-girl-who-ate-everything.com/": () =>
			findRecipeElementWithAttribute("id", "wprm-recipe"),
	};

	/**
	 * Checks if the current page is among the exceptions list and returns the correct element for that page.
	 * @returns The element if the current page is among the exceptions, otherwise null.
	 */
	const findRecipeElementWithException = () => {
		const href = window.location.href;

		for (let i in cookingWebsiteExceptions) {
			if (href.startsWith(i)) {
				return cookingWebsiteExceptions[i]();
			}
		}
		return null;
	};

	/**
	 * Search the document for an element with the given attribute that contains the given value.
	 *
	 * @param {string} attribute
	 * @param {string} value
	 * @returns The first element found with the given attribute that contains the given value.
	 */
	const findRecipeElementWithAttribute = (attribute, value) => {
		const valueVariants = [
			value,
			value.toLowerCase(),
			value.toUpperCase(),
			value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
		];

		for (let i of valueVariants) {
			const element =
				document.querySelector(`[${attribute}*="${i}"]`) || null;
			if (element) {
				console.log(
					`Skip to Recipe: Recipe found at element with ${attribute}: ${element.getAttribute(
						attribute
					)}`
				);
				return element;
			}
		}

		return null;
	};

	const scrollToRecipe = () => {
		const targetElement =
			findRecipeElementWithException() ||
			findRecipeElementWithAttribute("class", "ingredients") ||
			findRecipeElementWithAttribute("id", "ingredients") ||
			null;

		if (targetElement) {
			targetElement.scrollIntoView({
				block: "start",
				behavior: "smooth",
				alignToTop: true,
			});
		}
	};

	scrollToRecipe();
})();
