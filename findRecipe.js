/**
 * Will check the page for an id attribute containing the term "ingredients"
 *
 * Confirmed Success:
 * https://www.simplyrecipes.com/
 * https://www.foodnetwork.com/
 *
 * @returns {HTMLElement}
 */
const idContainsIngredients = () => {
	const ingredients =
		document.querySelector(`section[id*="ingredients"]`) ||
		document.querySelector(`section[id*="Ingredients"]`) ||
		document.querySelector(`section[id*="INGREDIENTS"]`) ||
		null;
	if (ingredients)
		console.log("Recipe found at element with id: " + ingredients.id);
	return ingredients;
};

/**
 * Will check the page for a class attribute containing the term "ingredients"
 *
 * Confirmed Success:
 * https://www.allrecipes.com/
 * https://www.gimmesomeoven.com/
 * https://www.delish.com/
 * https://cooking.nytimes.com/
 * https://natashaskitchen.com/
 * https://www.pillsbury.com/
 *
 * @returns {HTMLElement}
 */
const classContainsIngredients = () => {
	const ingredients =
		document.querySelector(`[class*="ingredients"]`) ||
		document.querySelector(`[class*="Ingredients"]`) ||
		document.querySelector(`[class*="INGREDIENTS"]`) ||
		null;
	if (ingredients)
		console.log(
			"Recipe found at element with class: " + ingredients.className
		);
	return ingredients;
};

const findIngredients = () => {
	const ingredients = idContainsIngredients() || classContainsIngredients();

	return ingredients;
};

const ingredients = findIngredients();

if (ingredients) {
	ingredients.scrollIntoView({ block: "start" });
}
