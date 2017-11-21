let toggledUrls = []

function shouldBeToggled(url) {
  if (url.includes('about:reader')) {
    return false;
  }
  if (toggledUrls.includes(url)) {
    return false;
  }

  toggledUrls.push(url);
  if (toggledUrls.length > 50) {
    toggledUrls.shift()
  }
  return true
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.isArticle && !tab.isInReaderMode) {
    if (shouldBeToggled(tab.url)) {
      browser.tabs.toggleReaderMode(tab.id);
    }
  }
});
