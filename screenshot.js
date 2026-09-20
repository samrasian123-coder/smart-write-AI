window.ScreenshotAPI = {
    async captureVisible() {
        try {
            const settings = await window.StorageAPI.getSettings();
            chrome.runtime.sendMessage({ action: 'captureVisible', format: settings.format }, async (response) => {
                if (response && response.error) {
                    if (window.showError) window.showError(response.error);
                } else if (response && response.dataUrl) {
                    await this.handleScreenshot(response.dataUrl);
                }
            });
        } catch (e) {
            if (window.showError) window.showError("Screenshot could not be captured. Please try again.");
        }
    },

    async captureArea() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "startAreaSelection"}, function(response) {
                if (chrome.runtime.lastError) {
                    if (window.showError) window.showError("Unable to access this webpage. Content scripts might not be allowed.");
                } else {
                    window.close(); // close popup to let user select
                }
            });
        });
    },

    async captureFullPage() {
        if (window.showError) window.showError("Full page capture is a complex feature typically requiring scrolling. A simplified version would trigger a scroll-and-stitch script.");
    },

    async handleScreenshot(dataUrl) {
        // Save to history
        await window.StorageAPI.addToHistory(dataUrl);
        
        // Trigger download
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `SmartShot-${Date.now()}.png`;
        a.click();
        
        // Try clipboard
        try {
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
        } catch (e) {
            console.log("Clipboard permission is unavailable or failed.");
        }
    }
};
