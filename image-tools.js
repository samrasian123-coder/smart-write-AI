window.ImageToolsAPI = {
    findImages() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "getImages"}, function(response) {
                if (chrome.runtime.lastError) {
                    if (window.showError) window.showError("Unable to access this webpage.");
                } else if (response && response.images) {
                    alert(`Found ${response.images.length} images on this page.`);
                }
            });
        });
    },

    copyImageUrl() {
        if (window.showError) window.showError("Right-click an image and use standard browser tools, or we could implement a hover-to-copy script.");
    },

    showImageInfo() {
        if (window.showError) window.showError("This would require injecting a script to hover over images and read their NaturalWidth/NaturalHeight.");
    }
};
