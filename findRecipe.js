/**
 * Websites that the standard class/id search for ingredients does not work for.
 */
const exceptions = {
	"https://www.epicurious.com/": () =>
		findElementWithAttribute("data-testid", "ingredients"),
	"https://www.aspicyperspective.com/": () =>
		findElementWithAttribute("id", "recipe-container"),
	"https://www.the-girl-who-ate-everything.com/": () =>
		findElementWithAttribute("id", "wprm-recipe"),
};

/**
 * Checks if the current page is among the exceptions list and returns the correct element for that page.
 * @returns The element if the current page is among the exceptions, otherwise null.
 */
const findElementWithException = () => {
	const href = window.location.href;
	for (let i in exceptions) {
		if (href.startsWith(i)) {
			return exceptions[i]();
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
const findElementWithAttribute = (attribute, value) => {
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
		findElementWithException() ||
		findElementWithAttribute("class", "ingredients") ||
		findElementWithAttribute("id", "ingredients") ||
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
