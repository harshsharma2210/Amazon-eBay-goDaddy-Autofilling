chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, { file: "jquery-3.5.1.min.js" });
  chrome.tabs.executeScript(null, { file: "amazon.js" });
  chrome.tabs.executeScript(null, { file: "goDaddy.js" });
  chrome.tabs.executeScript(null, { file: "eBay.js" });
  chrome.tabs.executeScript(null, { file: "fedex.js" });

});
