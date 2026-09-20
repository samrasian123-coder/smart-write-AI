chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'captureVisible') {
        chrome.tabs.captureVisibleTab( { format: request.format || 'png' }, (dataUrl) => {
            if (chrome.runtime.lastError) {
                sendResponse({ error: chrome.runtime.lastError.message });
            } else {
                sendResponse({ dataUrl: dataUrl });
            }
        });
        return true; // Keep channel open for async response
    }
});

