chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == "complete" && !/^chrome/.test(tab.url)) {
		chrome.scripting.executeScript({
			target: {
				tabId,
			},
			files: ["findRecipe.js"],
		});
	}
});
